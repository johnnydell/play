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

	public static User findByUserNameAndPassword(String name, String password)  {		
		return find.where().eq("userName", name).eq("password", password).orderBy("").fetch("productLine").fetch("department").findUnique();
	}

	public static List<User> getList() {
        return find.where().eq("active", true).orderBy("").fetch("productLine").findList();
	}
	
	public static List<User> getAllList() {
	    return find.findList();
	}	
	
	public static User find(String id){
		return Ebean.find(User.class, id);
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
}