package controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;

import models.Complain;
import models.ComplainActualDays;
import models.ComplainTargetDays;
import models.ComplainType;
import models.HourlyCountBase;
import models.ProductLine;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class ComplainController extends Controller  {
	
	private final static DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * 获得所有的投诉类型
	 * @return
	 */
	public static Result getComplainType(){
		List<ComplainType> typeLi  = ComplainType.getAllList();
		return ok(JSON.toJSONString(typeLi));
	}
	/**
	 * 
	 * @param line_id
	 * @param year
	 * @param month
	 * @return 根据产线ID和年月获得已经存储的记录
	 */
	public static Result getComplainInfo(String line_id,String year,String month) {		
		Complain  complain = Complain.getComplainInfo(line_id, year, month);
		if(complain ==  null){
			complain = new Complain();
			complain.id = "0";
			complain.lineId = line_id;
			complain.year = year;
			complain.month = month;
			complain.totalTarget = "";
			ProductLine line = ProductLine.findById(line_id);
			if(line != null){
				complain.productLine = line;
				complain.lineId = line.id;
			}
		}
   	 	return ok(JSON.toJSONString(complain));
    }
	
	/**
	 * 取得对应产线当前月份的所有HC OEE的中产出
	 * @param line_id
	 * @param year
	 * @param month
	 * @param daysCnt
	 * @return
	 * @throws ParseException
	 */
	public static Result getCurrentMonthDaysHC(String line_id,String year,String month,int daysCnt) throws ParseException{
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(year + "-" +month +"-01");
		Date endDate = df.parse(year + "-" +month +"-" + daysCnt);
		List<HourlyCountBase> li = HourlyCountBase.findOeeDataByDtScope(line_id, startDate, endDate);
		List<Float> actualCountList = new ArrayList<Float>();
		for(int i = 1; i<= daysCnt;i++){
			String dt = year + "-" + month + "-" + String.format("%02d", i);
			boolean flag = false;
			for (HourlyCountBase base : li){
				String historyDate = df.format(base.productDate);
				if (dt.equals(historyDate)){
					float tempValue;
					if(null == base.actualOeeTotalOutput || base.actualOeeTotalOutput == 0){
						tempValue = 0f;
					} else {
						tempValue = (float)(base.actualOeeTotalOutput);
					}
					actualCountList.add(tempValue);
					flag = true;
					break;
				}
			}
			if (!flag){
				actualCountList.add(0.0f);
			}
		}
		return ok(JSON.toJSONString(actualCountList));
	}
	
	/**
	 * 保存当前投诉信息
	 * @return
	 */
	public static Result saveComplain(){
		JsonNode in = request().body().asJson();
		JsonNode base = in.get("base");
		String id = base.get("id").asText();
		Complain complain = new Complain();
		complain.lineId = base.get("line_id").asText().trim();
		complain.year = base.get("year").asText().trim();
		complain.month = base.get("month").asText().trim();
		complain.totalTarget = base.get("ytarget").asText().trim();
		if(id.equals("0")){
			//封装实际明细
			JsonNode actuals = base.get("actual");
			List<ComplainActualDays> actualLi = new ArrayList<ComplainActualDays>();
			Iterator<JsonNode> a = actuals.iterator();
			while(a.hasNext()){
				JsonNode node = a.next();
				String typeId = node.get("type_id").asText().trim();
				if(!typeId.equals("-1") && !typeId.equals("-2")){
					JsonNode days = node.get("days");
					Iterator<JsonNode> b = days.iterator();
					while(b.hasNext()){
						JsonNode day = b.next();
						ComplainActualDays actualDay = new ComplainActualDays();
						actualDay.complainId = complain.id;
						actualDay.dayKey = day.get("d").asText().trim();
						actualDay.dayVal = day.get("v").asText().trim();
						actualDay.typeId = typeId;
						actualLi.add(actualDay);
					}
				}
			}
			complain.complainActualDays = actualLi;
			
			//封装target
			JsonNode target = base.get("target");
			List<ComplainTargetDays> targetLi = new ArrayList<ComplainTargetDays>();
			Iterator<JsonNode> c = target.iterator();
			while(c.hasNext()){
				JsonNode day = c.next();
				ComplainTargetDays targetDay = new ComplainTargetDays();
				targetDay.complainId = complain.id;
				targetDay.dayKey = day.get("d").asText().trim();
				targetDay.dayVal = day.get("v").asText().trim();
				targetLi.add(targetDay);
			}
			complain.complainTargetDays = targetLi;
			Complain.save(complain);
		} else {
			complain.id = id;
			//封装实际明细
			JsonNode actuals = base.get("actual");
			List<ComplainActualDays> actualLi = new ArrayList<ComplainActualDays>();
			Iterator<JsonNode> a = actuals.iterator();
			while(a.hasNext()){
				JsonNode node = a.next();
				String typeId = node.get("type_id").asText().trim();
				if(!typeId.equals("-1") && !typeId.equals("-2")){
					JsonNode days = node.get("days");
					Iterator<JsonNode> b = days.iterator();
					while(b.hasNext()){
						JsonNode day = b.next();
						ComplainActualDays actualDay = new ComplainActualDays();
						actualDay.id = day.get("id").asText().trim();
						actualDay.complainId = complain.id;
						actualDay.dayKey = day.get("d").asText().trim();
						actualDay.dayVal = day.get("v").asText().trim();
						actualDay.typeId = typeId;
						actualLi.add(actualDay);
					}
				}
			}
			complain.complainActualDays = actualLi;
			
			//封装target
			JsonNode target = base.get("target");
			List<ComplainTargetDays> targetLi = new ArrayList<ComplainTargetDays>();
			Iterator<JsonNode> c = target.iterator();
			while(c.hasNext()){
				JsonNode day = c.next();
				ComplainTargetDays targetDay = new ComplainTargetDays();
				targetDay.id = day.get("id").asText().trim();
				targetDay.complainId = complain.id;
				targetDay.dayKey = day.get("d").asText().trim();
				targetDay.dayVal = day.get("v").asText().trim();
				targetLi.add(targetDay);
			}
			complain.complainTargetDays = targetLi;
			Complain.update(complain);
		}
		return ok("saved");
	}
}
