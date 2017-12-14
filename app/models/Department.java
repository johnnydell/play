package models;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_department")
public class Department extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	
	@Column(name = "department_name")
	public String departmentName;

	
	
	@Column(name = "active")
	public boolean active;

	public static Finder<String, Department> find = new Finder<String, Department>(String.class, Department.class);

	public static Department findByName(String name)  {
		
		return find.where().eq("departmentName", name).findUnique();
	}

	public static void save(Department base) {
		Ebean.save(base);
	}
	public static void update(Department base) {
		Ebean.update(base);
	}
}