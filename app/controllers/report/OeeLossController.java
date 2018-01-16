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
		List<SqlRow> rowsLoss = HourlyCountDetail.findMonthlyLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		List<Integer> qualityLossTotal = new ArrayList<Integer>();
		List<Integer> technicalLossTotal = new ArrayList<Integer>();
		List<Integer> changeoverLossTotal = new ArrayList<Integer>();
		List<Integer> orgnizationLossTotal = new ArrayList<Integer>();
		List<Float> targetOeeTotal = new ArrayList<Float>();
		List<Float> actualOeeTotal = new ArrayList<Float>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			//targetOeeTotal.add(85);
			boolean isFoundLoss = false;
			for (SqlRow row : rowsLoss){
				if (Integer.parseInt(row.getString("months")) == i){
					isFoundLoss = true;
					qualityLossTotal.add(row.getInteger("quality_loss_total") == null ? 0 : row.getInteger("quality_loss_total"));
					technicalLossTotal.add(row.getInteger("technical_loss_total") == null ? 0 : row.getInteger("technical_loss_total"));
					changeoverLossTotal.add(row.getInteger("changeover_loss_total") == null ? 0 : row.getInteger("changeover_loss_total"));
					orgnizationLossTotal.add(row.getInteger("orgnization_loss_total") == null ? 0 : row.getInteger("orgnization_loss_total"));
					float tempValue = row.getFloat("target_oee_percent");
					float targetValue = (float)(Math.round(tempValue*10))/10;//保留1位小数
					targetOeeTotal.add(targetValue);
					int targetOeeTotalVal = row.getInteger("target_oee_total") == null ? 0 : row.getInteger("target_oee_total");
					if(targetOeeTotalVal == 0){
						tempValue = 0f;
					} else {
						tempValue = (float)(row.getInteger("actual_oee_total") * 100 / row.getInteger("target_oee_total")) ;
					}
					targetValue = (float)(Math.round(tempValue*10))/10; //保留1位小数
					actualOeeTotal.add(targetValue);
					
					break;
				}
			}
			if (!isFoundLoss){
				qualityLossTotal.add(0);
				technicalLossTotal.add(0);
				changeoverLossTotal.add(0);
				orgnizationLossTotal.add(0);
				targetOeeTotal.add(70.0f);
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
	
	public static Result getMonthlyTechinicalLossData(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlyTechinicalLossData: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountDetail.findMonthlyTechnicalLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		List<Integer> breakdownLossTotal = new ArrayList<Integer>();
		List<Integer> adjustmentLossTotal = new ArrayList<Integer>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					breakdownLossTotal.add(row.getInteger("breakdown_loss_total") == null ? 0 : row.getInteger("breakdown_loss_total"));
					adjustmentLossTotal.add(row.getInteger("adjustment_loss_total") == null ? 0 : row.getInteger("adjustment_loss_total"));
					break;
				}
			}
			if (!isFound){
				breakdownLossTotal.add(0);
				adjustmentLossTotal.add(0);
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("breakdown_loss_total", breakdownLossTotal);
		json.put("adjustment_loss_total", adjustmentLossTotal);
		return ok(json.toJSONString());
	}
	
	public static Result getMonthlyOrgnizationLossData(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlyOrgnizationLossData: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountDetail.findMonthlyOrgnizationLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		List<Integer> lackPersonnelLossTotal = new ArrayList<Integer>();
		List<Integer> lackMaterialLossTotal = new ArrayList<Integer>();
		List<Integer> testReleaseThreePartsLossTotal = new ArrayList<Integer>();
		List<Integer> exchgMaterialLossTotal = new ArrayList<Integer>();
		List<Integer> unplanTpmLossTotal = new ArrayList<Integer>();
		List<Integer> unplanSampleLossTotal = new ArrayList<Integer>();
		List<Integer> newOperatorLossTotal = new ArrayList<Integer>();
		List<Integer> othersLossTotal = new ArrayList<Integer>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					lackPersonnelLossTotal.add(row.getInteger("lack_personnel_loss_total") == null ? 0 : row.getInteger("lack_personnel_loss_total"));
					lackMaterialLossTotal.add(row.getInteger("lack_material_loss_total") == null ? 0 : row.getInteger("lack_material_loss_total"));
					testReleaseThreePartsLossTotal.add(row.getInteger("test_release_three_parts_loss_total") == null ? 0 : row.getInteger("test_release_three_parts_loss_total"));
					exchgMaterialLossTotal.add(row.getInteger("exchg_material_loss_total") == null ? 0 : row.getInteger("exchg_material_loss_total"));
					unplanTpmLossTotal.add(row.getInteger("unplan_tpm_loss_total") == null ? 0 : row.getInteger("unplan_tpm_loss_total"));
					unplanSampleLossTotal.add(row.getInteger("unplan_sample_loss_total") == null ? 0 : row.getInteger("unplan_sample_loss_total"));
					newOperatorLossTotal.add(row.getInteger("new_operator_loss_total") == null ? 0 : row.getInteger("new_operator_loss_total"));
					othersLossTotal.add(row.getInteger("others_loss_total") == null ? 0 : row.getInteger("others_loss_total"));
					break;
				}
			}
			if (!isFound){
				lackPersonnelLossTotal.add(0);
				lackMaterialLossTotal.add(0);
				testReleaseThreePartsLossTotal.add(0);
				exchgMaterialLossTotal.add(0);
				unplanTpmLossTotal.add(0);
				unplanSampleLossTotal.add(0);
				newOperatorLossTotal.add(0);
				othersLossTotal.add(0);
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("lack_personnel_loss_total", lackPersonnelLossTotal);
		json.put("lack_material_loss_total", lackMaterialLossTotal);
		json.put("test_release_three_parts_loss_total", testReleaseThreePartsLossTotal);
		json.put("exchg_material_loss_total", exchgMaterialLossTotal);
		json.put("unplan_tpm_loss_total", unplanTpmLossTotal);
		json.put("unplan_sample_loss_total", unplanSampleLossTotal);
		json.put("new_operator_loss_total", newOperatorLossTotal);
		json.put("others_loss_total", othersLossTotal);
		return ok(json.toJSONString());
	}
	
	public static Result getMonthlyChangeoverLossData(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlyChangeoverLossData: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountDetail.findMonthlyChangeoverLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		List<Integer> planSetupLossTotal = new ArrayList<Integer>();
		List<Integer> unplanSetupLossTotal = new ArrayList<Integer>();
		List<Integer> exchgToolLossTotal = new ArrayList<Integer>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					planSetupLossTotal.add(row.getInteger("plan_setup_loss_total") == null ? 0 : row.getInteger("plan_setup_loss_total"));
					unplanSetupLossTotal.add(row.getInteger("unplan_setup_loss_total") == null ? 0 : row.getInteger("unplan_setup_loss_total"));
					exchgToolLossTotal.add(row.getInteger("exchg_tool_loss_total") == null ? 0 : row.getInteger("exchg_tool_loss_total"));
					break;
				}
			}
			if (!isFound){
				planSetupLossTotal.add(0);
				unplanSetupLossTotal.add(0);
				exchgToolLossTotal.add(0);
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("plan_setup_loss_total", planSetupLossTotal);
		json.put("unplan_setup_loss_total", unplanSetupLossTotal);
		json.put("exchg_tool_loss_total", exchgToolLossTotal);
		return ok(json.toJSONString());
	}
	
	public static Result getMonthlyQualityLossData(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlyQualityLossData: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountDetail.findMonthlyQualityLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		List<Integer> scrapLossTotal = new ArrayList<Integer>();
		List<Integer> reworkmentLossTotal = new ArrayList<Integer>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					scrapLossTotal.add(row.getInteger("scrap_loss_total") == null ? 0 : row.getInteger("scrap_loss_total"));
					reworkmentLossTotal.add(row.getInteger("rework_loss_total") == null ? 0 : row.getInteger("rework_loss_total"));
					break;
				}
			}
			if (!isFound){
				scrapLossTotal.add(0);
				reworkmentLossTotal.add(0);
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("scrap_loss_total", scrapLossTotal);
		json.put("rework_loss_total", reworkmentLossTotal);
		return ok(json.toJSONString());
	}
	
	
	public static Result getMonthlyPerformanceLossData(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlyPerformanceLossData: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountDetail.findMonthlyQualityLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		List<Integer> performanceLossTotal = new ArrayList<Integer>();
		List<Integer> undefinedLossTotal = new ArrayList<Integer>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					performanceLossTotal.add(row.getInteger("performance_loss_total") == null ? 0 : row.getInteger("performance_loss_total"));
					undefinedLossTotal.add(row.getInteger("undefined_loss_total") == null ? 0 : row.getInteger("undefined_loss_total"));
					break;
				}
			}
			if (!isFound){
				performanceLossTotal.add(0);
				undefinedLossTotal.add(0);
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		json.put("performance_loss_total", performanceLossTotal);
		json.put("undefined_loss_total", undefinedLossTotal);
		return ok(json.toJSONString());
	}
	
	public static Result getMonthlyAllLossData(String lineName, String yearValue) throws ParseException{
		logger.info("getMonthlyAllLossData: Selected Line = " + lineName + ", Year = " + yearValue );
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(yearValue + "-01-01");
		Date endDate = df.parse(yearValue + "-12-31");
		List<SqlRow> rows = HourlyCountDetail.findMonthlyAllLossData(lineName, startDate, endDate);
		List<Integer> months = new ArrayList<Integer>();
		//QualityLoss
		List<Integer> scrapLossTotal = new ArrayList<Integer>();
		List<Integer> reworkmentLossTotal = new ArrayList<Integer>();
		//TechnicalLoss
		List<Integer> breakdownLossTotal = new ArrayList<Integer>();
		List<Integer> adjustmentLossTotal = new ArrayList<Integer>();
		//ChangeoverLoss
		List<Integer> planSetupLossTotal = new ArrayList<Integer>();
		List<Integer> unplanSetupLossTotal = new ArrayList<Integer>();
		List<Integer> exchgToolLossTotal = new ArrayList<Integer>();
		//OrgnizationLoss
		List<Integer> lackPersonnelLossTotal = new ArrayList<Integer>();
		List<Integer> lackMaterialLossTotal = new ArrayList<Integer>();
		List<Integer> testReleaseThreePartsLossTotal = new ArrayList<Integer>();
		List<Integer> exchgMaterialLossTotal = new ArrayList<Integer>();
		List<Integer> unplanTpmLossTotal = new ArrayList<Integer>();
		List<Integer> unplanSampleLossTotal = new ArrayList<Integer>();
		List<Integer> newOperatorLossTotal = new ArrayList<Integer>();
		List<Integer> othersLossTotal = new ArrayList<Integer>();
		//PerformanceLoss
		List<Integer> performanceLossTotal = new ArrayList<Integer>();
		List<Integer> undefinedLossTotal = new ArrayList<Integer>();
		
		for (int i = 1; i < 13; i ++){
			months.add(i);
			
			boolean isFound = false;
			for (SqlRow row : rows){
				if (Integer.parseInt(row.getString("months")) == i){
					isFound = true;
					//QualityLoss
					scrapLossTotal.add(row.getInteger("scrap_loss_total") == null ? 0 : row.getInteger("scrap_loss_total"));
					reworkmentLossTotal.add(row.getInteger("rework_loss_total") == null ? 0 : row.getInteger("rework_loss_total"));
					//TechnicalLoss
					breakdownLossTotal.add(row.getInteger("breakdown_loss_total") == null ? 0 : row.getInteger("breakdown_loss_total"));
					adjustmentLossTotal.add(row.getInteger("adjustment_loss_total") == null ? 0 : row.getInteger("adjustment_loss_total"));
					//ChangeoverLoss
					planSetupLossTotal.add(row.getInteger("plan_setup_loss_total") == null ? 0 : row.getInteger("plan_setup_loss_total"));
					unplanSetupLossTotal.add(row.getInteger("unplan_setup_loss_total") == null ? 0 : row.getInteger("unplan_setup_loss_total"));
					exchgToolLossTotal.add(row.getInteger("exchg_tool_loss_total") == null ? 0 : row.getInteger("exchg_tool_loss_total"));
					//OrgnizationLoss
					lackPersonnelLossTotal.add(row.getInteger("lack_personnel_loss_total") == null ? 0 : row.getInteger("lack_personnel_loss_total"));
					lackMaterialLossTotal.add(row.getInteger("lack_material_loss_total") == null ? 0 : row.getInteger("lack_material_loss_total"));
					testReleaseThreePartsLossTotal.add(row.getInteger("test_release_three_parts_loss_total") == null ? 0 : row.getInteger("test_release_three_parts_loss_total"));
					exchgMaterialLossTotal.add(row.getInteger("exchg_material_loss_total") == null ? 0 : row.getInteger("exchg_material_loss_total"));
					unplanTpmLossTotal.add(row.getInteger("unplan_tpm_loss_total") == null ? 0 : row.getInteger("unplan_tpm_loss_total"));
					unplanSampleLossTotal.add(row.getInteger("unplan_sample_loss_total") == null ? 0 : row.getInteger("unplan_sample_loss_total"));
					newOperatorLossTotal.add(row.getInteger("new_operator_loss_total") == null ? 0 : row.getInteger("new_operator_loss_total"));
					othersLossTotal.add(row.getInteger("others_loss_total") == null ? 0 : row.getInteger("others_loss_total"));
					//PerformanceLoss
					performanceLossTotal.add(row.getInteger("performance_loss_total") == null ? 0 : row.getInteger("performance_loss_total"));
					undefinedLossTotal.add(row.getInteger("undefined_loss_total") == null ? 0 : row.getInteger("undefined_loss_total"));
					break;
				}
			}
			if (!isFound){
				//QualityLoss
				scrapLossTotal.add(0);
				reworkmentLossTotal.add(0);
				//TechnicalLoss
				breakdownLossTotal.add(0);
				adjustmentLossTotal.add(0);
				//ChangeoverLoss
				planSetupLossTotal.add(0);
				unplanSetupLossTotal.add(0);
				exchgToolLossTotal.add(0);
				//OrgnizationLoss
				lackPersonnelLossTotal.add(0);
				lackMaterialLossTotal.add(0);
				testReleaseThreePartsLossTotal.add(0);
				exchgMaterialLossTotal.add(0);
				unplanTpmLossTotal.add(0);
				unplanSampleLossTotal.add(0);
				newOperatorLossTotal.add(0);
				othersLossTotal.add(0);
				//PerformanceLoss
				performanceLossTotal.add(0);
				undefinedLossTotal.add(0);
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("monthList", months);
		//QualityLoss
		json.put("scrap_loss_total", scrapLossTotal);
		json.put("rework_loss_total", reworkmentLossTotal);
		//TechnicalLoss
		json.put("breakdown_loss_total", breakdownLossTotal);
		json.put("adjustment_loss_total", adjustmentLossTotal);
		//ChangeoverLoss
		json.put("plan_setup_loss_total", planSetupLossTotal);
		json.put("unplan_setup_loss_total", unplanSetupLossTotal);
		json.put("exchg_tool_loss_total", exchgToolLossTotal);
		//OrgnizationLoss
		json.put("lack_personnel_loss_total", lackPersonnelLossTotal);
		json.put("lack_material_loss_total", lackMaterialLossTotal);
		json.put("test_release_three_parts_loss_total", testReleaseThreePartsLossTotal);
		json.put("exchg_material_loss_total", exchgMaterialLossTotal);
		json.put("unplan_tpm_loss_total", unplanTpmLossTotal);
		json.put("unplan_sample_loss_total", unplanSampleLossTotal);
		json.put("new_operator_loss_total", newOperatorLossTotal);
		json.put("others_loss_total", othersLossTotal);
		//PerformanceLoss
		json.put("performance_loss_total", performanceLossTotal);
		json.put("undefined_loss_total", undefinedLossTotal);
		return ok(json.toJSONString());
	}
}
