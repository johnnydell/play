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
@Table(name = "edb_func")
public class Func extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="module_id",insertable=false,updatable=false)
	public Module module;
	
	@Column(name = "module_id")
	public String moduleId;
	
	@Column(name = "func_key")
	public String funcKey;
	
	@Column(name = "func_name")
	public String funcName;
	
	@Column(name = "active")
	public String active;	
		
	public static Finder<String,Func> find = new Finder<String,Func>(String.class, Func.class);
	
	public static List<Func> getList() {
	    return find.where().eq("active", true).findList();
	}
	
	public static List<Func> getListByModuleId(String moduleId){
		return find.where().eq("moduleId", moduleId).findList();
	}
	
	public static List<Func> getListByModuleKey(String moduleKey){
		return find.where().eq("module.moduleKey", moduleKey).findList();
	}
	
	public static Func find(String id){
		return Ebean.find(Func.class, id);
	}
	
	public static void save(Func func){
    	Ebean.save(func);
    }
    
    public static void saveList(List<Func> funcs){
    	Ebean.save(funcs);
    }
    
    public static void update(Func func){
    	Ebean.update(func);
    }
    
    public static void updateList(List<Func> funcs){
    	if(funcs != null && funcs.size() > 0){
    		for(int i = 0;i<funcs.size(); i++){
    			Ebean.update(funcs.get(i));
    		}
    	}
    }
	

}
