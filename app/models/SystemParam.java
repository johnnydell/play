package models;

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
@Table(name = "edb_sys_param")
public class SystemParam extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@ManyToOne
	@JoinColumn(name = "code_id")
	public SystemCode systemCode;

	@Column(name = "param_value")
	public String paramValue;
	
	@Column(name = "param_desc")
	public String paramDesc;
	

	@Column(name = "active")
	public Boolean active;

	public static Finder<String, SystemParam> find = new Finder<String, SystemParam>(String.class, SystemParam.class);

	public static SystemParam findByName(String name) {
		return find.where().ilike("systemCode.moduleName", "%" + name + "%").orderBy("").fetch("systemCode").findUnique();
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

}