package controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import com.alibaba.fastjson.JSON;

import models.Complain;
import models.ComplainType;
import models.ProductLine;
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
			ProductLine line = ProductLine.findById(line_id);
			if(line != null){
				complain.productLine = line;
				complain.lineId = line.id;
			}
		}
   	 	return ok(JSON.toJSONString(complain));
    }
}
