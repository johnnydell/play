package controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import common.Constants;
import play.mvc.*;

public class Application extends Controller {

    public static Result index() {
    	return redirect(Constants.INDEX_PATH);
    }
    
    /**
     * 
     * @return 当前的日期
     */
    public static Result getCurrDate() {   
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
    	 return ok(df.format(new Date()));
    }

}
