package controllers.settings;

import java.util.List;

import models.ProductLine;
import com.alibaba.fastjson.JSON;
import play.mvc.Controller;
import play.mvc.Result;

public class ProductLineController extends Controller {
 
	/**
	 * 获得所有有效的LINES
	 * @return
	 */
	public static Result getActiveList(){
		List<ProductLine> li = ProductLine.getActiveList();		
		String lineStr = JSON.toJSONString(li);		
		return ok(lineStr);
	}
}
