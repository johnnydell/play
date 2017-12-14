package models;

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
@Table(name = "edb_user")
public class User extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="line_id")
	public ProductLine productLine;
	
	@ManyToOne
	@JoinColumn(name="department_id")
	public Department department;
	
	@Column(name = "user_name")
	public String userName;

	@Column(name = "password")
	public String password;
	
	@Column(name = "meeting_required")
	public boolean meetingRequired;
	
	@Column(name = "active")
	public boolean active;

	public static Finder<String, User> find = new Finder<String, User>(String.class, User.class);

	public static User findByUserNameAndPassword(String name, String password)  {
		
		return find.where().eq("userName", name).eq("password", password).orderBy("").fetch("productLine").fetch("department").findUnique();
	}

	public static void save(User base) {
		Ebean.save(base);
	}
	public static void update(User base) {
		Ebean.update(base);
	}
}