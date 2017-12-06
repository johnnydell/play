package controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import com.fasterxml.jackson.databind.JsonNode;

import models.HourlyCountBase;
import models.HourlyCountDetail;
import models.ProductLine;
import models.ProductType;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class HourlyCountController extends Controller {

	private final static Logger logger = LoggerFactory.getLogger(HourlyCountController.class);
	
	private static DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	
	public static Result viewHourlyCountByLineName(String lineName, String productDateStr) throws ParseException {
		
		logger.info("try to get hourly count history by lineName[" + lineName + "], productDate[" + productDateStr + "]");
		Date productDate = df.parse(productDateStr);
		
		List<HourlyCountDetail> countDetail = HourlyCountDetail.findByLineName(lineName, productDate);
		
		return ok(Json.toJson(countDetail));
		
		
		
	}
	
	public static Result saveHourlyCount() throws ParseException{
		String ret = "Save OK";
		
		String lineName = null, dateStr = null;
		
		Map<String, String[]> paramsMap = request().body().asFormUrlEncoded();
		
		lineName = paramsMap.get("lineName") 								== null ? null : paramsMap.get("lineName")[0];
		dateStr = paramsMap.get("dateStr") 									== null ? null : paramsMap.get("dateStr")[0];
		String teamLeaderSign1 = paramsMap.get("baseInfo[teamLeaderSign1]")	== null ? null : paramsMap.get("baseInfo[teamLeaderSign1]")[0];
		String teamLeaderSign2 = paramsMap.get("baseInfo[teamLeaderSign2]")	== null ? null : paramsMap.get("baseInfo[teamLeaderSign2]")[0];
		String teamLeaderSign3 = paramsMap.get("baseInfo[teamLeaderSign3]")	== null ? null : paramsMap.get("baseInfo[teamLeaderSign3]")[0];
		String groupLeaderSign = paramsMap.get("baseInfo[groupLeaderSign]")	== null ? null : paramsMap.get("baseInfo[groupLeaderSign]")[0];
		
		Date productDate = dateStr == null ? (new Date()) : df.parse(dateStr);
		HourlyCountBase base = HourlyCountBase.findByLineNameAndDate(lineName, productDate);
		//check if hourly base existed
		if (null == base){
			base = new HourlyCountBase();
		}
		
		//check if product line existed
		ProductLine line = ProductLine.findByName(lineName);
		if (null == line){
			line = new ProductLine();
			line.lineName = lineName;
			line.active = true;
		}
		
		//prepare hourly base properties
		base.productDate = productDate;
		base.productLine = line;
		base.groupLeaderSign = groupLeaderSign;
		base.teamLeaderSign1 = teamLeaderSign1;
		base.teamLeaderSign2 = teamLeaderSign2;
		base.teamLeaderSign3 = teamLeaderSign3;
		
		HourlyCountBase.save(base);
		
		//get hourly count details
		List<HourlyCountDetail> details = HourlyCountDetail.findByBaseId(base.id);
		
		if (null == details || details.size() == 0){
			details = new ArrayList<HourlyCountDetail>();
		}
		details = prepareHourDetailData(details, paramsMap, base);
		
		HourlyCountDetail.saveList(details);
		
		for (Map.Entry<String, String[]> entry : paramsMap.entrySet()){
			String key = entry.getKey();
			String[] value = entry.getValue();
			
			for(String subV : value){
				logger.info("key = " + key + ", value = " + subV);
			}
		}
		
		logger.info("received LineName = " + lineName + ", date = " + dateStr + ", teamLeaderSign1=" + teamLeaderSign1 );
		return ok(ret);
	}
	
	private static List<HourlyCountDetail> prepareHourDetailDataByGroup(List<HourlyCountDetail> details, Map<String, String[]> paramsMap, HourlyCountBase base, String groupName, int loopCount){
		for (int i = 0; i < loopCount; i ++){
			boolean isExist = false;
			HourlyCountDetail detailObj = null;
			
			for(HourlyCountDetail detail: details){
				if (detail.productHour.equals(paramsMap.get(groupName + "[" + i + "][productHour]")[0]) ){
					detailObj = detail;
					isExist = true;
					break;
				}
			}
			
			if (!isExist)
				detailObj = new HourlyCountDetail();
			
			//get product type 
			ProductType productType1 = ProductType.findByName(paramsMap.get(groupName + "[" + i + "][productTypeName1]")[0]);
			if (null == productType1 && !paramsMap.get(groupName + "[" + i + "][productTypeName1]")[0].isEmpty()){
				productType1 = new ProductType();
				productType1.productTypeName = paramsMap.get(groupName + "[" + i + "][productTypeName1]")[0];
				productType1.active = true;
				ProductType.save(productType1);
			}
			ProductType productType2 = ProductType.findByName(paramsMap.get(groupName + "[" + i + "][productTypeName2]")[0]);
			if (null == productType2 && !paramsMap.get(groupName + "[" + i + "][productTypeName2]")[0].isEmpty()){
				productType2 = new ProductType();
				productType2.productTypeName = paramsMap.get(groupName + "[" + i + "][productTypeName1]")[0];
				productType2.active = true;
				ProductType.save(productType2);
			}
			
			//set each properties
			detailObj.productCycle1 	= paramsMap.get("dateGroup1[0][productCycle1]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][productCycle1]")[0]);
			detailObj.hourlyCountBase = base;
			detailObj.productType1 		= productType1;
			detailObj.productCycle1 	= paramsMap.get(groupName + "[" + i + "][productCycle1]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][productCycle1]")[0]);
			detailObj.productType2 		= productType2;
			detailObj.productCycle2 	= paramsMap.get(groupName + "[" + i + "][productCycle2]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][productCycle2]")[0]);
			detailObj.productHour 		= paramsMap.get(groupName + "[" + i + "][productHour]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][productHour]")[0]);
			detailObj.productHourCount 	= paramsMap.get(groupName + "[" + i + "][productHourCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][productHourCount]")[0]);
			detailObj.planCount 		= paramsMap.get(groupName + "[" + i + "][planCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][planCount]")[0]);
			detailObj.actualCount 		= paramsMap.get(groupName + "[" + i + "][actualCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][actualCount]")[0]);
			detailObj.scrapCount 		= paramsMap.get(groupName + "[" + i + "][scrapCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][scrapCount]")[0]);
			detailObj.reworkCount 		= paramsMap.get(groupName + "[" + i + "][reworkCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][reworkCount]")[0]);
			detailObj.qualityLoss 		= paramsMap.get(groupName + "[" + i + "][qualityLoss]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][qualityLoss]")[0]);
			detailObj.breakdownCount 	= paramsMap.get(groupName + "[" + i + "][breakdownCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][breakdownCount]")[0]);
			detailObj.adjustmentCount 	= paramsMap.get(groupName + "[" + i + "][adjustmentCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][adjustmentCount]")[0]);
			detailObj.technicalLoss 	= paramsMap.get(groupName + "[" + i + "][technicalLoss]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][technicalLoss]")[0]);
			detailObj.planSetupCount 	= paramsMap.get(groupName + "[" + i + "][planSetupCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][planSetupCount]")[0]);
			detailObj.unplanSetupCount 	= paramsMap.get(groupName + "[" + i + "][unplanSetupCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][unplanSetupCount]")[0]);
			detailObj.exchgToolCount 	= paramsMap.get(groupName + "[" + i + "][exchgToolCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][exchgToolCount]")[0]);
			detailObj.changeoverLoss 	= paramsMap.get(groupName + "[" + i + "][changeoverLoss]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][changeoverLoss]")[0]);
			detailObj.lackPersonnelCount = paramsMap.get(groupName + "[" + i + "][lackPersonnelCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][lackPersonnelCount]")[0]);
			detailObj.lackMaterialCount = paramsMap.get(groupName + "[" + i + "][lackMaterialCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][lackMaterialCount]")[0]);
			detailObj.testReleaseThreePartsCount = paramsMap.get(groupName + "[" + i + "][testReleaseThreePartsCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][testReleaseThreePartsCount]")[0]);
			detailObj.exchgMaterialCount = paramsMap.get(groupName + "[" + i + "][exchgMaterialCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][exchgMaterialCount]")[0]);
			detailObj.unplanSampleCount = paramsMap.get(groupName + "[" + i + "][unplanSampleCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][unplanSampleCount]")[0]);
			detailObj.newOperatorCount = paramsMap.get(groupName + "[" + i + "][newOperatorCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][newOperatorCount]")[0]);
			detailObj.othersCount		 = paramsMap.get(groupName + "[" + i + "][othersCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][othersCount]")[0]);
			detailObj.orgnizationLoss	 = paramsMap.get(groupName + "[" + i + "][orgnizationLoss]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][orgnizationLoss]")[0]);
			detailObj.unplanTpmCount 	 = paramsMap.get(groupName + "[" + i + "][unplanTpmCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][unplanTpmCount]")[0]);
			detailObj.performanceCount	 = paramsMap.get(groupName + "[" + i + "][performanceCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][performanceCount]")[0]);
			detailObj.undefinedCount	 = paramsMap.get(groupName + "[" + i + "][undefinedCount]")[0].isEmpty() ? null : Integer.valueOf(paramsMap.get(groupName + "[" + i + "][undefinedCount]")[0]);
			detailObj.remark			 = paramsMap.get(groupName + "[" + i + "][remark]")[0].isEmpty() ? "" : paramsMap.get(groupName + "[" + i + "][remark]")[0];
			
			
			//add detail object into list
			if (!isExist)
				details.add(detailObj);
		}
		return details;
	}
	
	private static List<HourlyCountDetail> prepareHourDetailData(List<HourlyCountDetail> details, Map<String, String[]> paramsMap, HourlyCountBase base){
		//detail with group1 data - from 7:00 am ~ 3:00 pm
		details = prepareHourDetailDataByGroup(details, paramsMap, base, "dateGroup1", 8);
		
		//detail with group1 data - from 3:00 pm ~ 7:00 pm
		details = prepareHourDetailDataByGroup(details, paramsMap, base, "dateGroup2", 4);

		//detail with group1 data - from 7:00 pm ~ 11:00 pm
		details = prepareHourDetailDataByGroup(details, paramsMap, base, "dateGroup3", 4);

		//detail with group1 data - from 11:00 pm ~ 7:00 pm
		details = prepareHourDetailDataByGroup(details, paramsMap, base, "dateGroup4", 8);
		return details;
	}

	public static void main(String[] args) {
		List<HourlyCountBase> lists = new ArrayList<>();
		for (int i = 0; i < 3; i ++){
			HourlyCountBase base = new HourlyCountBase();
			base.id = i;
			lists.add(base);
		}
		
		for(HourlyCountBase base : lists){
			if (base.id.equals(0))
				base.teamLeaderSign1 = "test";
			break;
		}
		
		for(HourlyCountBase base : lists){
			System.out.println(base.id + "," + base.teamLeaderSign1);
		}
	}
	

}