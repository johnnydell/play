package controllers.settings;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import models.ProductLine;
import models.settings.HCConfigBase;
import models.settings.HCConfigDetail;

import com.alibaba.fastjson.JSON;

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
}
