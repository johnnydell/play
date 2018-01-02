package models;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_sys_param")
public class SystemParam extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@JoinColumn(name = "module_name")
	public String moduleName;
	
	@Column(name = "param_name")
	public String paramName;

	@Column(name = "param_value")
	public String paramValue;
	
	@Column(name = "param_desc")
	public String paramDesc;
	

	@Column(name = "active")
	public Boolean active;

	public static Finder<String, SystemParam> find = new Finder<String, SystemParam>(String.class, SystemParam.class);

	public static SystemParam findByName(String name) {
		return find.where().ilike("moduleName", "%" + name + "%").orderBy("").findUnique();
	}
	
	public static List<SystemParam> findAll() {
		return find.all();
	}
	
	public static List<SystemParam> findAllWithActive() {
		return find.where().eq("active", "1").findList();
	}
	
	public static SystemParam findById(String id){
		return find.where().eq("id", id).findUnique();
	}

	public static void save(SystemParam systemParam) {
		Ebean.save(systemParam);
	}
	
	public static void saveList(List<SystemParam> lists){
		Ebean.save(lists);
	}
	
	public static void updateList(List<SystemParam> lists){
		for(SystemParam param : lists){
			Ebean.update(param);
		}
	}

}