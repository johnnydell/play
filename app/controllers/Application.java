package controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

import common.Constants;
import models.SystemParam;
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
    
    /**
     * @return System Parameters
     */

    @SuppressWarnings("unchecked")
	public static Result getSystemParameters(){
    	//key = module name, value = map
    	Map<String, Object> paramsAll 	= new HashMap<String, Object>();
    	//key = code name, value = param_List
    	Map<String, List<String>> paramsSub 				= null;
    	List<String> paramValues 							= null;
    	
    	//get all of activated parameters
    	List<SystemParam> listParams 						= SystemParam.findAllWithActive();
    	
    	for(SystemParam param : listParams){
    		String paramValue 	= param.paramValue;
    		String moduleName 	= param.systemCode.moduleName;
    		String codeName 	= param.systemCode.codeName;
    		
    		if (paramsAll.containsKey(moduleName)){
    			//same module
    			if (((Map<String, List<String>>)paramsAll.get(moduleName)).containsKey(codeName)){
    				//same code
    				if (((Map<String, List<String>>) paramsAll.get(moduleName)).get(codeName).contains(paramValue)){
    					//same param value, skip
    					continue;
    				}
    				else{
    					//different value
    					((Map<String, List<String>>)paramsAll.get(moduleName)).get(codeName).add(paramValue);
    				}
    			}
    			else{
    				//different code
    				paramsSub 		= new HashMap<String, List<String>>();
        			paramValues		= new ArrayList<String>();
        			paramValues.add(paramValue);
        			paramsSub.put(codeName, paramValues);
        			paramsAll.put(moduleName, paramsSub);
    			}
    			
    		}
    		else{
    			//different module
    			paramsSub 		= new HashMap<String, List<String>>();
    			paramValues		= new ArrayList<String>();
    			paramValues.add(paramValue);
    			paramsSub.put(codeName, paramValues);
    			paramsAll.put(moduleName, paramsSub);
    		}
    	}
    	
    	JSONObject o = new JSONObject(paramsAll);
    	return ok(o.toString());
    }
    
    
}
