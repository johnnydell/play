package models.settings;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import models.Department;
import models.ProductLine;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlRow;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_user")
public class User extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="line_id",insertable=false,updatable=false)
	public ProductLine productLine;
	
	@Column(name = "line_id")
	public String lineId;
	
	@ManyToOne
	@JoinColumn(name="department_id")
	public Department department;
	
	@Column(name = "user_name")
	public String userName;

	@Column(name = "password")
	public String password;
	
	@Column(name = "active")
	public boolean active;
	
	public List<UserRole> userRoles; 

	public static Finder<String, User> find = new Finder<String, User>(String.class, User.class);

	public static List<User> getList() {
        return find.where().eq("active", true).orderBy("").fetch("productLine").findList();
	}
	
	public static List<User> getAllList() {
	    return find.findList();
	}	
	
	public static User find(String id){
		return Ebean.find(User.class, id);
	}
	
	public static User findByNamePwd(String userName,String pwd){
		return find.where().eq("userName", userName).eq("password",pwd).findUnique();
	}
		
	public static void save(User user){
		Ebean.save(user);
	}
	
	public static void saveList(List<User> users){
		Ebean.save(users);
	}
	
	public static void update(User user){
		Ebean.update(user);
	}
	
	public static void updateList(List<User> users){
		if(users != null && users.size() > 0){
			for(int i = 0;i<users.size(); i++){
				Ebean.update(users.get(i));
			}
		}
	}
	
	public static List<SqlRow> getUserFuncsByUserId(String userId)  {
		String sql = "select  func.id,func.func_key,func.func_name,func.module_id,module.module_key "
				+ " from edb_role_func role_func "
				+ " left join edb_func func on role_func.func_id = func.id "
				+ " left join edb_module module on func.module_id = module.id "
				+ " where role_func.role_id in ( "
				+ " select user_role.role_id " 
				+ " from edb_user_role user_role "
				+ " where user_role.user_id = :userId "
				+ " )";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("userId", userId).findList();
		return rows;
	}
}