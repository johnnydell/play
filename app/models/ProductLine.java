package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_line")
public class ProductLine extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public Integer id;

	@Column(name = "line_name")
	public String lineName;

	

	@Column(name = "active")
	public Boolean active;

	public static Finder<Integer, ProductLine> find = new Finder<Integer, ProductLine>(Integer.class, ProductLine.class);

	public static ProductLine findByName(String name) {
		return find.where().ilike("lineName", "%" + name + "%").findUnique();
	}

	public static void save(ProductLine productLine) {
		Ebean.save(productLine);
	}

}