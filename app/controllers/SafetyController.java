package controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.fasterxml.jackson.databind.JsonNode;

import models.ProductLine;
import models.Safety;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class SafetyController extends Controller {
	
	private static Log logger = LogFactory.getLog(SafetyController.class);
	
	public static Result getSafetyInfo(String lineName, String currYear, String currMonth){
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date startDate = df.parse(currYear + "-" + currMonth + "-01");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(startDate);
			int lastDay = calendar.getMaximum(Calendar.DAY_OF_MONTH);
			Date endDate = df.parse(currYear + "-" + currMonth + "-" + lastDay);
			List<Safety> safeties = Safety.getSafetiesByLineAndDate(lineName, startDate, endDate);
//			Map<String, Safety> results = new HashMap<String, Safety>();
//			for(Safety s : safeties){
//				
//			}
			return ok(Json.toJson(safeties));
		} catch (ParseException e) {
			
			logger.error(" " + e);;
			return ok("");
		}
	}
	
	public static Result saveSafetyInfo(){
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			
			List<Safety> existed = new ArrayList<Safety>();
			List<Safety> newAdded = new ArrayList<Safety>();
			
			JsonNode data = request().body().asJson();
			logger.info("data = " + data);
			JsonNode safetyObj = data.path("safetyObj");
			String lineId = safetyObj.get("lineId").asText();
			//get product line
			ProductLine line = ProductLine.findById(lineId);
			
			String currentYear = safetyObj.get("currYear").asText();
			String currentMonth = safetyObj.get("currMonth").asText();
			
			
			JsonNode days = safetyObj.path("days");
			//set each safety values by day
			int nodeCount = days.size();
			for (int i = 0; i < nodeCount; i ++){
				boolean isUpdated = days.get(i).get("updated").asText().equals("1") ? true : false;
				String day = days.get(i).get("d").asText();
				String id = days.get(i).get("id").asText();
				String actualSafety = days.get(i).get("v1").asText();
				String targetSafety = days.get(i).get("v2").asText();
				//check if it's updated item or not
				if (isUpdated){
					Safety s = new Safety();
					s.productLine = line;
					s.safetyActualCount = actualSafety.isEmpty() ? 0 : Integer.parseInt(actualSafety);
					s.safetyTargetCount = targetSafety.isEmpty() ? 0 : Integer.parseInt(targetSafety);
					s.safetyDate = df.parse(currentYear + "-" + currentMonth + "-" + day);
					if (id.equals("0"))
						newAdded.add(s);
					else{
						s.id = id;
						existed.add(s);
					}
				}
			}
			
			//save to DB
			if (newAdded.size() > 0){
				Safety.saveList(newAdded);
			}
			if (existed.size() > 0){
				Safety.updateList(existed);
			}
			
		} catch (Exception e) {
			logger.error(" " + e);
			return ok("0");
		}
		return ok("1");
	}

}
