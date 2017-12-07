package controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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
		
		
		JsonNode data = request().body().asJson();
		lineName = data.path("lineName").textValue();
		dateStr = data.path("dateStr").asText();
		logger.info("lineName = " + lineName + ",dateStr = " + dateStr);
		JsonNode baseInfoNode = data.path("baseInfo");
		logger.info("" + baseInfoNode.get("teamLeaderSign1").asText() + "," + baseInfoNode.get("teamLeaderSign2").asText() + "," + baseInfoNode.get("teamLeaderSign3").asText());
		Date productDate = df.parse(dateStr);
		//get hourly base info
		HourlyCountBase base = HourlyCountBase.findByLineNameAndDate(lineName, productDate);
		
		//create new hourly base info if it's totally new record
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
		//set each properties
		base.groupLeaderSign = baseInfoNode.get("groupLeaderSign").asText();
		base.productDate = productDate;
		base.productLine = line;
		base.teamLeaderSign1 = baseInfoNode.get("teamLeaderSign1").asText();
		base.teamLeaderSign2 = baseInfoNode.get("teamLeaderSign2").asText();
		base.teamLeaderSign3 = baseInfoNode.get("teamLeaderSign3").asText();
		
		//save to DB
		HourlyCountBase.save(base);
		
		//start to parse detail info
		JsonNode detailInfoNode = data.path("dataGroup");
		
		//get hourly detail info by base id
		List<HourlyCountDetail> details = HourlyCountDetail.findByBaseId(base.id);
		
		//define a new list to store to-be-saved items
		//List<HourlyCountDetail> toBeSavedDetails;
		HourlyCountDetail detailObj = null;
		
		int nodeCount = 0;
		if (detailInfoNode.isArray()){
			nodeCount = detailInfoNode.size();
		}
		logger.info("detailInfoNode: " + detailInfoNode );
		boolean isExisted = false;
		if (null != details && !details.isEmpty()){
			//already created details before, this time only need update each item
			isExisted = true;
		}
		else{
			//totally first time save action, need to insert to DB
			details = new ArrayList<>();
		}
		for (int i = 0; i < nodeCount; i++){
			if (isExisted)
				detailObj = details.get(i);
			else
				detailObj = new HourlyCountDetail();
			
			//get product type from DB
			String productTypeName1 = detailInfoNode.get(i).get("productTypeName1").asText();
			ProductType productType1 = ProductType.findByName(productTypeName1);
			if (null == productType1 && !productTypeName1.isEmpty()){
				productType1 = new ProductType();
				productType1.productTypeName = productTypeName1;
				productType1.active = true;
				ProductType.save(productType1);
			}
			String productTypeName2 = detailInfoNode.get(i).get("productTypeName2").asText();
			ProductType productType2 = ProductType.findByName(productTypeName2);
			if (null == productType2 && !productTypeName2.isEmpty()){
				productType2 = new ProductType();
				productType2.productTypeName = productTypeName2;
				productType2.active = true;
				ProductType.save(productType2);
			}
			
			//set properties
			detailObj.hourlyCountBase 			= base;
			detailObj.productType1 				= productType1;
			detailObj.productCycle1 			= detailInfoNode.get(i).get("productCycle1").asInt();
			detailObj.productType2 				= productType2;
			detailObj.productCycle2 			= detailInfoNode.get(i).get("productCycle2").asInt();
			detailObj.productHour 				= detailInfoNode.get(i).get("productHour").asInt();
			detailObj.productHourCount 			= detailInfoNode.get(i).get("productHourCount").asInt();
			detailObj.planCount 				= detailInfoNode.get(i).get("planCount").asInt();
			detailObj.actualCount 				= detailInfoNode.get(i).get("actualCount").asInt();
			detailObj.scrapCount 				= detailInfoNode.get(i).get("scrapCount").asInt();
			detailObj.reworkCount 				= detailInfoNode.get(i).get("reworkCount").asInt();
			detailObj.qualityLoss 				= detailInfoNode.get(i).get("qualityLoss").asInt();
			detailObj.breakdownCount 			= detailInfoNode.get(i).get("breakdownCount").asInt();
			detailObj.adjustmentCount 			= detailInfoNode.get(i).get("adjustmentCount").asInt();
			detailObj.technicalLoss 			= detailInfoNode.get(i).get("technicalLoss").asInt();
			detailObj.planSetupCount 			= detailInfoNode.get(i).get("planSetupCount").asInt();
			detailObj.unplanSetupCount 			= detailInfoNode.get(i).get("unplanSetupCount").asInt();
			detailObj.exchgToolCount 			= detailInfoNode.get(i).get("exchgToolCount").asInt();
			detailObj.changeoverLoss 			= detailInfoNode.get(i).get("changeoverLoss").asInt();
			detailObj.lackPersonnelCount 		= detailInfoNode.get(i).get("lackPersonnelCount").asInt();
			detailObj.lackMaterialCount 		= detailInfoNode.get(i).get("lackMaterialCount").asInt();
			detailObj.testReleaseThreePartsCount = detailInfoNode.get(i).get("testReleaseThreePartsCount").asInt();
			detailObj.exchgMaterialCount 		= detailInfoNode.get(i).get("exchgMaterialCount").asInt();
			detailObj.unplanSampleCount 		= detailInfoNode.get(i).get("unplanSampleCount").asInt();
			detailObj.newOperatorCount 			= detailInfoNode.get(i).get("newOperatorCount").asInt();
			detailObj.othersCount		 		= detailInfoNode.get(i).get("othersCount").asInt();
			detailObj.orgnizationLoss	 		= detailInfoNode.get(i).get("orgnizationLoss").asInt();
			detailObj.unplanTpmCount 	 		= detailInfoNode.get(i).get("unplanTpmCount").asInt();
			detailObj.performanceCount	 		= detailInfoNode.get(i).get("performanceCount").asInt();
			detailObj.undefinedCount	 		= detailInfoNode.get(i).get("undefinedCount").asInt();
			detailObj.remark				 	= detailInfoNode.get(i).get("remark").asText();
			
			//prepare save list
			if (!isExisted)
				details.add(detailObj);
		}
		
		HourlyCountDetail.saveList(details);
		
		return ok(ret);
	}
	
	private static Map<Integer, List<HourlyCountDetail>> prepareHourDetailDataByGroup(Map<Integer, List<HourlyCountDetail>> mapResult, List<HourlyCountDetail> details, Map<String, String[]> paramsMap, HourlyCountBase base, String groupName, int loopCount){
		List<HourlyCountDetail> listExisted = mapResult.get(1) == null ? (new ArrayList<HourlyCountDetail>()) : mapResult.get(1);
		List<HourlyCountDetail> listNonExisted = mapResult.get(2) == null ? (new ArrayList<HourlyCountDetail>()) : mapResult.get(2);
		for (int i = 0; i < loopCount; i ++){
			boolean isExist = false;
			HourlyCountDetail detailObj = null;
			
			for(HourlyCountDetail detail: details){
				if (detail.productHour.equals(Integer.valueOf(paramsMap.get(groupName + "[" + i + "][productHour]")[0])) ){
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
			if (!isExist){
				listNonExisted.add(detailObj);
				mapResult.put(2, listNonExisted);
			}
			else{
				listExisted.add(detailObj);
				mapResult.put(1, listExisted);
			}
		}
		return mapResult;
	}
	
	private static Map<Integer, List<HourlyCountDetail>> prepareHourDetailData(List<HourlyCountDetail> details, Map<String, String[]> paramsMap, HourlyCountBase base){
		Map<Integer, List<HourlyCountDetail>> mapResult = new HashMap<>();
		//detail with group1 data - from 7:00 am ~ 3:00 pm
		mapResult = prepareHourDetailDataByGroup(mapResult, details, paramsMap, base, "dateGroup1", 8);
		
		//detail with group1 data - from 3:00 pm ~ 7:00 pm
		mapResult = prepareHourDetailDataByGroup(mapResult, details, paramsMap, base, "dateGroup2", 4);

		//detail with group1 data - from 7:00 pm ~ 11:00 pm
		mapResult = prepareHourDetailDataByGroup(mapResult, details, paramsMap, base, "dateGroup3", 4);

		//detail with group1 data - from 11:00 pm ~ 7:00 pm
		mapResult = prepareHourDetailDataByGroup(mapResult, details, paramsMap, base, "dateGroup4", 8);
		return mapResult;
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