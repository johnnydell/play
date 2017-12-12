package controllers.settings;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import models.settings.Func;
import models.settings.Role;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;

import play.mvc.Controller;
import play.mvc.Result;

public class RoleController extends Controller {
 
   public static Result getList() {
        List<Role> roles = Role.getList();
        String str = JSON.toJSONString(roles);
        return ok(str);
    }
   
   public static Result saveRole(){
	   JsonNode in = request().body().asJson();
	   JsonNode addRoles = in.get("addRoles");
	   ArrayList<Func> addLi = new ArrayList<Func>();
	   ArrayList<Func> updateLi = new ArrayList<Func>();
	   Iterator<JsonNode> a = in.iterator();
	   while(a.hasNext()){
		   JsonNode node = a.next();
		   Func func = new Func();
		   String id = node.get("id").asText();
		   String updated = node.get("updated").asText();
		   
		   func.active = node.get("active").asText();
		   func.funcKey = node.get("funcKey").asText();
		   func.funcName = node.get("funcName").asText();
		   func.moduleName = node.get("moduleName").asText();
		   if(id.equals("0")){
			   addLi.add(func);
		   } else {
			   if(updated.equals("1")){
				   func.id = node.get("id").asText();  
				   updateLi.add(func);  
			   }
		   }
	   }
	   System.out.println(addLi.size()+":"+updateLi.size());
	   Func.saveList(addLi);
	   Func.updateList(updateLi);
	   return ok("{'add':'"+addLi.size()+"','update':'"+updateLi.size()+"'}");
   }
}
