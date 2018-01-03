package models.settings;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_user_role")
public class UserRole extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="user_id",insertable=false,updatable=false)
	public User user;
	
	@Column(name = "user_id")
	public String userId;
	
	@ManyToOne
	@JoinColumn(name="role_id",insertable=false,updatable=false)
	public Role role;
	
	@Column(name = "role_id")
	public String roleId;
		
	public static Finder<String,UserRole> find = new Finder<String,UserRole>(String.class, UserRole.class);
	
	public static List<UserRole> getList() {
	    return find.all();
	}
	
	public static List<UserRole> getListByUserId(String userId){
		return find.fetch("role").where().eq("user_id", userId).findList();
	}
	
	public static UserRole find(String id){
		return Ebean.find(UserRole.class, id);
	}
	
	public static void save(UserRole userRole){
    	Ebean.save(userRole);
    }
    
    public static void saveList(List<UserRole> userRoles){
    	Ebean.save(userRoles);
    }
    
    public static void update(UserRole userRole){
    	Ebean.update(userRole);
    }
    
    public static void updateList(List<UserRole> userRoles){
    	if(userRoles != null && userRoles.size() > 0){
    		for(int i = 0;i<userRoles.size(); i++){
    			Ebean.update(userRoles.get(i));
    		}
    	}
    }
    
    public static void deleteList(List<UserRole> userRoles){
    	Ebean.delete(userRoles);
    }
	

}
