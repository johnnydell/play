package controllers.settings;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import models.ProductLine;
import models.ProductType;
import models.settings.HCConfigBase;
import models.settings.HCConfigDetail;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;

import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class HCConfigController extends Controller {
	
	@SuppressWarnings("static-access")
	public static Result getHCInfo(String line_id,String curr_date) throws ParseException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
		Calendar calendar = new GregorianCalendar();
    	calendar.setTime(df.parse(curr_date));
    	calendar.add(calendar.DATE,1);//整数往后推,负数往前移动
    	String next_date = df.format(calendar.getTime());    	
		
		ProductLine line = ProductLine.findById(line_id);
		HCConfigBase base1 = HCConfigBase.getHCConfigBaseByParams(line_id, curr_date);
		if(base1 != null){
			List<HCConfigDetail> detail = HCConfigDetail.getHCConfigDetailPreByBaseId(base1.id);
			base1.hcConfigDetail = detail;
		}
		
		HCConfigBase base2 = HCConfigBase.getHCConfigBaseByParams(line_id, next_date);
		if(base2 != null){
			List<HCConfigDetail> detail = HCConfigDetail.getHCConfigDetailSufByBaseId(base2.id);
			base2.hcConfigDetail = detail;
		}
		
		String lineStr = JSON.toJSONString(line);
		String base1Str = JSON.toJSONString(base1);
		String base2Str = JSON.toJSONString(base2);
		return ok("{\"line\":"+lineStr+",\"base1\":"+base1Str+",\"base2\":"+base2Str+"}");
	}
	
	/**
	 * 保存HC配置
	 * @return
	 * @throws ParseException 
	 */
	@Transactional
	public static Result saveHCConfig() throws ParseException{
		JsonNode in = request().body().asJson();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
		//保存base1部分
    	JsonNode base1_json = in.get("base1");
    	String base1Id = base1_json.get("id").asText();
    	String line_id = base1_json.get("line_id").asText();
    	String date = base1_json.get("date").asText().trim();
    	String target_oee_percent = base1_json.get("target_oee_percent").asText().trim();
    	String plan_opl_total_output = base1_json.get("plan_opl_total_output").asText().trim();
    	
    	HCConfigBase base1 = new HCConfigBase();
    	if(!base1Id.equals("0")){
    		base1 = HCConfigBase.find(base1Id);
    		base1.targetOeePercent = Double.parseDouble(target_oee_percent);
        	base1.planOplTotalOutput = Integer.parseInt(plan_opl_total_output);
        	HCConfigBase.update(base1);        	
    	} else {
    		base1.productDate = df.parse(date);
    		base1.line_id = line_id;
    		base1.targetOeePercent = Double.parseDouble(target_oee_percent);
        	base1.planOplTotalOutput = Integer.parseInt(plan_opl_total_output);
        	HCConfigBase.save(base1);
    	} 
    	
    	//保存base1明细新增部分
    	JsonNode base1_detail = base1_json.get("details");
    	ArrayList<HCConfigDetail> addBase1DetailsLi = new ArrayList<HCConfigDetail>();
    	ArrayList<HCConfigDetail> updateBase1DetailsLi = new ArrayList<HCConfigDetail>();
		Iterator<JsonNode> a = base1_detail.iterator();
		while(a.hasNext()){
			JsonNode node = a.next();
			String detailId = node.get("id").asText().trim();
			String product_hour = node.get("product_hour").asText().trim();
			String product_type_id_1 = node.get("product_type_id_1").asText().trim();
			String product_type_id_2 = node.get("product_type_id_2").asText().trim();
			Integer product_hour_index = (Integer.parseInt(product_hour) - 7);			
			String plan_count = node.get("plan_count").asText().trim();
			String plan_total_count = node.get("plan_total_count").asText().trim();
			
			HCConfigDetail detail;
			if(StringUtils.isNotBlank(detailId) && !detailId.equals("0")){
				detail = HCConfigDetail.find(detailId);
			} else {
				detail = new HCConfigDetail();
				detail.base_id = base1.id;
			}		
			if(StringUtils.isNotBlank(product_type_id_1)){
				ProductType type = ProductType.find(product_type_id_1);
				detail.product_type_id_1 = product_type_id_1;
				detail.productCycle1 = type.cycle;
				detail.productPersons1 = type.persons;
				detail.targetOeePercent = Float.parseFloat(type.targetOutput);
			} else {
				detail.product_type_id_1 = null;
				detail.productCycle1 = null;
				detail.productPersons1 = null;
			}
			
			if(StringUtils.isNotBlank(product_type_id_2)){
				ProductType type = ProductType.find(product_type_id_2);
				detail.product_type_id_2 = product_type_id_2;
				detail.productCycle2 = type.cycle;
				detail.productPersons2 = type.persons;
				detail.targetOeePercent = Float.parseFloat(type.targetOutput);
			} else {
				detail.product_type_id_2 = null;
				detail.productCycle2 = null;
				detail.productPersons2 = null;
			}
			
			if(StringUtils.isBlank(product_type_id_1) && StringUtils.isBlank(product_type_id_2)){				
				detail.targetOeePercent = 0f;
			}
			
			detail.productHour = Integer.parseInt(product_hour);
			detail.productHourIndex = product_hour_index;
			detail.planCount = Integer.parseInt(plan_count);
			detail.planTotalCount = Integer.parseInt(plan_total_count);		
			if(StringUtils.isNotBlank(detailId) && !detailId.equals("0")){
				updateBase1DetailsLi.add(detail);
			} else {
				addBase1DetailsLi.add(detail);
			}	
			
		}
		
		if(addBase1DetailsLi.size() > 0){
			HCConfigDetail.saveList(addBase1DetailsLi);
		}
		
		if(updateBase1DetailsLi.size() > 0){
			HCConfigDetail.updateList(updateBase1DetailsLi);
		}
		
		//保存base2部分
    	JsonNode base2_json = in.get("base2");
    	String base2Id = base2_json.get("id").asText();
    	HCConfigBase base2 = new HCConfigBase();
    	if(!base2Id.equals("0")){
    		base2 = HCConfigBase.find(base2Id);
    		base2.targetOeePercent = Double.parseDouble(target_oee_percent);
    		base2.planOplTotalOutput = Integer.parseInt(plan_opl_total_output);
        	HCConfigBase.update(base2);        	
    	} else {
    		Calendar calendar = new GregorianCalendar();
        	calendar.setTime(df.parse(date));
        	calendar.add(calendar.DATE,1);//整数往后推,负数往前移动
        	String next_date = df.format(calendar.getTime());   
    		base2.productDate = df.parse(next_date);
    		base2.line_id = line_id;
    		base2.targetOeePercent = Double.parseDouble(target_oee_percent);
    		base2.planOplTotalOutput = Integer.parseInt(plan_opl_total_output);
        	HCConfigBase.save(base2);
    	} 
    	
    	//保存base1明细部分
    	JsonNode base2_detail = base2_json.get("details");
    	ArrayList<HCConfigDetail> addBase2DetailsLi = new ArrayList<HCConfigDetail>();
    	ArrayList<HCConfigDetail> updateBase2DetailsLi = new ArrayList<HCConfigDetail>();
		Iterator<JsonNode> b = base2_detail.iterator();
		while(b.hasNext()){
			JsonNode node = b.next();
			String detailId = node.get("id").asText().trim();
			String product_hour = node.get("product_hour").asText().trim();
			String product_type_id_1 = node.get("product_type_id_1").asText().trim();
			String product_type_id_2 = node.get("product_type_id_2").asText().trim();
			Integer product_hour_index = (Integer.parseInt(product_hour) + 17);			
			String plan_count = node.get("plan_count").asText().trim();
			String plan_total_count = node.get("plan_total_count").asText().trim();
			
			HCConfigDetail detail;
			if(StringUtils.isNotBlank(detailId) && !detailId.equals("0")){
				detail = HCConfigDetail.find(detailId);
			} else {
				detail = new HCConfigDetail();
				detail.base_id = base2.id;
			}		
			if(StringUtils.isNotBlank(product_type_id_1)){
				ProductType type = ProductType.find(product_type_id_1);
				detail.product_type_id_1 = product_type_id_1;
				detail.productCycle1 = type.cycle;
				detail.productPersons1 = type.persons;
				detail.targetOeePercent = Float.parseFloat(type.targetOutput);
			} else {
				detail.product_type_id_1 = null;
				detail.productCycle1 = null;
				detail.productPersons1 = null;
			}	
			
			if(StringUtils.isNotBlank(product_type_id_2)){
				ProductType type = ProductType.find(product_type_id_2);
				detail.product_type_id_2 = product_type_id_2;
				detail.productCycle2 = type.cycle;
				detail.productPersons2 = type.persons;
				detail.targetOeePercent = Float.parseFloat(type.targetOutput);
			} else {
				detail.product_type_id_2 = null;
				detail.productCycle2 = null;
				detail.productPersons2 = null;
			}
			
			if(StringUtils.isBlank(product_type_id_1) && StringUtils.isBlank(product_type_id_2)){
				detail.targetOeePercent = 0f;
			}
			detail.productHour = Integer.parseInt(product_hour);
			detail.productHourIndex = product_hour_index;
			detail.planCount = Integer.parseInt(plan_count);
			detail.planTotalCount = Integer.parseInt(plan_total_count);		
			if(StringUtils.isNotBlank(detailId) && !detailId.equals("0")){
				updateBase2DetailsLi.add(detail);
			} else {
				addBase2DetailsLi.add(detail);
			}	
			
		}
		
		if(addBase2DetailsLi.size() > 0){
			HCConfigDetail.saveList(addBase2DetailsLi);
		}
		
		if(updateBase2DetailsLi.size() > 0){
			HCConfigDetail.updateList(updateBase2DetailsLi);
		}
    	
		return ok("{\"base1_add\":\""+addBase1DetailsLi.size()+"\",\"base1_update\":\""+updateBase1DetailsLi.size()+"\",\"base2_add\":\""+addBase2DetailsLi.size()+"\",\"base2_update\":\""+updateBase2DetailsLi.size()+"\"}");
	}
}
