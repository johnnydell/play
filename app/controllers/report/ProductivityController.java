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
import models.ProductLine;
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
			
			int endYear = Integer.parseInt(yearValue);
			int startYear = endYear - 3;
			//always query the data including 4 years ago.
			Date startDate = df.parse( startYear + "-01-01");
			
			rows = HourlyCountBase.findYearlyProductivityData(lineName, startDate, endDate);
			
			List<Integer> years = new ArrayList<Integer>();
			
			List<Float> targetTotalList = new ArrayList<Float>();
			List<Float> actualTotalList = new ArrayList<Float>();
			
			for (int i = startYear; i < endYear + 1; i ++){
				years.add(i);
				boolean isFound = false;
				for(SqlRow row : rows){
					if (Integer.parseInt(row.getString("years")) == i){
						isFound = true;
						targetTotalList.add(11.0f);
						String manHourTotal_1 = row.getString("man_hour_total_1");
						String manHourTotal_2 = row.getString("man_hour_total_2");
						String manHourTotal_3 = row.getString("man_hour_total_3");
						String actualTotalStr = row.getString("actual_Total");
						int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
						int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
						int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
						int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
						if ((manHourTotal1 + manHourTotal2 + manHourTotal3) == 0)
							actualTotalList.add(0.0f);
						else{
							float tempValue = (float) Math.round(  actualTotal * 100 / ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) ) / 100; //保留2位小数
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
			json.put("yearList", years);
			json.put("targetTotal", targetTotalList);
			json.put("actualTotal", actualTotalList);
			return ok(json.toJSONString());
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
					int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
					int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
					int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
					int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
					if ((manHourTotal1 + manHourTotal2 + manHourTotal3) == 0)
						actualTotalList.add(0.0f);
					else{
						float tempValue = (float) Math.round(  actualTotal * 100 / ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) ) / 100; //保留2位小数
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
					int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
					int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
					int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
					int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
					if ((manHourTotal1 + manHourTotal2 + manHourTotal3) == 0)
						actualCountList.add(0.0f);
					else{
						float tempValue = (float) Math.round(  actualTotal * 100 / ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) ) / 100; //保留2位小数
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
	
	/**
	 * 按年查询Summary
	 * @param yearValue
	 * @return
	 */
	
	public static Result getYearlyProdSummaryReport(String yearValue){
		List<SqlRow> rows;
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date endDate = df.parse(yearValue + "-12-31");
			
			int endYear = Integer.parseInt(yearValue);
			int startYear = endYear - 3;
			//always query the data including 4 years ago.
			Date startDate = df.parse( startYear + "-01-01");
			
			rows = HourlyCountBase.findYearlyProdSummaryData(startDate, endDate);
			
			List<ProductLine> lines = ProductLine.getActiveList();
			
			List<Integer> years = new ArrayList<Integer>();
			
			List<List<JSONObject>> totalList = new ArrayList<List<JSONObject>>();
			
			List<JSONObject> objs = new ArrayList<JSONObject>();
			for (int i = startYear; i < endYear + 1; i ++){
				
				for(ProductLine line : lines){
					JSONObject obj = new JSONObject();
					obj.put("years", i);
					obj.put("lineName", line.lineName);
					obj.put("targetTotal", 11.0f);
					obj.put("actualTotal", 0.0f);
					objs.add(obj);
				}
			}
			for(SqlRow row : rows){
				String manHourTotal_1 = row.getString("man_hour_total_1");
				String manHourTotal_2 = row.getString("man_hour_total_2");
				String manHourTotal_3 = row.getString("man_hour_total_3");
				String actualTotalStr = row.getString("actual_Total");
				String curLineName = row.getString("line_name");
				String year = row.getString("years");
				int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
				int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
				int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
				int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
				
				float actualPercent = 0.0f;
				if ((manHourTotal1 + manHourTotal2 + manHourTotal3) > 0)
					actualPercent = (float) Math.round(  actualTotal * 100 / ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) ) / 100; //保留2位小数
				
				for (JSONObject obj : objs){
					if (obj.get("years").toString().equals(year) && obj.get("lineName").equals(curLineName)){
						
						obj.put("actualTotal", actualPercent);
						break;
					}
				}
			}
			
			for (int i = startYear; i < endYear + 1; i ++){
				years.add(i);
				List<JSONObject> tmpList = new ArrayList<JSONObject>();
				
				for (JSONObject obj : objs){
					if (Integer.parseInt(obj.get("years").toString()) == i ){
						tmpList.add(obj);
					}
				}
				totalList.add(tmpList);
			}
			
			JSONObject json = new JSONObject();
			json.put("yearList", years);
			json.put("dataList", totalList);
			//json.put("actualTotal", actualTotalList);
			
			return ok(json.toJSONString());
		} catch (ParseException e) {
			logger.error("" + e);
			return ok("");
		}
		
	}
	
	/**
	 * 按月份查询Summary
	 * @param lineName
	 * @param yearValue
	 * @return
	 * @throws ParseException
	 */
	public static Result getMonthlyProdSummaryReport(String yearValue) throws ParseException{
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountBase.findMonthlyProdSummaryData(startDate, endDate);
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
					int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
					int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
					int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
					int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
					if ((manHourTotal1 + manHourTotal2 + manHourTotal3) == 0)
						actualTotalList.add(0.0f);
					else{
						float tempValue = (float) Math.round(  actualTotal * 100 / ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) ) / 100; //保留2位小数
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
	 * 按天查询Summary
	 * @param lineName
	 * @param yearValue
	 * @param monthValue
	 * @param dayCount
	 * @return
	 * @throws ParseException
	 */
	public static Result getDailyProdSummaryReport(String yearValue, String monthValue, String dayCount) throws ParseException{
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-" + monthValue + "-1");
		Date endDate = df.parse(yearValue + "-" + monthValue + "-" + dayCount);
		List<SqlRow> rows = HourlyCountBase.findDailyProdSummaryData(startDate, endDate);
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
					int manHourTotal1 = StringUtils.isEmpty(manHourTotal_1) ? 0 : Integer.parseInt(manHourTotal_1);
					int manHourTotal2 = StringUtils.isEmpty(manHourTotal_2) ? 0 : Integer.parseInt(manHourTotal_2);
					int manHourTotal3 = StringUtils.isEmpty(manHourTotal_3) ? 0 : Integer.parseInt(manHourTotal_3);
					int actualTotal = StringUtils.isEmpty(actualTotalStr) ? 0 : Integer.parseInt(actualTotalStr);
					if ((manHourTotal1 + manHourTotal2 + manHourTotal3) == 0)
						actualCountList.add(0.0f);
					else{
						float tempValue = (float) Math.round(  actualTotal * 100 / ( manHourTotal1 + manHourTotal2 + manHourTotal3 ) ) / 100; //保留2位小数
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
