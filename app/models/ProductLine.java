package models;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_line")
public class ProductLine extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@Column(name = "line_name")
	public String lineName;
	
	@Column(name = "active")
	public Boolean active;

	public static Finder<String, ProductLine> find = new Finder<String, ProductLine>(String.class, ProductLine.class);
	
	public static List<ProductLine> getActiveList(){
		return find.where().eq("active", true).findList();
	}
	
	public static ProductLine findByName(String name) {
		return find.where().eq("lineName", name).findUnique();
	}
	
	public static ProductLine findById(String id){
		return find.where().eq("id", id).findUnique();
	}

	public static void save(ProductLine productLine) {
		Ebean.save(productLine);
	}

}