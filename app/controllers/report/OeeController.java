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
import play.mvc.Controller;
import play.mvc.Result;

public class OeeController extends Controller {
	private static Log logger = LogFactory.getLog(OeeController.class);
	
	/**
	 * 按年份查询OEE
	 * @param lineName
	 * @return
	 * @throws ParseException 
	 */
	public static Result getYearlyOeeReport(String lineName, String yearValue) throws ParseException{
		
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date endDate = df.parse(yearValue + "-12-31");
		
		int endYear = Integer.parseInt(yearValue);
		int startYear = endYear - 3;
		//always query the data including 4 years ago.
		Date startDate = df.parse( startYear + "-01-01");
		List<SqlRow> rows = HourlyCountBase.findYearlyOeeData(lineName, startDate, endDate);
		
		List<Integer> years = new ArrayList<Integer>();
		
		List<Integer> targetTotalList = new ArrayList<Integer>();
		List<Integer> actualTotalList = new ArrayList<Integer>();
		List<Float> oeePercentlList = new ArrayList<Float>();
		
		for (int i = startYear; i < endYear + 1; i ++){
			years.add(i);
			boolean isFound = false;
			for(SqlRow row : rows){
				if (Integer.parseInt(row.getString("years")) == i){
					isFound = true;
					targetTotalList.add(row.getInteger("target_oee_total"));
					actualTotalList.add(row.getInteger("actual_oee_total"));
					oeePercentlList.add(row.getFloat("target_oee_percent"));
					break;
				}
			}
			if (!isFound){
				
				targetTotalList.add(0);
				actualTotalList.add(0);
				oeePercentlList.add(0.0f);
			}
		}
		JSONObject json = new JSONObject();
		json.put("yearList", years);
		json.put("targetTotal", targetTotalList);
		json.put("actualTotal", actualTotalList);
		json.put("targetPercent", oeePercentlList);
		
		return ok(json.toJSONString());
	}
	
	public static Result getDailyOeeReport(String lineName, String yearValue, String monthValue, String dayCount) throws ParseException{
		logger.info("OEE-getDailyOeeReport: selected Line: " + lineName + ", selected Year: " + yearValue + ", selected Month: " + monthValue);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-" + monthValue + "-1");
		Date endDate = df.parse(yearValue + "-" + monthValue + "-" + dayCount);
		List<HourlyCountBase> rows = HourlyCountBase.findDailyOeeData(lineName, startDate, endDate);
		List<Integer> dayList = new ArrayList<Integer>();
		List<Double> targetCountList = new ArrayList<Double>();
		List<Float> actualCountList = new ArrayList<Float>();
		int totalDays = Integer.parseInt(dayCount);
		for (int i = 1; i < (totalDays + 1); i ++){
			dayList.add(i);
			
			String fullDayValue = yearValue + "-" + monthValue + "-" + String.format("%02d", i);
			boolean isFound = false;
			
			for (HourlyCountBase base : rows){
				String historyDate = df.format(base.productDate);
				if (fullDayValue.equals(historyDate)){
					float tempValue;
					if(null == base.targetOeeTotalOutput || base.targetOeeTotalOutput == 0){
						tempValue = 0f;
					} else {
						tempValue = (float)(base.actualOeeTotalOutput * 100 / base.targetOeeTotalOutput) ;
					}
					float targetValue = (float)(Math.round(tempValue*10))/10; //保留1位小数
					actualCountList.add(targetValue);
					isFound = true;
					targetCountList.add(base.targetOeePercent);
					break;
				}
			}
			//totally no data for this day
			if (!isFound){
				actualCountList.add(0.0f);
				targetCountList.add(70.0d);
			}
		}
		JSONObject json = new JSONObject();
		json.put("dayList", dayList);
		json.put("targetList", targetCountList);
		json.put("actualList", actualCountList);
		return ok(json.toJSONString());
	}
	
	
}
