package controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

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

}
