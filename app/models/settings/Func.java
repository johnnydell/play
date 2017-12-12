package models.settings;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_func")
public class Func extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@Column(name = "module_name")
	public String moduleName;
	
	@Column(name = "func_key")
	public String funcKey;
	
	@Column(name = "func_name")
	public String funcName;
	
	@Column(name = "active")
	public String active;	
		
	public static Finder<String,Func> find = new Finder<String,Func>(String.class, Func.class);
	
	public static List<Func> getList() {
	        return find.all();
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
