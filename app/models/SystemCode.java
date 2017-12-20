package models;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_sys_code")
public class SystemCode extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@Column(name = "module_name")
	public String moduleName;

	@Column(name = "code_name")
	public String codeName;
	
	@Column(name = "code_desc")
	public String codeDesc;
	

	@Column(name = "active")
	public Boolean active;

	public static Finder<String, SystemCode> find = new Finder<String, SystemCode>(String.class, SystemCode.class);

	public static SystemCode findByName(String name) {
		return find.where().ilike("moduleName", "%" + name + "%").findUnique();
	}
	
	public static SystemCode findById(String id){
		return find.where().eq("id", id).findUnique();
	}

	public static void save(SystemCode systemCode) {
		Ebean.save(systemCode);
	}

}