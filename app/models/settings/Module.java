package models.settings;

import java.util.List;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import play.db.ebean.Model;

@Entity
@Table(name = "edb_module")
public class Module extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@Column(name = "module_name")
	public String moduleName;
	
	@Column(name = "module_key")
	public String moduleKey;
		
	public static Finder<String,Module> find = new Finder<String,Module>(String.class, Module.class);
	
	public static List<Module> getList() {
	    return find.all();
	}
}
