package controllers.screen;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import play.mvc.Controller;
import play.mvc.Result;

public class ScreenDisplayController extends Controller {

	private static Log logger = LogFactory.getLog(ScreenDisplayController.class);
	
	public static Result getProductInfo(String lineName,  String yearValue,  String monthValue,  String dayValue, String hourValue){
		logger.info("getProductInfo: lineName = " + lineName);
		return ok("");
	}
	
}
