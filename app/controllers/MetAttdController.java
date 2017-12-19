package controllers;

import com.alibaba.fastjson.JSON;

import models.MetAttd;
import models.ProductLine;
import play.mvc.Controller;
import play.mvc.Result;

public class MetAttdController extends Controller  {
	
	/**
	 * 
	 * @param line_id
	 * @param year
	 * @param month
	 * @return 根据产线ID和年月获得已经存储的记录
	 */
	public static Result getMetAtdanceInfo(String line_id,String year,String month) {		
		MetAttd  attd = MetAttd.getMetAtdanceInfo(line_id, year, month);
		if(attd == null){
			attd = new MetAttd();
			attd.id = "0";
			ProductLine line = ProductLine.findById(line_id);
			if(line != null){
				attd.productLine = line;
				attd.lineId = line.id;
			}
		}
		String str = JSON.toJSONString(attd);
   	 	return ok(str);
    }
}
