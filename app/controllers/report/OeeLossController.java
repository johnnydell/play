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

import models.HourlyCountDetail;
import play.mvc.Controller;
import play.mvc.Result;

public class OeeLossController extends Controller {
	private static Log logger = LogFactory.getLog(OeeLossController.class);
	
	public static Result getMonthlyLossDataForOee(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlyLossDataForOee: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountDetail.findMonthlyLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		List<Integer> qualityLossTotal = new ArrayList<Integer>();
		List<Integer> technicalLossTotal = new ArrayList<Integer>();
		List<Integer> changeoverLossTotal = new ArrayList<Integer>();
		List<Integer> orgnizationLossTotal = new ArrayList<Integer>();
		List<Integer> targetOeeTotal = new ArrayList<Integer>();
		List<Float> actualOeeTotal = new ArrayList<Float>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			targetOeeTotal.add(85);
			boolean isFound = false;
			for (SqlRow row : rows){
				if (row.getString("months").equals(String.valueOf(i))){
					isFound = true;
					qualityLossTotal.add(row.getInteger("quality_loss_total"));
					technicalLossTotal.add(row.getInteger("technical_loss_total"));
					changeoverLossTotal.add(row.getInteger("changeover_loss_total"));
					orgnizationLossTotal.add(row.getInteger("orgnization_loss_total"));
					float tempValue = (float)(row.getInteger("actual_oee_total") * 100 / row.getInteger("target_oee_total")) ;
					float targetValue = (float)(Math.round(tempValue*100))/100; //保留2位小数
					actualOeeTotal.add(targetValue);
				}
			}
			if (!isFound){
				qualityLossTotal.add(0);
				technicalLossTotal.add(0);
				changeoverLossTotal.add(0);
				orgnizationLossTotal.add(0);
				actualOeeTotal.add(0.0f);
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("qualityLossTotal", qualityLossTotal);
		json.put("technicalLossTotal", technicalLossTotal);
		json.put("changeoverLossTotal", changeoverLossTotal);
		json.put("orgnizationLossTotal", orgnizationLossTotal);
		json.put("targetOeeTotal", targetOeeTotal);
		json.put("actualOeeTotal", actualOeeTotal);
		return ok(json.toJSONString());
	}
}
