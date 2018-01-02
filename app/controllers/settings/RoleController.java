package controllers.settings;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import models.settings.Role;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;

import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class RoleController extends Controller {

	/**
	 * 返回激活的角色列表
	 * @return
	 */
	public static Result getList() {
		List<Role> roles = Role.getList();
		String str = JSON.toJSONString(roles);
		return ok(str);
	}

	 /**
	    * 保存roles
	    * @return
	 */
	@Transactional
	public static Result saveRole() {
		JsonNode in = request().body().asJson();
		JsonNode addRoles = in.get("addRoles");
		ArrayList<Role> addLi = new ArrayList<Role>();
		Iterator<JsonNode> a = addRoles.iterator();
		while (a.hasNext()) {
			JsonNode node = a.next();
			Role role = new Role();
			role.roleName = node.get("roleName").asText();
			role.roleDesc = node.get("roleDesc").asText();
			role.active = "1";
			addLi.add(role);
		}

		if (addLi.size() > 0) {
			Role.saveList(addLi);
		}

		JsonNode updateRoles = in.get("updateRoles");
		ArrayList<Role> updateLi = new ArrayList<Role>();
		Iterator<JsonNode> b = updateRoles.iterator();
		while (b.hasNext()) {
			JsonNode node = b.next();
			String id = node.get("id").asText();
			Role role = Role.find(id);			
			role.roleName = node.get("roleName").asText();
			role.roleDesc = node.get("roleDesc").asText();
			updateLi.add(role);
		}
		
		if (updateLi.size() > 0) {
			Role.updateList(updateLi);
		}

		return ok("{\"add\":\""+addLi.size()+"\",\"update\":\""+updateLi.size()+"\"}");
	}
	
	/**
	 * 删除
	 * @return
	 */
	@Transactional
	public static Result deleteRole(){
		JsonNode in = request().body().asJson();
		JsonNode deletedRole = in.get("deletedRole");
		ArrayList<Role> deletedRoleLi = new ArrayList<Role>();
		Iterator<JsonNode> b = deletedRole.iterator();
		while(b.hasNext()){
			 JsonNode node = b.next();
			 String id = node.get("id").asText();
			 Role role = Role.find(id);
			 role.active = "0";
			 deletedRoleLi.add(role);
		}
		
		if(deletedRoleLi.size() > 0){
			Role.updateList(deletedRoleLi);
		}
		return ok("{\"delete\":\""+deletedRoleLi.size()+"\"}");
	}
	
	
}
