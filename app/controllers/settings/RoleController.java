package controllers.settings;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import models.settings.Role;
import models.settings.RoleFunc;

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
	 * 返回带有角色功能的列表
	 * @return
	 */
	public static Result getListWithRoleFuncs(){		
		List<Role> roles = Role.getList();
		if(roles != null && roles.size() > 0){
			for(Role r:roles){
				r.roleFuncs = RoleFunc.getListByRoleId(r.id);
			}
		}
		String str = JSON.toJSONString(roles);
		return ok(str);
	}
	
	/**
	 * 根据角色ID获取功能点
	 * @param roleId
	 * @return
	 */
	public static Result getRoleFuncsByRoleId(String roleId){
		List<RoleFunc> li = RoleFunc.getListByRoleId(roleId);
		String str = JSON.toJSONString(li);
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
	
	/**
	    * 保存rolesfunc
	    * @return
	 */
	@Transactional
	public static Result saveRoleFunc() {
		JsonNode in = request().body().asJson();
		String roleId = in.get("roleId").asText();
		JsonNode addRoleFuncs = in.get("addRoleFuncs");
		ArrayList<RoleFunc> addLi = new ArrayList<RoleFunc>();
		Iterator<JsonNode> a = addRoleFuncs.iterator();
		while (a.hasNext()) {
			JsonNode node = a.next();
			RoleFunc roleFunc = new RoleFunc();
			roleFunc.roleId = roleId;
			roleFunc.funcId = node.get("id").asText();
			addLi.add(roleFunc);
		}

		if (addLi.size() > 0) {
			RoleFunc.saveList(addLi);
		}

		JsonNode deletedRoleFuncs = in.get("deletedRoleFuncs");
		ArrayList<RoleFunc> deleteLi = new ArrayList<RoleFunc>();
		Iterator<JsonNode> b = deletedRoleFuncs.iterator();
		while (b.hasNext()) {
			JsonNode node = b.next();
			String id = node.get("role_func_id").asText();
			RoleFunc roleFunc = RoleFunc.find(id);
			deleteLi.add(roleFunc);
		}
		
		if (deleteLi.size() > 0) {
			RoleFunc.deleteList(deleteLi);
		}

		return ok("{\"add\":\""+addLi.size()+"\",\"delete\":\""+deleteLi.size()+"\"}");
	}
	
	
}
