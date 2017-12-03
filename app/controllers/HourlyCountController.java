package controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import models.HourlyCountDetail;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class HourlyCountController extends Controller {

	private final static Logger logger = LoggerFactory.getLogger(HourlyCountController.class);
	
	public static Result viewHourlyCountByLineName(String lineName) {
		
		
		List<HourlyCountDetail> countDetail = HourlyCountDetail.findByLineName(lineName);
		
		return ok(Json.toJson(countDetail));
		
		
		
	}
	
	

	

}