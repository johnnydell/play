package controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
		Date productDate = df.parse(dateStr);
		//get hourly base info
		HourlyCountBase base = HourlyCountBase.findByLineNameAndDate(lineName, productDate);
		boolean isExistBase = true;
		
		//create new hourly base info if it's totally new record
		if (null == base){
			base = new HourlyCountBase();
			isExistBase = false;
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
		base.groupLeaderSign = baseInfoNode.get("groupLeaderSign").asText();
		base.productDate = productDate;
		base.productLine = line;
		base.teamLeaderSign1 = baseInfoNode.get("teamLeaderSign1").asText();
		base.teamLeaderSign2 = baseInfoNode.get("teamLeaderSign2").asText();
		base.teamLeaderSign3 = baseInfoNode.get("teamLeaderSign3").asText();
		base.planOplTotalOutput = baseInfoNode.get("planOplTotalOutput").asInt();
		base.targetOeeTotalOutput = baseInfoNode.get("planOutputCount").asInt();
		base.actualOeeTotalOutput = baseInfoNode.get("actualOutputCount").asInt();
		//save to DB
		if(!isExistBase)
			HourlyCountBase.save(base);
		else
			HourlyCountBase.update(base);
		
		//start to parse detail info
		JsonNode detailInfoNode = data.path("dataGroup");
		
		//get hourly detail info by base id
		List<HourlyCountDetail> details = HourlyCountDetail.findByBaseId(base.id);
		
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
		boolean isExisted = false;
		if (null != details && !details.isEmpty()){
			//already created details before, this time only need update each item
			isExisted = true;
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
			detailObj.hourlyCountBase 			= base;
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
			if (!isExisted)
				toBeSavedDetails.add(detailObj);
			else{
				detailObj.id = details.get(i).id;
				toBeUpdatedDetails.add(detailObj);
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