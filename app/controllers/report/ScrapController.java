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

import models.HourlyCountDetail;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class ScrapController extends Controller {
	private static Log logger = LogFactory.getLog(ScrapController.class);
	
	/**
	 * 按年份查询
	 * @param lineName
	 * @return
	 */
	public static Result getYearlyScrapReport(String lineName, String yearValue){
		List<JSONObject> rows;
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date endDate = df.parse(yearValue + "-12-31");
			//always query the data including 4 years ago.
			Date startDate = df.parse( (Integer.parseInt(yearValue) - 4) + "-01-01");
			rows = HourlyCountDetail.findYearlyScrapData(lineName, startDate, endDate);
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
	public static Result getMonthlyScrapReport(String lineName, String yearValue) throws ParseException{
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<JSONObject> rows = HourlyCountDetail.findMonthlyScrapData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		
		List<Integer> targetTotal = new ArrayList<Integer>();
		List<Long> actualTotal = new ArrayList<Long>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			//targetOeeTotal.add(85);
			boolean isFound = false;
			for (JSONObject row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					targetTotal.add(5000);
					int scrapTotal = row.getInteger("scrapTotal");
					int goodTotal = row.getInteger("actualTotal");
					if (goodTotal == 0)
						actualTotal.add(0l);
					else
						actualTotal.add(Math.round( (double)( scrapTotal * 1000000 / goodTotal ) ));
					break;
				}
			}
			if (!isFound){
				
				targetTotal.add(5000);
				actualTotal.add(0l);
			}
		}
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("targetTotal", targetTotal);
		json.put("actualTotal", actualTotal);
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
	public static Result getDailyScrapReport(String lineName, String yearValue, String monthValue, String dayCount) throws ParseException{
		logger.info("getDailySafetyReport: selected Line: " + lineName + ", selected Year: " + yearValue + ", selected Month: " + monthValue);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-" + monthValue + "-1");
		Date endDate = df.parse(yearValue + "-" + monthValue + "-" + dayCount);
		List<JSONObject> rows = HourlyCountDetail.findDailyScrapData(lineName, startDate, endDate);
		List<Integer> dayList = new ArrayList<Integer>();
		List<Integer> targetCountList = new ArrayList<Integer>();
		List<Long> actualCountList = new ArrayList<Long>();
		int totalDays = Integer.parseInt(dayCount);
		for (int i = 1; i < (totalDays + 1); i ++){
			dayList.add(i);
			
			String dayValue = String.format("%02d", i);
			boolean isFound = false;
			for (JSONObject row : rows){
				String historyDate = row.getString("days");
				if (dayValue.equals(historyDate)){
					isFound = true;
					targetCountList.add(5000);
					int scrapTotal = row.getInteger("scrapTotal");
					int goodTotal = row.getInteger("actualTotal");
					if (goodTotal == 0)
						actualCountList.add(0l);
					else
						actualCountList.add(Math.round( (double)( scrapTotal * 1000000 / goodTotal ) ));
					break;
				}
			}
			//totally no data for this day
			if (!isFound){
				actualCountList.add(0l);
				targetCountList.add(5000);
			}
		}
		JSONObject json = new JSONObject();
		json.put("dayList", dayList);
		json.put("targetList", targetCountList);
		json.put("actualList", actualCountList);
		return ok(json.toJSONString());
	}
	
	
}
