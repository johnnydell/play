package controllers.settings;

import java.util.List;

import models.settings.Func;
import models.settings.Module;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

import play.mvc.Controller;
import play.mvc.Result;

public class ModuleController extends Controller {
    
    public static Result getList(){
    	List<Module> modules = Module.getList();
    	return ok(play.libs.Json.toJson(modules));
    }
    
    public static Result getListWithFuncs(){
    	List<Module> modules = Module.getList();
    	if(modules != null && modules.size() > 0){
    		for(Module md:modules){
    			md.funcs = Func.getListByModuleId(md.id);
    		}
    	}
    	return ok(play.libs.Json.toJson(modules));
    }
}
