package controllers.opl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import models.Opl;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class OplController extends Controller {
	
	private static Log logger = LogFactory.getLog(OplController.class);
	
	public static Result initOplData(String lineName , String selectedYear, String selectedMonth) throws ParseException{
		logger.info("line Name = " + lineName + ", selected Year = " + selectedYear + ", selectedMonth = " + selectedMonth);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		
		Date oplStartDate = df.parse(selectedYear + "-" + selectedMonth + "-1");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oplStartDate);
		int days = calendar.getActualMaximum(Calendar.DATE);
		Date oplEndDate = df.parse(selectedYear + "-" + selectedMonth + "-" + days);
		List<Opl> oplList = Opl.findByParams(lineName, oplStartDate, oplEndDate);
		logger.info("size = " + oplList.size());
		if (null != oplList && oplList.size() > 0)
			return ok(Json.toJson(oplList));
		else
			return ok("0");
	}

}
