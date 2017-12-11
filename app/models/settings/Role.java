package models.settings;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_role")
public class Role extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public Integer id;
	
	@Column(name = "role_name")
	public String roleName;
	
	@Column(name = "role_desc")
	public String roleDesc;
	
	@Column(name = "active")
	public String active;	
		
	public static Finder<Integer,Role> find = new Finder<Integer,Role>(Integer.class, Role.class);
	
	public static List<Role> getList() {
	        return find.all();
	}
	
	public static void save(Role role){
    	Ebean.save(role);
    }
    
    public static void saveList(List<Role> roles){
    	Ebean.save(roles);
    }
    
    public static void update(Role role){
    	Ebean.update(role);
    }
    
    public static void updateList(List<Role> roles){
    	if(roles != null && roles.size() > 0){
    		for(int i = 0;i<roles.size(); i++){
    			Ebean.update(roles.get(i));
    		}
    	}
    }
	

}
