package controllers.report;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSONObject;
import com.avaje.ebean.SqlRow;

import models.HourlyCountBase;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class OeeController extends Controller {
	private static Log logger = LogFactory.getLog(OeeController.class);
	
	/**
	 * 按年份查询OEE
	 * @param lineName
	 * @return
	 */
	public static Result getYearlyOeeReport(String lineName){
		List<SqlRow> rows = HourlyCountBase.findYearlyOeeData(lineName);
		return ok(Json.toJson(rows));
	}
	
	public static Result getDailyOeeReport(String lineName, String yearValue, String monthValue, String dayCount) throws ParseException{
		logger.info("OEE-getDailyOeeReport: selected Line: " + lineName + ", selected Year: " + yearValue + ", selected Month: " + monthValue);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-" + monthValue + "-1");
		Date endDate = df.parse(yearValue + "-" + monthValue + "-" + dayCount);
		List<HourlyCountBase> rows = HourlyCountBase.findDailyOeeData(lineName, startDate, endDate);
		List<Integer> dayList = new ArrayList<Integer>();
		List<Integer> targetCountList = new ArrayList<Integer>();
		List<Float> actualCountList = new ArrayList<Float>();
		int totalDays = Integer.parseInt(dayCount);
		for (int i = 1; i < (totalDays + 1); i ++){
			dayList.add(i);
			targetCountList.add(85);
			String fullDayValue = yearValue + "-" + monthValue + "-" + i;
			boolean isFound = false;
			for (HourlyCountBase base : rows){
				String historyDate = df.format(base.productDate);
				if (fullDayValue.equals(historyDate)){
					float tempValue = (float)(base.actualOeeTotalOutput * 100 / base.targetOeeTotalOutput) ;
					float targetValue = (float)(Math.round(tempValue*100))/100; //保留2位小数
					actualCountList.add(targetValue);
					isFound = true;
					break;
				}
			}
			//totally no data for this day
			if (!isFound){
				actualCountList.add(0.0f);
			}
		}
		JSONObject json = new JSONObject();
		json.put("dayList", dayList);
		json.put("targetList", targetCountList);
		json.put("actualList", actualCountList);
		return ok(json.toJSONString());
	}
	
	
}
