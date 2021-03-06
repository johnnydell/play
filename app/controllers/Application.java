package controllers;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.Constants;
import models.SystemParam;
import models.UploadFile;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {

    public static Result index() {
    	return redirect(Constants.INDEX_PATH);
    }
    
    public static Result getCurrDate() {   
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
    	 return ok(df.format(new Date()));
    }
    
    public static Result getCurrTime() {   
    	SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");//设置日期格式
    	 return ok(df.format(new Date()));
    }
    
    public static Result getCurrDateTime() {   
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
    	 return ok(df.format(new Date()));
    }
    
    /**
     * 
     * @return 明日的日期
     */
    @SuppressWarnings("static-access")
	public static Result getDateByOffset(String offset) {   
    	Date date=new Date();//取时间
    	Calendar calendar = new GregorianCalendar();
    	calendar.setTime(date);
    	calendar.add(calendar.DATE,Integer.parseInt(offset));//整数往后推,负数往前移动
    	date=calendar.getTime();	
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
    	return ok(df.format(date));
    }
    
    /**
     * @return System Parameters
     */

	public static Result getSystemParameters(){
    	//key = module name, value = map
    	Map<String, Map<String, SystemParam>> paramsAll 	= new HashMap<String, Map<String, SystemParam>>();
    	//key = code name, value = param_List
    	Map<String, SystemParam> paramsSub 	= null;
    	
    	//get all of activated parameters
    	List<SystemParam> listParams 	= SystemParam.findAllWithActive();
    	
    	for(SystemParam param : listParams){
    		String moduleName 	= param.moduleName;
    		String paramName 	= param.paramName;
    		if (paramsAll.containsKey(moduleName)){
    			//same module
    			if (((Map<String, SystemParam>)paramsAll.get(moduleName)).containsKey(paramName)){
    				continue;
    			}
    			else{
    				
    				paramsAll.get(moduleName).put(paramName, param);
    			}
    			
    		}
    		else{
    			//different module
    			paramsSub 		= new HashMap<String, SystemParam>();
    			
    			paramsSub.put(paramName, param);
    			paramsAll.put(moduleName, paramsSub);
    		}
    	}
    	
    	
    	return ok(Json.toJson(paramsAll));
    }
	
	
	public static Result getUploadList(){
		List<UploadFile> lists = UploadFile.findAll();
		return ok(Json.toJson(lists));
	}
    
}
