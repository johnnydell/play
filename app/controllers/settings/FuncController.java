package controllers.settings;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import models.settings.Func;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.databind.JsonNode;

import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class FuncController extends Controller {
 
    public static Result getList() {
        List<Func> funcs = Func.getList();
        String str = JSON.toJSONString(funcs,SerializerFeature.DisableCircularReferenceDetect);
        return ok(str);
    }
    
    /**
     * 根据模块ID获取所有权限
     * @param moduleId
     * @return
     */
    public static Result getListByModuleId(String moduleId){
    	List<Func> funcs = Func.getListByModuleId(moduleId);
    	String str = JSON.toJSONString(funcs,SerializerFeature.DisableCircularReferenceDetect);
        return ok(str);
    }
    
    /**
     * 根据模块ID获取所有权限
     * @param moduleId
     * @return
     */
    public static Result getListByModuleKey(String moduleKey){
    	List<Func> funcs = Func.getListByModuleKey(moduleKey);
    	String str = JSON.toJSONString(funcs,SerializerFeature.DisableCircularReferenceDetect);
        return ok(str);
    }
   
    /**
	    * 保存roles
	    * @return
	 */
	@Transactional
	public static Result saveFunc() {
		JsonNode in = request().body().asJson();
		JsonNode addFuncs = in.get("addFuncs");
		ArrayList<Func> addLi = new ArrayList<Func>();
		Iterator<JsonNode> a = addFuncs.iterator();
		while (a.hasNext()) {
			JsonNode node = a.next();
			Func func = new Func();
			func.moduleId = node.get("moduleId").asText();
			func.funcKey = node.get("funcKey").asText();
			func.funcName = node.get("funcName").asText();
			func.active = "1";
			addLi.add(func);
		}
	
		if (addLi.size() > 0) {
			Func.saveList(addLi);
		}
	
		JsonNode updateFuncs = in.get("updateFuncs");
		ArrayList<Func> updateLi = new ArrayList<Func>();
		Iterator<JsonNode> b = updateFuncs.iterator();
		while (b.hasNext()) {
			JsonNode node = b.next();
			String id = node.get("id").asText();
			Func func = Func.find(id);			
			func.moduleId = node.get("moduleId").asText();
			func.funcKey = node.get("funcKey").asText();
			func.funcName = node.get("funcName").asText();
			updateLi.add(func);
		}
		
		if (updateLi.size() > 0) {
			Func.updateList(updateLi);
		}
	
		return ok("{\"add\":\""+addLi.size()+"\",\"update\":\""+updateLi.size()+"\"}");
	}
	
	/**
	 * 删除
	 * @return
	 */
	@Transactional
	public static Result deleteFunc(){
		JsonNode in = request().body().asJson();
		JsonNode deletedFunc = in.get("deletedFunc");
		ArrayList<Func> deletedFuncLi = new ArrayList<Func>();
		Iterator<JsonNode> b = deletedFunc.iterator();
		while(b.hasNext()){
			 JsonNode node = b.next();
			 String id = node.get("id").asText();
			 Func func = Func.find(id);
			 func.active = "0";
			 deletedFuncLi.add(func);
		}
		
		if(deletedFuncLi.size() > 0){
			Func.updateList(deletedFuncLi);
		}
		return ok("{\"delete\":\""+deletedFuncLi.size()+"\"}");
	}
}
