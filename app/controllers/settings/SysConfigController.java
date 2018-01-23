package controllers.settings;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;

import com.avaje.ebean.SqlRow;
import com.fasterxml.jackson.databind.JsonNode;

import models.OeeLossChildChildType;
import models.OeeLossChildType;
import models.OeeLossType;
import models.ProductLine;
import models.SystemParam;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class SysConfigController extends Controller {
	
	private static Log logger = LogFactory.getLog(SysConfigController.class);
	
	public static Result getOeeLossSubTypes(){
		List<SqlRow> lists = OeeLossChildChildType.findAllBySql();
		
		List<OeeLossType> losses = new ArrayList<OeeLossType>();
		
		for(SqlRow row : lists){
			String lossId 			= row.getString("loss_id");
			String lossName 		= row.getString("loss_name");
			String subLossId 		= row.getString("sub_loss_id");
			String subLossName 		= row.getString("sub_loss_name");
			String subSubLossId 	= row.getString("sub_sub_loss_id");
			String subSubLossName 	= row.getString("sub_sub_loss_name");
			if (losses.size() == 0 ) {
				OeeLossChildType subLoss_1 = new OeeLossChildType();
				subLoss_1.id = subLossId;
				subLoss_1.subLoseTypeName = subLossName;
				if (!StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")){
					OeeLossChildChildType subSubLoss = new OeeLossChildChildType();
					subSubLoss.id = subSubLossId;
					subSubLoss.lossTypeName = subSubLossName;
					subLoss_1.subSubTypes.add(subSubLoss);
				}
				OeeLossType loss_1 = new OeeLossType();
				loss_1.id = lossId;
				loss_1.lossTypeName = lossName;
				loss_1.subTypes.add(subLoss_1);
				losses.add(loss_1);
			} else {
				boolean isFoundLoss = false;
				for (OeeLossType loss : losses) {
					if (null != loss.id) {
						if (loss.id.equalsIgnoreCase(lossId)) {
							isFoundLoss = true;
							// same loss, check sub loss
							boolean isFoundSubLoss = false;
							for (OeeLossChildType subLoss : loss.subTypes) {
								if (subLoss.id.equalsIgnoreCase(subLossId)) {
									isFoundSubLoss = true;
									// same sub loss, check sub sub loss
									boolean isFoundSubSubLoss = false;
									for (OeeLossChildChildType subSubLoss : subLoss.subSubTypes) {
										if (subSubLoss.id.equalsIgnoreCase(subSubLossId)) {
											isFoundSubSubLoss = true;
											break;
										}
									}
									if (!isFoundSubSubLoss && !StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")) {
										OeeLossChildChildType subSubLoss 	= new OeeLossChildChildType();
										subSubLoss.id 						= subSubLossId;
										subSubLoss.lossTypeName 			= subSubLossName;
										subLoss.subSubTypes.add(subSubLoss);
									}
								} 
							}
							if (!isFoundSubLoss ) {
								OeeLossChildType subLoss_1 				= new OeeLossChildType();
								subLoss_1.id 							= subLossId;
								subLoss_1.subLoseTypeName 				= subLossName;
								if (!StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")){
									OeeLossChildChildType subSubLoss 	= new OeeLossChildChildType();
									subSubLoss.id 						= subSubLossId;
									subSubLoss.lossTypeName	 			= subSubLossName;
									subLoss_1.subSubTypes.add(subSubLoss);
								}
								loss.subTypes.add(subLoss_1);
							}
						} 
					} 
				}
				if (!isFoundLoss){
					OeeLossChildType subLoss_1 				= new OeeLossChildType();
					subLoss_1.id 							= subLossId;
					subLoss_1.subLoseTypeName 				= subLossName;
					if (!StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")){
						OeeLossChildChildType subSubLoss 	= new OeeLossChildChildType();
						subSubLoss.id 						= subSubLossId;
						subSubLoss.lossTypeName 			= subSubLossName;
						subLoss_1.subSubTypes.add(subSubLoss);
					}
					OeeLossType loss_1 						= new OeeLossType();
					loss_1.id 								= lossId;
					loss_1.lossTypeName 					= lossName;
					loss_1.subTypes.add(subLoss_1);
					losses.add(loss_1);
				}
			}
			
		}
		
		return ok(Json.toJson(losses));
	}
	

	public static Result saveOeeLossSubType(){
		
		try {
			JsonNode data = request().body().asJson();
			JsonNode lossIndex = data.path("lossId");
			JsonNode oeeSubLosses = data.path("oeeSubLosses");
			
			logger.info("saveOeeLossSubType = " + oeeSubLosses);
			String lossId = lossIndex.asText();
			String subLossId = oeeSubLosses.get("id").asText();
			JsonNode oeeSubSubLosses = oeeSubLosses.path("subSubTypes");
			logger.info("lossId = " + lossId);
			logger.info("subLossId = " + subLossId);
			logger.info("oeeSubSubLosses = " + oeeSubSubLosses);
			int nodeCount = oeeSubSubLosses.size();
			
			//get sub loss 
			OeeLossChildType subLoss = OeeLossChildType.findById(subLossId);
			
			List<OeeLossChildChildType> existed = new ArrayList<OeeLossChildChildType>();
			List<OeeLossChildChildType> newAdded = new ArrayList<OeeLossChildChildType>();
			List<OeeLossChildChildType> deleted = new ArrayList<OeeLossChildChildType>();
			for (int i = 0; i < nodeCount; i ++){
				String subSubLossId = oeeSubSubLosses.get(i).get("id").asText();
				String subSubLossName = oeeSubSubLosses.get(i).get("lossTypeName").asText();
				OeeLossChildChildType subSubLoss = new OeeLossChildChildType();
				if (subSubLossId.isEmpty() && !subSubLossName.isEmpty()){
					//new added
					subSubLoss.lossTypeName = subSubLossName;
					subSubLoss.oeeLossChildType = subLoss;
					subSubLoss.active = true;
					newAdded.add(subSubLoss);
				}
				else if (!subSubLossId.isEmpty() && !subSubLossName.isEmpty() ){
					//existed
					subSubLoss.lossTypeName = subSubLossName;
					subSubLoss.oeeLossChildType = subLoss;
					subSubLoss.id = subSubLossId;
					existed.add(subSubLoss);
				}
				else if (!subSubLossId.isEmpty() && subSubLossName.isEmpty() ){
					subSubLoss.id = subSubLossId;
					deleted.add(subSubLoss);
				}
			}
			
			if (existed.size() > 0){
				OeeLossChildChildType.updateList(existed);
			}
			if (newAdded.size() > 0){
				OeeLossChildChildType.saveList(newAdded);
			}
			if (deleted.size() > 0){
				OeeLossChildChildType.deleteList(deleted);
			}
		} catch (Exception e) {
			logger.error("" + e);
			return ok("0");
		}
		
		return ok("1");
	}
	
	public static Result saveScreenConfig(){
		try {
			
			JsonNode data = request().body().asJson();
			logger.info("saveScreenConfig= " + data);
			JsonNode screenTimeInterval = data.path("screenTimeInterval");
			JsonNode screenColorGreen = data.path("screenColorGreen");
			JsonNode screenColorYellow = data.path("screenColorYellow");
			JsonNode screenColorRed = data.path("screenColorRed");
			
			List<SystemParam> existedObjs = new ArrayList<SystemParam>();
			List<SystemParam> newObjs = new ArrayList<SystemParam>();
			
			String timeIntervalId = screenTimeInterval.get("id").asText();
			String timeInterval = screenTimeInterval.get("value").asText();
			SystemParam param = new SystemParam();
			param.moduleName = "SCREEN";
			param.paramName = "TIME_INTERVAL";
			param.paramValue = timeInterval;
			param.active = true;
			if (StringUtils.isEmpty(timeIntervalId)){
				newObjs.add(param);
			}else{
				param.id = timeIntervalId;
				existedObjs.add(param);
			}
			
			String colorGreenId = screenColorGreen.get("id").asText();
			String colorGreenValue = screenColorGreen.get("value").asText();
			SystemParam param1 = new SystemParam();
			param1.moduleName = "SCREEN";
			param1.paramName = "COLOR_GREEN";
			param1.paramValue = colorGreenValue;
			param1.active = true;
			if (StringUtils.isEmpty(colorGreenId)){
				newObjs.add(param1);
			}else{
				param1.id = colorGreenId;
				existedObjs.add(param1);
			}
			
			String colorYellowId = screenColorYellow.get("id").asText();
			String colorYellowMinValue = screenColorYellow.get("value_min").asText();		
			String colorGreenMaxValue = screenColorYellow.get("value_max").asText();
			SystemParam param2 = new SystemParam();
			param2.moduleName = "SCREEN";
			param2.paramName = "COLOR_YELLOW";
			param2.paramValue = colorYellowMinValue + "," + colorGreenMaxValue;
			param2.active = true;
			if (StringUtils.isEmpty(colorYellowId)){
				newObjs.add(param2);
			}else{
				param2.id = colorYellowId;
				existedObjs.add(param2);
			}
			
			String colorRedId = screenColorRed.get("id").asText();
			String colorRedValue = screenColorRed.get("value").asText();
			SystemParam param3 = new SystemParam();
			param3.moduleName = "SCREEN";
			param3.paramName = "COLOR_RED";
			param3.paramValue = colorRedValue;
			param3.active = true;
			if (StringUtils.isEmpty(colorRedId)){
				newObjs.add(param3);
			}else{
				param3.id = colorRedId;
				existedObjs.add(param3);
			}
			
			if (existedObjs.size() > 0){
				SystemParam.updateList(existedObjs);
			}
			
			if (newObjs.size() > 0){
				SystemParam.saveList(newObjs);
			}
		} catch (Exception e) {
			logger.error(" " + e);
			return ok("0");
		}
		
		return ok("1");
	}
	
	public static Result getProductLine(){
		List<ProductLine> lists = ProductLine.getActiveList();
		return ok(Json.toJson(lists));
	}
	
	public static Result saveLineConfig(){
		JsonNode data = request().body().asJson();
		logger.info("saveLineConfig= " + data);
		try {
			JsonNode lineData = data.path("lineData");
			int nodeCount = lineData.size();
			
			List<ProductLine> existed = new ArrayList<ProductLine>();
			List<ProductLine> newObjs = new ArrayList<ProductLine>();
			List<ProductLine> deleted = new ArrayList<ProductLine>();
			
			for (int i = 0; i < nodeCount; i ++){
				String id = lineData.get(i).get("id").asText();
				String lineName = lineData.get(i).get("lineName").asText();
				ProductLine line = new ProductLine();
				line.lineName = lineName;
				line.active = true;
				if (!StringUtils.isEmpty(id) && !StringUtils.isEmpty(lineName)){
					line.id = id;
					existed.add(line);
				}
				else if (StringUtils.isEmpty(id) && !StringUtils.isEmpty(lineName)){
					newObjs.add(line);
				}
				else if (!StringUtils.isEmpty(id) && StringUtils.isEmpty(lineName)){
					line.id = id;
					deleted.add(line);
				}
			}
			
			if (existed.size() > 0){
				ProductLine.updateList(existed);
			}
			if (newObjs.size() > 0){
				ProductLine.saveList(newObjs);
			}
			if (deleted.size() > 0){
				ProductLine.deleteList(deleted);
			}
		} catch (Exception e) {
			logger.error("" + e);
			return ok("0");
		}
		
		return ok("1");
	}
	
	public static Result saveStaticPageConfig(){
		try {
			
			JsonNode data = request().body().asJson();
			logger.info("saveStaticPageConfig= " + data);
			
			JsonNode staticPageBalance 		= data.path("staticPageBalance");
			JsonNode staticPageLayout 		= data.path("staticPageLayout");
			JsonNode staticPageOeepdca 		= data.path("staticPageOeepdca");
			JsonNode staticPage5s 			= data.path("staticPage5s");
			JsonNode staticPageTrainmatrix	= data.path("staticPageTrainmatrix");
			JsonNode staticPage5m1e 		= data.path("staticPage5m1e");
			
			List<SystemParam> existedObjs = new ArrayList<SystemParam>();
			List<SystemParam> newObjs = new ArrayList<SystemParam>();
			
			//staticPageBalance
			String staticPageBalanceId 	= staticPageBalance.get("id").asText();
			String staticPageBalanceValue = staticPageBalance.get("value").asText();
			SystemParam param = new SystemParam();
			
			param.paramValue = StringUtils.isEmpty(staticPageBalanceValue) ? "0" : staticPageBalanceValue;
			param.id = staticPageBalanceId;
			existedObjs.add(param);

			//staticPageLayout
			String staticPageLayoutId 	= staticPageLayout.get("id").asText();
			String staticPageLayoutValue = staticPageLayout.get("value").asText();
			SystemParam param1 = new SystemParam();
			
			param1.paramValue = StringUtils.isEmpty(staticPageLayoutValue) ? "0" : staticPageLayoutValue;
			param1.id = staticPageLayoutId;
			existedObjs.add(param1);
			
			//staticPageOeepdca
			String staticPageOeepdcaId 	= staticPageOeepdca.get("id").asText();
			String staticPageOeepdcaValue = staticPageOeepdca.get("value").asText();
			SystemParam param2 = new SystemParam();
			
			param2.paramValue = StringUtils.isEmpty(staticPageOeepdcaValue) ? "0" : staticPageOeepdcaValue;
			param2.id = staticPageOeepdcaId;
			existedObjs.add(param2);
			
			//staticPage5s
			String staticPage5sId 	= staticPage5s.get("id").asText();
			String staticPage5sValue = staticPage5s.get("value").asText();
			SystemParam param3 = new SystemParam();
			
			param3.paramValue = StringUtils.isEmpty(staticPage5sValue) ? "0" : staticPage5sValue;
			param3.id = staticPage5sId;
			existedObjs.add(param3);
			
			//staticPageTrainmatrix
			String staticPageTrainmatrixId 	= staticPageTrainmatrix.get("id").asText();
			String staticPageTrainmatrixValue = staticPageTrainmatrix.get("value").asText();
			SystemParam param4 = new SystemParam();
			
			param4.paramValue = StringUtils.isEmpty(staticPageTrainmatrixValue) ? "0" : staticPageTrainmatrixValue;
			param4.id = staticPageTrainmatrixId;
			existedObjs.add(param4);
			
			//staticPage5m1e
			String staticPage5m1eId 	= staticPage5m1e.get("id").asText();
			String staticPage5m1eValue = staticPage5m1e.get("value").asText();
			SystemParam param5 = new SystemParam();
			
			param5.paramValue = StringUtils.isEmpty(staticPage5m1eValue) ? "0" : staticPage5m1eValue;
			param5.id = staticPage5m1eId;
			existedObjs.add(param5);
			
			if (existedObjs.size() > 0){
				SystemParam.updateList(existedObjs);
			}
			
			if (newObjs.size() > 0){
				SystemParam.saveList(newObjs);
			}
		} catch (Exception e) {
			logger.error(" " + e);
			return ok("0");
		}
		
		return ok("1");
	}
}
