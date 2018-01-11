package controllers.report;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.avaje.ebean.SqlRow;

import models.HourlyCountBase;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class ProductivityController extends Controller {
	private static Log logger = LogFactory.getLog(ProductivityController.class);
	
	/**
	 * 按年份查询
	 * @param lineName
	 * @return
	 */
	public static Result getYearlyProductivityReport(String lineName, String yearValue){
		List<SqlRow> rows;
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date endDate = df.parse(yearValue + "-12-31");
			//always query the data including 4 years ago.
			Date startDate = df.parse( (Integer.parseInt(yearValue) - 4) + "-01-01");
			rows = HourlyCountBase.findYearlyProductivityData(lineName, startDate, endDate);
			return ok(Json.toJson(rows));
		} catch (ParseException e) {
			logger.error("" + e);
			return ok("");
		}
		
	}
	
	/**
	 * 按月份查询
	 * @param lineName
	 * @param yearValue
	 * @return
	 * @throws ParseException
	 */
	public static Result getMonthlyProductivityReport(String lineName, String yearValue) throws ParseException{
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountBase.findMonthlyProductivityData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		
		List<Float> targetTotalList = new ArrayList<Float>();
		List<Float> actualTotalList = new ArrayList<Float>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					targetTotalList.add(11.0f);
					String manHourTotal_1 = row.getString("man_hour_total_1");
					String manHourTotal_2 = row.getString("man_hour_total_2");
					String manHourTotal_3 = row.getString("man_hour_total_3");
					String actualTotalStr = row.getString("actual_Total");
					int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
					if (actualTotal == 0)
						actualTotalList.add(0.0f);
					else{
						int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
						int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
						int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
						float tempValue = (float) Math.round( ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) * 100 / actualTotal ) / 100; //保留2位小数
						actualTotalList.add( tempValue );
					}
					break;
				}
			}
			if (!isFound){
				
				targetTotalList.add(11.0f);
				actualTotalList.add(0.0f);
			}
		}
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("targetTotal", targetTotalList);
		json.put("actualTotal", actualTotalList);
		return ok(json.toJSONString());
	}
	
	/**
	 * 按天查询
	 * @param lineName
	 * @param yearValue
	 * @param monthValue
	 * @param dayCount
	 * @return
	 * @throws ParseException
	 */
	public static Result getDailyProductivityReport(String lineName, String yearValue, String monthValue, String dayCount) throws ParseException{
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-" + monthValue + "-1");
		Date endDate = df.parse(yearValue + "-" + monthValue + "-" + dayCount);
		List<SqlRow> rows = HourlyCountBase.findDailyProductivityData(lineName, startDate, endDate);
		List<Integer> dayList = new ArrayList<Integer>();
		List<Float> targetCountList = new ArrayList<Float>();
		List<Float> actualCountList = new ArrayList<Float>();
		int totalDays = Integer.parseInt(dayCount);
		for (int i = 1; i < (totalDays + 1); i ++){
			dayList.add(i);
			
			String dayValue = String.format("%02d", i);
			boolean isFound = false;
			for (SqlRow row : rows){
				String historyDate = row.getString("days");
				if (dayValue.equals(historyDate)){
					isFound = true;
					targetCountList.add(11.0f);
					String manHourTotal_1 = row.getString("man_hour_total_1");
					String manHourTotal_2 = row.getString("man_hour_total_2");
					String manHourTotal_3 = row.getString("man_hour_total_3");
					String actualTotalStr = row.getString("actual_Total");
					int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
					if (actualTotal == 0)
						actualCountList.add(0.0f);
					else{
						int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
						int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
						int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
						float tempValue = (float) Math.round( ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) * 100 / actualTotal ) / 100; //保留2位小数
						actualCountList.add( tempValue );
					}
					break;
				}
			}
			//totally no data for this day
			if (!isFound){
				actualCountList.add(0.0f);
				targetCountList.add(11.0f);
			}
		}
		JSONObject json = new JSONObject();
		json.put("dayList", dayList);
		json.put("targetList", targetCountList);
		json.put("actualList", actualCountList);
		return ok(json.toJSONString());
	}
	
	
}
