package controllers.screen;

import java.text.ParseException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSONObject;
import com.avaje.ebean.SqlRow;

import models.HourlyCountDetail;
import play.mvc.Controller;
import play.mvc.Result;

public class ScreenDisplayController extends Controller {

	private static Log logger = LogFactory.getLog(ScreenDisplayController.class);
	
	public static Result getProductInfo(String lineName,  String yearValue,  String monthValue,  String dayValue, Integer hourValue, Integer minValue) throws ParseException{
		
		String productDate = yearValue + "-" + monthValue + "-" + dayValue;
		List<SqlRow> rows = HourlyCountDetail.findHourlyData(lineName, productDate, hourValue);
		JSONObject json = new JSONObject();
		
		if (null != rows){
			if (rows.size() == 1){
				//check if this item is current hour
				if (rows.get(0).getInteger("product_hour").equals(hourValue)){
					json.put("currType", rows.get(0).getString("product_name1") == null ? rows.get(0).getString("product_name2") : rows.get(0).getString("product_name1"));
					int currJP = rows.get(0).getInteger("product_cycle_1") == 0 ? rows.get(0).getInteger("product_cycle_2") : rows.get(0).getInteger("product_cycle_1");
					json.put("currJP", currJP);
					json.put("currRS", rows.get(0).getInteger("product_persons_1") == null ? rows.get(0).getInteger("product_persons_2") : rows.get(0).getInteger("product_persons_1") );
					int planCC = rows.get(0).getInteger("plan_count");
					int expectedCC = Math.round(planCC * (float)(minValue / 60));
					json.put("planCC", planCC);
					json.put("expectedCC", expectedCC);
					int actualCC = rows.get(0).getInteger("product_hour_count");
					json.put("actualCC", actualCC);
					json.put("diff", (actualCC - planCC));
					json.put("oee", rows.get(0).getFloat("target_oee_percent"));
					json.put("nextType", "");
					json.put("nextJP", "");
					json.put("nextRS", "");
				}
				else{
					json.put("currType", "");
					json.put("currJP", "");
					json.put("currRS", "" );
					json.put("planCC", "");
					json.put("expectedCC", "");
					json.put("actualCC", "");
					json.put("diff", "");
					json.put("oee", "");
					json.put("currType", rows.get(0).getString("product_name1") == null ? rows.get(0).getString("product_name2") : rows.get(0).getString("product_name1"));
					json.put("nextJP", rows.get(0).getInteger("product_cycle_1") == 0 ? rows.get(0).getInteger("product_cycle_2") : rows.get(0).getInteger("product_cycle_1"));
					json.put("nextRS", rows.get(0).getInteger("product_persons_1") == null ? rows.get(0).getInteger("product_persons_2") : rows.get(0).getInteger("product_persons_1"));
				}
				
			}
			else if (rows.size() == 2){
				SqlRow currentRow = null;
				SqlRow nextRow = null;
				currentRow = rows.get(0);
				if (currentRow.getInteger("product_hour").equals(hourValue)){
					nextRow = rows.get(1);
				}
				else{
					nextRow = rows.get(0);
					currentRow = rows.get(1);
				}
				
				json.put("currType", currentRow.getString("product_name1") == null ? currentRow.getString("product_name2") : currentRow.getString("product_name1"));
				json.put("currJP", currentRow.getInteger("product_cycle_1") == 0 ? currentRow.getInteger("product_cycle_2") : currentRow.getInteger("product_cycle_1"));
				json.put("currRS", currentRow.getInteger("product_persons_1") == null ? currentRow.getInteger("product_persons_2") : currentRow.getInteger("product_persons_1") );
				int planCC = currentRow.getInteger("plan_count");
				int expectedCC = Math.round(planCC * (float)(minValue / 60));
				json.put("planCC", planCC);
				json.put("expectedCC", expectedCC);
				int actualCC = currentRow.getInteger("product_hour_count");
				json.put("actualCC", actualCC);
				json.put("diff", (actualCC - planCC));
				json.put("oee", currentRow.getFloat("target_oee_percent"));
				logger.info("nextRow.getString('product_name1')="  + nextRow.getString("product_name1"));
				logger.info("nextRow.getString('product_name2')="  + nextRow.getString("product_name2"));
				logger.info("nextRow.getInteger('product_cycle_1')="  + nextRow.getInteger("product_cycle_1"));
				json.put("currType", nextRow.getString("product_name1") == null ? nextRow.getString("product_name2") : nextRow.getString("product_name1"));
				json.put("nextJP", nextRow.getInteger("product_cycle_1") == 0 ? nextRow.getInteger("product_cycle_2") : nextRow.getInteger("product_cycle_1"));
				json.put("nextRS", nextRow.getInteger("product_persons_1") == null ? nextRow.getInteger("product_persons_2") : nextRow.getInteger("product_persons_1"));
			}
			else{
				json.put("currType", "");
				json.put("currJP", "");
				json.put("currRS", "" );
				json.put("planCC", "");
				json.put("expectedCC", "");
				json.put("actualCC", "");
				json.put("diff", "");
				json.put("oee", "");
				json.put("nextType", "");
				json.put("nextJP", "");
				json.put("nextRS", "");
			}
		}
		
		
		return ok(json.toJSONString());
	}
	
}
