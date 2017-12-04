package controllers;

import java.text.ParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import models.HourlyCountDetail;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class HourlyCountController extends Controller {

	private final static Logger logger = LoggerFactory.getLogger(HourlyCountController.class);
	
	public static Result viewHourlyCountByLineName(String lineName, String productDate) throws ParseException {
		
		logger.info("try to get hourly count history by lineName[" + lineName + "], productDate[" + productDate + "]");
		
		List<HourlyCountDetail> countDetail = HourlyCountDetail.findByLineName(lineName, productDate);
		
		return ok(Json.toJson(countDetail));
		
		
		
	}
	
	

	

}