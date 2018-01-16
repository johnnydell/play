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

import models.ProductLine;
import models.Safety;
import play.mvc.Controller;
import play.mvc.Result;

public class SafetyController extends Controller {
	private static Log logger = LogFactory.getLog(SafetyController.class);
	
	/**
	 * 按年份查询Safety
	 * @param lineName
	 * @return
	 * @throws ParseException 
	 */
	public static Result getYearlySafetyReport(String lineName, String yearValue) throws ParseException{
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date endDate = df.parse(yearValue + "-12-31");
		
		int endYear = Integer.parseInt(yearValue);
		int startYear = endYear - 3;
		//always query the data including 4 years ago.
		Date startDate = df.parse( startYear + "-01-01");
		List<SqlRow> rows = Safety.findYearlySafetyData(lineName, startDate, endDate);
		
		List<Integer> years = new ArrayList<Integer>();
		
		List<Integer> targetTotalList = new ArrayList<Integer>();
		List<Integer> actualTotalList = new ArrayList<Integer>();
		
		for (int i = startYear; i < endYear + 1; i ++){
			years.add(i);
			boolean isFound = false;
			for(SqlRow row : rows){
				if (Integer.parseInt(row.getString("years")) == i){
					isFound = true;
					targetTotalList.add(row.getInteger("target_total"));
					actualTotalList.add(row.getInteger("actual_total"));
					break;
				}
			}
			if (!isFound){
				
				targetTotalList.add(0);
				actualTotalList.add(0);
			}
		}
		JSONObject json = new JSONObject();
		json.put("yearList", years);
		json.put("targetTotal", targetTotalList);
		json.put("actualTotal", actualTotalList);
		
		return ok(json.toJSONString());
	}
	
	/**
	 * 按月份查询
	 * @param lineName
	 * @param yearValue
	 * @return
	 * @throws ParseException
	 */
	public static Result getMonthlySafetyReport(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlySafetyReport: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = Safety.findMonthlySafetyData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		
		List<Integer> targetTotal = new ArrayList<Integer>();
		List<Integer> actualTotal = new ArrayList<Integer>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			//targetOeeTotal.add(85);
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					targetTotal.add(row.getInteger("target_total") == null ? 0 : row.getInteger("target_total"));
					actualTotal.add(row.getInteger("actual_total") == null ? 0 : row.getInteger("actual_total"));
					break;
				}
			}
			if (!isFound){
				
				targetTotal.add(0);
				actualTotal.add(0);
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
	public static Result getDailySafetyReport(String lineName, String yearValue, String monthValue, String dayCount) throws ParseException{
		logger.info("getDailySafetyReport: selected Line: " + lineName + ", selected Year: " + yearValue + ", selected Month: " + monthValue);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-" + monthValue + "-1");
		Date endDate = df.parse(yearValue + "-" + monthValue + "-" + dayCount);
		List<Safety> rows = Safety.getSafetiesByLineAndDate(lineName, startDate, endDate);
		List<Integer> dayList = new ArrayList<Integer>();
		List<Integer> targetCountList = new ArrayList<Integer>();
		List<Integer> actualCountList = new ArrayList<Integer>();
		int totalDays = Integer.parseInt(dayCount);
		for (int i = 1; i < (totalDays + 1); i ++){
			dayList.add(i);
			
			String fullDayValue = yearValue + "-" + monthValue + "-" + String.format("%02d", i);
			boolean isFound = false;
			for (Safety base : rows){
				String historyDate = df.format(base.safetyDate);
				if (fullDayValue.equals(historyDate)){
					
					actualCountList.add(base.safetyActualCount);
					isFound = true;
					targetCountList.add(base.safetyTargetCount);
					break;
				}
			}
			//totally no data for this day
			if (!isFound){
				actualCountList.add(0);
				targetCountList.add(0);
			}
		}
		JSONObject json = new JSONObject();
		json.put("dayList", dayList);
		json.put("targetTotal", targetCountList);
		json.put("actualTotal", actualCountList);
		return ok(json.toJSONString());
	}
	
	/**
	 * 按年查询Summary
	 * @param yearValue
	 * @return
	 */
	
	public static Result getYearlySafetySummaryReport(String yearValue){
		List<SqlRow> rows;
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date endDate = df.parse(yearValue + "-12-31");
			
			int endYear = Integer.parseInt(yearValue);
			int startYear = endYear - 3;
			//always query the data including 4 years ago.
			Date startDate = df.parse( startYear + "-01-01");
			
			rows = Safety.findYearlySafetySummaryData(startDate, endDate);
			
			List<ProductLine> lines = ProductLine.getActiveList();
			
			List<Integer> years = new ArrayList<Integer>();
			
			List<JSONObject> objs = new ArrayList<JSONObject>();
			//initial data struct
			for (int i = startYear; i < endYear + 1; i ++){
				years.add(i);
				for(ProductLine line : lines){
					JSONObject obj = new JSONObject();
					obj.put("years", i);
					obj.put("lineName", line.lineName);
					obj.put("targetTotal", 0);
					obj.put("actualTotal", 0);
					objs.add(obj);
				}
			}
			//compare database selected data with initial data
			for(SqlRow row : rows){
				String targetData = row.getString("target_total");
				String actualData = row.getString("actual_total");
				
				String curLineName = row.getString("line_name");
				String year = row.getString("years");
				
				
				for (JSONObject obj : objs){
					if (obj.get("years").toString().equals(year) && obj.get("lineName").equals(curLineName)){
						targetData = StringUtils.isEmpty(targetData) ? "0" : targetData;
						actualData = StringUtils.isEmpty(actualData) ? "0" : actualData;
						obj.put("actualTotal", actualData);
						obj.put("targetTotal", targetData);
						break;
					}
				}
			}
			
			
			//reconstruct data struct 
			List<JSONObject> tmpList = new ArrayList<JSONObject>();
			for (JSONObject obj : objs){
				String lineName = obj.get("lineName").toString();
				if (tmpList.size() == 0){
					JSONObject tmp_1 = new JSONObject();
					List<Float> listActual = new ArrayList<Float>();
					List<Float> listTarget = new ArrayList<Float>();
					listActual.add(obj.getFloat("actualTotal"));
					listTarget.add(obj.getFloat("targetTotal"));
					tmp_1.put("lineName", lineName);
					tmp_1.put("actualdata", listActual);
					tmp_1.put("targetdata", listTarget);
					tmpList.add(tmp_1);
				}
				else
				{
					boolean isFound = false;
					for(JSONObject tmp : tmpList){
						if (lineName.equals(tmp.get("lineName").toString())){
							((List<Float>)(tmp.get("actualdata"))).add(obj.getFloat("actualTotal"));
							((List<Float>)(tmp.get("targetdata"))).add(obj.getFloat("targetTotal"));
							isFound = true;
							break;
						}
						
					}
					if(!isFound){
						List<Float> listActual = new ArrayList<Float>();
						List<Float> listTarget = new ArrayList<Float>();
						JSONObject tmp_2 = new JSONObject();
						listActual.add(obj.getFloat("actualTotal"));
						listTarget.add(obj.getFloat("targetTotal"));
						tmp_2.put("lineName", lineName);
						tmp_2.put("actualdata", listActual);
						tmp_2.put("targetdata", listTarget);
						tmpList.add(tmp_2);
					}
				}
			}
			
			JSONObject json = new JSONObject();
			json.put("yearList", years);
			json.put("dataList", tmpList);
			
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
	public static Result getMonthlySafetySummaryReport(String yearValue) throws ParseException{
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = Safety.findMonthlySafetySummaryData(startDate, endDate);
		List<ProductLine> lines = ProductLine.getActiveList();
		List<Integer> months = new ArrayList<Integer>();
		
		
		List<JSONObject> objs = new ArrayList<JSONObject>();
		for (int i = 1; i < 12 + 1; i ++){
			months.add(i);
			for(ProductLine line : lines){
				JSONObject obj = new JSONObject();
				obj.put("months", i);
				obj.put("lineName", line.lineName);
				obj.put("targetTotal", 0);
				obj.put("actualTotal", 0);
				objs.add(obj);
			}
		}
		for(SqlRow row : rows){
			String targetData = row.getString("target_total");
			String actualData = row.getString("actual_total");
			
			String curLineName = row.getString("line_name");
			
			String month = row.getString("months");
			
			
			for (JSONObject obj : objs){
				if (Integer.parseInt(obj.get("months").toString()) == (Integer.parseInt(month)) && obj.get("lineName").equals(curLineName)){
					targetData = StringUtils.isEmpty(targetData) ? "0" : targetData;
					actualData = StringUtils.isEmpty(actualData) ? "0" : actualData;
					obj.put("actualTotal", actualData);
					obj.put("targetTotal", targetData);
					break;
				}
			}
		}
		
		List<JSONObject> tmpList = new ArrayList<JSONObject>();
		for (JSONObject obj : objs){
			String lineName = obj.get("lineName").toString();
			if (tmpList.size() == 0){
				JSONObject tmp_1 = new JSONObject();
				List<Float> listActual = new ArrayList<Float>();
				List<Float> listTarget = new ArrayList<Float>();
				listActual.add(obj.getFloat("actualTotal"));
				listTarget.add(obj.getFloat("targetTotal"));
				tmp_1.put("lineName", lineName);
				tmp_1.put("actualdata", listActual);
				tmp_1.put("targetdata", listTarget);
				tmpList.add(tmp_1);
			}
			else
			{
				boolean isFound = false;
				for(JSONObject tmp : tmpList){
					if (lineName.equals(tmp.get("lineName").toString())){
						((List<Integer>)(tmp.get("actualdata"))).add(obj.getInteger("actualTotal"));
						((List<Integer>)(tmp.get("targetdata"))).add(obj.getInteger("targetTotal"));
						isFound = true;
						break;
					}
					
				}
				if(!isFound){
					List<Float> listActual = new ArrayList<Float>();
					List<Float> listTarget = new ArrayList<Float>();
					JSONObject tmp_2 = new JSONObject();
					listActual.add(obj.getFloat("actualTotal"));
					listTarget.add(obj.getFloat("targetTotal"));
					tmp_2.put("lineName", lineName);
					tmp_2.put("actualdata", listActual);
					tmp_2.put("targetdata", listTarget);
					tmpList.add(tmp_2);
				}
			}
		}
		
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("dataList", tmpList);
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
	public static Result getDailySafetySummaryReport(String yearValue, String monthValue, String dayCount) throws ParseException{
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-" + monthValue + "-1");
		Date endDate = df.parse(yearValue + "-" + monthValue + "-" + dayCount);
		List<SqlRow> rows = Safety.findDailySafetySummaryData(startDate, endDate);
		List<Integer> dayList = new ArrayList<Integer>();
		List<ProductLine> lines = ProductLine.getActiveList();
		int totalDays = Integer.parseInt(dayCount);
		
		List<JSONObject> objs = new ArrayList<JSONObject>();
		for (int i = 1; i < (totalDays + 1); i ++){
			dayList.add(i);
			for(ProductLine line : lines){
				JSONObject obj = new JSONObject();
				obj.put("days", i);
				obj.put("lineName", line.lineName);
				obj.put("targetTotal", 0);
				obj.put("actualTotal", 0);
				objs.add(obj);
			}
		}
		for(SqlRow row : rows){
			String targetData = row.getString("target_total");
			String actualData = row.getString("actual_total");
			
			String curLineName = row.getString("line_name");
			String days = row.getString("days");
			
			
			for (JSONObject obj : objs){
				if (Integer.parseInt(obj.get("days").toString()) == (Integer.parseInt(days)) && obj.get("lineName").equals(curLineName)){
					targetData = StringUtils.isEmpty(targetData) ? "0" : targetData;
					actualData = StringUtils.isEmpty(actualData) ? "0" : actualData;
					obj.put("actualTotal", actualData);
					obj.put("targetTotal", targetData);
					break;
				}
			}
		}
		
		List<JSONObject> tmpList = new ArrayList<JSONObject>();
		for (JSONObject obj : objs){
			String lineName = obj.get("lineName").toString();
			if (tmpList.size() == 0){
				JSONObject tmp_1 = new JSONObject();
				List<Float> listActual = new ArrayList<Float>();
				List<Float> listTarget = new ArrayList<Float>();
				listActual.add(obj.getFloat("actualTotal"));
				listTarget.add(obj.getFloat("targetTotal"));
				tmp_1.put("lineName", lineName);
				tmp_1.put("actualdata", listActual);
				tmp_1.put("targetdata", listTarget);
				tmpList.add(tmp_1);
			}
			else
			{
				boolean isFound = false;
				for(JSONObject tmp : tmpList){
					if (lineName.equals(tmp.get("lineName").toString())){
						((List<Integer>)(tmp.get("actualdata"))).add(obj.getInteger("actualTotal"));
						((List<Integer>)(tmp.get("targetdata"))).add(obj.getInteger("targetTotal"));
						isFound = true;
						break;
					}
					
				}
				if(!isFound){
					List<Float> listActual = new ArrayList<Float>();
					List<Float> listTarget = new ArrayList<Float>();
					JSONObject tmp_2 = new JSONObject();
					listActual.add(obj.getFloat("actualTotal"));
					listTarget.add(obj.getFloat("targetTotal"));
					tmp_2.put("lineName", lineName);
					tmp_2.put("actualdata", listActual);
					tmp_2.put("targetdata", listTarget);
					tmpList.add(tmp_2);
				}
			}
		}
		
		
		JSONObject json = new JSONObject();
		json.put("dayList", dayList);
		json.put("dataList", tmpList);
		return ok(json.toJSONString());
	}
	
	
}
