package controllers.settings;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import models.settings.User;
import models.settings.UserRole;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.avaje.ebean.SqlRow;
import com.fasterxml.jackson.databind.JsonNode;

import common.util.Md5Utils;
import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class UserController extends Controller {

	/**
	 * 返回激活的用户列表
	 * @return
	 */
	public static Result getList() {
		List<User> users = User.getList();
		if(users != null && users.size() > 0){
			for(User r:users){
				r.password = "*********";
			}
		}
		String str = JSON.toJSONString(users,SerializerFeature.DisableCircularReferenceDetect);
		return ok(str);
	}
	
	/**
	 * 返回带有用户角色的列表
	 * @return
	 */
	public static Result getListWithUserRoles(){		
		List<User> users = User.getList();
		if(users != null && users.size() > 0){
			for(User r:users){
				r.userRoles = UserRole.getListByUserId(r.id);
			}
		}
		String str = JSON.toJSONString(users);
		return ok(str);
	}
	
	/**
	 * 根据用户ID获取角色
	 * @param userId
	 * @return
	 */
	public static Result getUserRolesByUserId(String userId){
		List<UserRole> li = UserRole.getListByUserId(userId);
		String str = JSON.toJSONString(li);
		return ok(str);
	}
	
	/**
	 * 根据用户ID获取拥有的功能权限
	 * @param userId
	 * @return
	 */
	public static Result getUserRoleFuncsByUserId(String userId){
		List<SqlRow> li =User.getUserFuncsByUserId(userId);
		String str = JSON.toJSONString(li);
		return ok(str);
	}

    /**
     * 保存users
     * @return
	 */
	@Transactional
	public static Result saveUser() {
		JsonNode in = request().body().asJson();
		JsonNode addUsers = in.get("addUsers");
		ArrayList<User> addLi = new ArrayList<User>();
		Iterator<JsonNode> a = addUsers.iterator();
		while (a.hasNext()) {
			JsonNode node = a.next();
			User user = new User();
			user.userName = node.get("userName").asText();
			user.password = Md5Utils.MD5(node.get("password").asText());
			user.lineId = node.get("lineId").asText();
			user.active = true;
			addLi.add(user);
		}

		if (addLi.size() > 0) {
			User.saveList(addLi);
		}

		JsonNode updateUsers = in.get("updateUsers");
		ArrayList<User> updateLi = new ArrayList<User>();
		Iterator<JsonNode> b = updateUsers.iterator();
		while (b.hasNext()) {
			JsonNode node = b.next();
			String id = node.get("id").asText();
			User user = User.find(id);			
			user.userName = node.get("userName").asText();
			//user.password = node.get("password").asText();
			user.lineId = node.get("lineId").asText();
			user.active = true;
			updateLi.add(user);
		}
		
		if (updateLi.size() > 0) {
			User.updateList(updateLi);
		}

		return ok("{\"add\":\""+addLi.size()+"\",\"update\":\""+updateLi.size()+"\"}");
	}
	
	/**
	 * 删除
	 * @return
	 */
	@Transactional
	public static Result deleteUser(){
		JsonNode in = request().body().asJson();
		JsonNode deletedUser = in.get("deletedUser");
		ArrayList<User> deletedUserLi = new ArrayList<User>();
		Iterator<JsonNode> b = deletedUser.iterator();
		while(b.hasNext()){
			 JsonNode node = b.next();
			 String id = node.get("id").asText();
			 User user = User.find(id);
			 user.active = false;
			 deletedUserLi.add(user);
		}
		
		if(deletedUserLi.size() > 0){
			User.updateList(deletedUserLi);
		}
		return ok("{\"delete\":\""+deletedUserLi.size()+"\"}");
	}
	
	/**
	    * 保存userroles
	    * @return
	 */
	@Transactional
	public static Result saveUserRole() {
		JsonNode in = request().body().asJson();
		String userId = in.get("userId").asText();
		JsonNode addUserRoles = in.get("addUserRoles");
		ArrayList<UserRole> addLi = new ArrayList<UserRole>();
		Iterator<JsonNode> a = addUserRoles.iterator();
		while (a.hasNext()) {
			JsonNode node = a.next();
			UserRole userRole = new UserRole();
			userRole.userId = userId;
			userRole.roleId = node.get("id").asText();
			addLi.add(userRole);
		}

		if (addLi.size() > 0) {
			UserRole.saveList(addLi);
		}

		JsonNode deletedUserRoles = in.get("deletedUserRoles");
		ArrayList<UserRole> deleteLi = new ArrayList<UserRole>();
		Iterator<JsonNode> b = deletedUserRoles.iterator();
		while (b.hasNext()) {
			JsonNode node = b.next();
			String id = node.get("user_role_id").asText();
			UserRole userRole = UserRole.find(id);
			deleteLi.add(userRole);
		}
		
		if (deleteLi.size() > 0) {
			UserRole.deleteList(deleteLi);
		}

		return ok("{\"add\":\""+addLi.size()+"\",\"delete\":\""+deleteLi.size()+"\"}");
	}
	
	/**
	 * 密码修改
	 * @return
	 */
	@Transactional
	public static Result pwdChange(){
		JsonNode in = request().body().asJson();
		String userId = in.get("userId").asText();
		String newPwd = in.get("newPwd").asText();
		User user = User.find(userId);
		user.password = Md5Utils.MD5(newPwd);
		User.save(user);
		return ok("saved");
	}
	
	
}
