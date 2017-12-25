package controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;

import models.HourlyCountBase;
import models.HourlyCountDetail;
import models.OeeLossChildChildType;
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
		String ret = "1";
		
		String lineName = null, dateStr = null;
		
		
		JsonNode data = request().body().asJson();
		lineName = data.path("lineName").textValue();
		dateStr = data.path("dateStr").asText();
		logger.info("lineName = " + lineName + ",dateStr = " + dateStr);
		JsonNode baseInfoNode = data.path("baseInfo");
		logger.info("" + baseInfoNode.get("teamLeaderSign1").asText() + "," + baseInfoNode.get("teamLeaderSign2").asText() + "," + baseInfoNode.get("teamLeaderSign3").asText());
		//current day
		Date productDate = df.parse(dateStr);
		//next day
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(productDate);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		Date nextDay = calendar.getTime();
		
		//get hourly base info
		HourlyCountBase base_1 = HourlyCountBase.findByLineNameAndDate(lineName, productDate);
		HourlyCountBase base_2 = HourlyCountBase.findByLineNameAndDate(lineName, nextDay);
		boolean isExistBase_1 = true;
		boolean isExistBase_2 = true;
		
		//create new hourly base info if it's totally new record
		if (null == base_1){
			base_1 = new HourlyCountBase();
			isExistBase_1 = false;
		}
		if (null == base_2){
			base_2 = new HourlyCountBase();
			isExistBase_2 = false;
		}
		
		//check if product line existed
		ProductLine line = ProductLine.findByName(lineName);
		if (null == line){
			line = new ProductLine();
			line.lineName = lineName;
			line.active = true;
			ProductLine.save(line);
		}
		//set each properties
		base_1.groupLeaderSign = baseInfoNode.get("groupLeaderSign").asText();
		base_1.productDate = productDate;
		base_1.productLine = line;
		base_1.teamLeaderSign1 = baseInfoNode.get("teamLeaderSign1").asText();
		base_1.teamLeaderSign2 = baseInfoNode.get("teamLeaderSign2").asText();
		base_1.teamLeaderSign3 = baseInfoNode.get("teamLeaderSign3").asText();
		base_1.targetOeePercent = baseInfoNode.get("targetOeePercent").asDouble();
		base_1.planOplTotalOutput = baseInfoNode.get("planOplTotalOutput").asInt();
		base_1.targetOeeTotalOutput = baseInfoNode.get("planOutputCount").asInt();
		base_1.actualOeeTotalOutput = baseInfoNode.get("actualOutputCount").asInt();
		
		base_2.groupLeaderSign = baseInfoNode.get("groupLeaderSign").asText();
		base_2.productDate = nextDay;
		base_2.productLine = line;
		base_2.teamLeaderSign1 = baseInfoNode.get("teamLeaderSign1").asText();
		base_2.teamLeaderSign2 = baseInfoNode.get("teamLeaderSign2").asText();
		base_2.teamLeaderSign3 = baseInfoNode.get("teamLeaderSign3").asText();
		base_2.targetOeePercent = baseInfoNode.get("targetOeePercent").asDouble();
		base_2.planOplTotalOutput = baseInfoNode.get("planOplTotalOutput").asInt();
		base_2.targetOeeTotalOutput = baseInfoNode.get("planOutputCount").asInt();
		base_2.actualOeeTotalOutput = baseInfoNode.get("actualOutputCount").asInt();
		//save to DB
		if(!isExistBase_1)
			HourlyCountBase.save(base_1);
		else
			HourlyCountBase.update(base_1);
		
		if(!isExistBase_2)
			HourlyCountBase.save(base_2);
		else
			HourlyCountBase.update(base_2);
		
		//start to parse detail info
		JsonNode detailInfoNode = data.path("dataGroup");
		
		//get hourly detail info by base id
		List<HourlyCountDetail> details_1 = HourlyCountDetail.findByBaseIdAndFilterHour(base_1.id, 1, 16);
		List<HourlyCountDetail> details_2 = HourlyCountDetail.findByBaseIdAndFilterHour(base_2.id, 17, 24);
		
		//define a new list to store to-be-saved items
		List<HourlyCountDetail> toBeSavedDetails = new ArrayList<>();
		//define a new list to store to-be-update items
		List<HourlyCountDetail> toBeUpdatedDetails = new ArrayList<>();
		HourlyCountDetail detailObj = null;
		
		int nodeCount = 0;
		if (detailInfoNode.isArray()){
			nodeCount = detailInfoNode.size();
		}
		logger.info("detailInfoNode: " + detailInfoNode );
		boolean isExisted_1 = false;
		boolean isExisted_2 = false;
		if (null != details_1 && !details_1.isEmpty()){
			//already created details before, this time only need update each item
			isExisted_1 = true;
		}
		if (null != details_2 && !details_2.isEmpty()){
			//already created details before, this time only need update each item
			isExisted_2 = true;
		}

		for (int i = 0; i < nodeCount; i++){
			//if (isExisted)
			//	detailObj = details.get(i);
			//else
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
			if (i > 15)
				detailObj.hourlyCountBase 			= base_2;
			else
				detailObj.hourlyCountBase 			= base_1;
			detailObj.productType1 				= productType1;
			detailObj.productCycle1 			= detailInfoNode.get(i).get("productCycle1").asInt();
			detailObj.productType2 				= productType2;
			detailObj.productCycle2 			= detailInfoNode.get(i).get("productCycle2").asInt();
			detailObj.productHour 				= detailInfoNode.get(i).get("productHour").asInt();
			detailObj.productHourIndex 			= detailInfoNode.get(i).get("productHourIndex").asInt();
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
			
			detailObj.breakdownMin 				= detailInfoNode.get(i).get("breakdownMin").asInt();
			detailObj.adjustmentMin 			= detailInfoNode.get(i).get("adjustmentMin").asInt();
			detailObj.planSetupMin 				= detailInfoNode.get(i).get("planSetupMin").asInt();
			detailObj.unplanSetupMin 			= detailInfoNode.get(i).get("unplanSetupMin").asInt();
			detailObj.exchgToolMin 				= detailInfoNode.get(i).get("exchgToolMin").asInt();
			detailObj.lackPersonnelMin 			= detailInfoNode.get(i).get("lackPersonnelMin").asInt();
			detailObj.lackMaterialMin 			= detailInfoNode.get(i).get("lackMaterialMin").asInt();
			detailObj.testReleaseThreePartsMin 	= detailInfoNode.get(i).get("testReleaseThreePartsMin").asInt();
			detailObj.exchgMaterialMin 			= detailInfoNode.get(i).get("exchgMaterialMin").asInt();
			detailObj.unplanSampleMin 			= detailInfoNode.get(i).get("unplanSampleMin").asInt();
			detailObj.newOperatorMin 			= detailInfoNode.get(i).get("newOperatorMin").asInt();
			detailObj.othersMin		 			= detailInfoNode.get(i).get("othersMin").asInt();
			detailObj.unplanTpmMin 	 			= detailInfoNode.get(i).get("unplanTpmMin").asInt();
			
			detailObj.performanceCount	 		= detailInfoNode.get(i).get("performanceCount").asInt();
			detailObj.undefinedCount	 		= detailInfoNode.get(i).get("undefinedCount").asInt();
			detailObj.remark				 	= detailInfoNode.get(i).get("remark").asText();
			detailObj.techDownCode				= detailInfoNode.get(i).get("techDownCode").asText();
			
			//prepare save list
			if (i < 16){//first day
				if (!isExisted_1)
					toBeSavedDetails.add(detailObj);
				else{
					detailObj.id = details_1.get(i).id;
					toBeUpdatedDetails.add(detailObj);
				}
			}else if (i > 15){//second day
				if (!isExisted_2)
					toBeSavedDetails.add(detailObj);
				else{
					detailObj.id = details_2.get(i - 16).id;
					toBeUpdatedDetails.add(detailObj);
				}
			}
			
		}
		if (toBeSavedDetails.size() > 0){
			HourlyCountDetail.saveList(toBeSavedDetails);
		}
		if (toBeUpdatedDetails.size() > 0){
			HourlyCountDetail.updateList(toBeUpdatedDetails);
		}
		
		return ok(ret);
	}
	
	public static Result getoeeLossChildChildName(String oeeLossChildName){
		List<OeeLossChildChildType> list = OeeLossChildChildType.findByChildName(oeeLossChildName);
		return ok(Json.toJson(list));
	}
	

}