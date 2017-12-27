package controllers.screen;

import java.text.ParseException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;

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
				//only have 1 record
				if (rows.get(0).getInteger("product_hour").equals(hourValue)){
					//current hour
					String currType = rows.get(0).getString("product_name1");
					currType = StringUtils.isEmpty(currType) ? rows.get(0).getString("product_name2") : currType;
					json.put("currType", currType);
					String currJP = rows.get(0).getString("product_cycle_1");
					currJP = (StringUtils.isEmpty(currJP) || "0".equals(currJP)) ? rows.get(0).getString("product_cycle_2") : currJP;
					int currJPInt = (StringUtils.isEmpty(currJP) || "0".equals(currJP)) ? 0 : Integer.parseInt(currJP);
					json.put("currJP", currJPInt);
					String currRS = rows.get(0).getString("product_persons_1");
					currRS = (StringUtils.isEmpty(currRS) || "0".equals(currRS)) ? rows.get(0).getString("product_persons_2") : currRS;
					int currRSInt = (StringUtils.isEmpty(currRS) || "0".equals(currRS)) ? 0 : Integer.parseInt(currRS);
					json.put("currRS", currRSInt );
					int planCC = rows.get(0).getInteger("plan_count");
					int expectedCC = Math.round( (float)(planCC / 60) * minValue );
					json.put("planCC", planCC);
					json.put("expectedCC", expectedCC);
					int actualCC = rows.get(0).getInteger("product_hour_count") == null ? 0:rows.get(0).getInteger("product_hour_count");
					json.put("actualCC", actualCC);
					json.put("diff", (actualCC - planCC));
					json.put("oee", rows.get(0).getFloat("target_oee_percent"));
					json.put("nextType", "");
					json.put("nextJP", "");
					json.put("nextRS", "");
				}
				else{
					//next hour
					json.put("currType", "");
					json.put("currJP", "");
					json.put("currRS", "" );
					json.put("planCC", "");
					json.put("expectedCC", "");
					json.put("actualCC", "");
					json.put("diff", "");
					json.put("oee", "");
					
					String nextType = rows.get(0).getString("product_name1");
					nextType = StringUtils.isEmpty(nextType) ? rows.get(0).getString("product_name2") : nextType;
					json.put("nextType", nextType);
					String nextJP = rows.get(0).getString("product_cycle_1");
					nextJP = (StringUtils.isEmpty(nextJP) || "0".equals(nextJP)) ? rows.get(0).getString("product_cycle_2") : nextJP;
					int nextJPInt = (StringUtils.isEmpty(nextJP) || "0".equals(nextJP)) ? 0 : Integer.parseInt(nextJP);
					json.put("nextJP", nextJPInt);
					String nextRS = rows.get(0).getString("product_persons_1");
					nextRS = (StringUtils.isEmpty(nextRS) || "0".equals(nextRS)) ? rows.get(0).getString("product_persons_2") : nextRS;
					int nextRSInt = (StringUtils.isEmpty(nextRS) || "0".equals(nextRS)) ? 0 : Integer.parseInt(nextRS);
					json.put("nextRS", nextRSInt );
					
					
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
				String currType = currentRow.getString("product_name1");
				currType = StringUtils.isEmpty(currType) ? currentRow.getString("product_name2") : currType;
				json.put("currType", currType);
				String currJP = currentRow.getString("product_cycle_1");
				currJP = (StringUtils.isEmpty(currJP) || "0".equals(currJP)) ? currentRow.getString("product_cycle_2") : currJP;
				int currJPInt = (StringUtils.isEmpty(currJP) || "0".equals(currJP)) ? 0 : Integer.parseInt(currJP);
				json.put("currJP", currJPInt);
				String currRS = currentRow.getString("product_persons_1");
				currRS = (StringUtils.isEmpty(currRS) || "0".equals(currRS)) ? currentRow.getString("product_persons_2") : currRS;
				int currRSInt = (StringUtils.isEmpty(currRS) || "0".equals(currRS)) ? 0 : Integer.parseInt(currRS);
				json.put("currRS", currRSInt );
				int planCC = currentRow.getInteger("plan_count");
				int expectedCC = Math.round( (float)(planCC / 60) * minValue );
				json.put("planCC", planCC);
				json.put("expectedCC", expectedCC);
				int actualCC = currentRow.getInteger("product_hour_count") == null ? 0:currentRow.getInteger("product_hour_count");
				json.put("actualCC", actualCC);
				json.put("diff", (actualCC - planCC));
				json.put("oee", currentRow.getFloat("target_oee_percent"));
				
				String nextType = nextRow.getString("product_name1");
				nextType = StringUtils.isEmpty(nextType) ? nextRow.getString("product_name2") : nextType;
				json.put("nextType", nextType);
				String nextJP = nextRow.getString("product_cycle_1");
				nextJP = (StringUtils.isEmpty(nextJP) || "0".equals(nextJP)) ? nextRow.getString("product_cycle_2") : nextJP;
				int nextJPInt = (StringUtils.isEmpty(nextJP) || "0".equals(nextJP)) ? 0 : Integer.parseInt(nextJP);
				json.put("nextJP", nextJPInt);
				String nextRS = nextRow.getString("product_persons_1");
				nextRS = (StringUtils.isEmpty(nextRS) || "0".equals(nextRS)) ? nextRow.getString("product_persons_2") : nextRS;
				int nextRSInt = (StringUtils.isEmpty(nextRS) || "0".equals(nextRS)) ? 0 : Integer.parseInt(nextRS);
				json.put("nextRS", nextRSInt );
				
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
