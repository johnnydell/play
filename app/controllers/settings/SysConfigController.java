package controllers.settings;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.avaje.ebean.SqlRow;

import models.OeeLossChildChildType;
import models.OeeLossChildType;
import models.OeeLossType;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class SysConfigController extends Controller {
	
	private static Log logger = LogFactory.getLog(SysConfigController.class);
	
	public static Result getOeeLossSubTypes(){
		List<SqlRow> lists = OeeLossChildChildType.findAllBySql();
		Map<String, Map<String, Map<String, String>>> results = new HashMap<String, Map<String,Map<String, String>>>();
		
		
		for(SqlRow row : lists){
			String lossName = row.getString("loss_name");
			String subLossName = row.getString("sub_loss_name");
			String id = row.getString("id");
			String subSubLossName = row.getString("sub_sub_loss_name");
			if (results.containsKey(lossName)){
				if (results.get(lossName).containsKey(subLossName)){
					if (!results.get(lossName).get(subLossName).containsKey(id) && !StringUtils.isEmpty(id) && !id.equalsIgnoreCase("null")){
						results.get(lossName).get(subLossName).put(id, subSubLossName);
					}
						
				}else{
					Map<String, String> subSubLosses = new HashMap<String, String>();
					if (!StringUtils.isEmpty(id) && !id.equalsIgnoreCase("null"))
						subSubLosses.put(id, subSubLossName);
					results.get(lossName).put(subLossName, subSubLosses);
				}
			}
			else{
				Map<String, String> subSubLosses = new HashMap<String, String>();
				if (!StringUtils.isEmpty(id) && !id.equalsIgnoreCase("null"))
					subSubLosses.put(id, subSubLossName);
				Map<String, Map<String, String>> subLosses = new HashMap<String, Map<String, String>>();
				subLosses.put(subLossName, subSubLosses);
				results.put(lossName, subLosses);
			}
		}
		
		/*List<OeeLossType> losses = new ArrayList<OeeLossType>();
		for(SqlRow row : lists){
			String lossId = row.getString("loss_id");
			String lossName = row.getString("loss_name");
			String subLossId = row.getString("sub_loss_id");
			String subLossName = row.getString("sub_loss_name");
			String subSubLossId = row.getString("sub_sub_loss_id");
			String subSubLossName = row.getString("sub_sub_loss_name");
			
			for (OeeLossType oeeLoss : losses){
				if (oeeLoss.id.equals(lossId)){
					for (OeeLossChildType subLoss : oeeLoss.subTypes ){
						if (subLoss.id.equals(subLossId)){
							
						}else{
							OeeLossChildChildType subSubType = new OeeLossChildChildType();
							subSubType.id = subSubLossId;
							subSubType.lossTypeName = subSubLossName;
							OeeLossChildType subLoss_1 = new OeeLossChildType();
							subLoss_1.id = subLossId;
							subLoss_1.subLoseTypeName = subLossName;
							subLoss_1.subSubTypes.add(subSubType);
							oeeLoss.subTypes.add(subLoss_1);
						}
					}
				}
				else{
					OeeLossChildChildType subSubType = new OeeLossChildChildType();
					subSubType.id = subSubLossId;
					subSubType.lossTypeName = subSubLossName;
					OeeLossChildType subLoss = new OeeLossChildType();
					subLoss.id = subLossId;
					subLoss.subLoseTypeName = subLossName;
					subLoss.subSubTypes.add(subSubType);
					oeeLoss.id = lossId;
					oeeLoss.lossTypeName = lossName;
					oeeLoss.subTypes.add(subLoss);
					losses.add(oeeLoss);
				}
			}
			
		}*/
		
		/*JSONObject json = new JSONObject();
		
		for(SqlRow row : lists){
			String lossName = row.getString("loss_name");
			String subLossName = row.getString("sub_loss_name");
			String id = row.getString("id");
			String subSubLossName = row.getString("sub_sub_loss_name");
			if (results.containsKey(lossName)){
				
			}
			else{
				
			}
		}*/
		
		
		return ok(Json.toJson(results));
	}
}
