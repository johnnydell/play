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
@Table(name = "edb_role_func")
public class RoleFunc extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="role_id",insertable=false,updatable=false)
	public Role role;
	
	@Column(name = "role_id")
	public String roleId;
	
	@ManyToOne
	@JoinColumn(name="func_id",insertable=false,updatable=false)
	public Func func;
	
	@Column(name = "func_id")
	public String funcId;
		
	public static Finder<String,RoleFunc> find = new Finder<String,RoleFunc>(String.class, RoleFunc.class);
	
	public static List<RoleFunc> getList() {
	    return find.all();
	}
	
	public static List<RoleFunc> getListByRoleId(String roleId){
		return find.fetch("func").where().eq("role_id", roleId).findList();
	}
	
	public static RoleFunc find(String id){
		return Ebean.find(RoleFunc.class, id);
	}
	
	public static void save(RoleFunc roleFunc){
    	Ebean.save(roleFunc);
    }
    
    public static void saveList(List<RoleFunc> roleFuncs){
    	Ebean.save(roleFuncs);
    }
    
    public static void update(RoleFunc roleFunc){
    	Ebean.update(roleFunc);
    }
    
    public static void updateList(List<RoleFunc> roleFunc){
    	if(roleFunc != null && roleFunc.size() > 0){
    		for(int i = 0;i<roleFunc.size(); i++){
    			Ebean.update(roleFunc.get(i));
    		}
    	}
    }
    
    public static void deleteList(List<RoleFunc> roleFuncs){
    	Ebean.delete(roleFuncs);
    }
	

}
