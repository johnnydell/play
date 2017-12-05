package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import play.db.ebean.Model;

@Entity
@Table(name = "edb_func")
public class Func extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public Integer id;
	
	@Column(name = "module_name")
	public String moduleName;
	
	@Column(name = "func_key")
	public String funcKey;
	
	@Column(name = "func_name")
	public String funcName;
	
	@Column(name = "active")
	public String active;	
		
	public static Finder<Integer,Func> find = new Finder<Integer,Func>(Integer.class, Func.class);
	
	public static List<Func> getList() {
	        return find.all();
	}
	

}
