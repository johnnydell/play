package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_product_type")
public class ProductType extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public Integer id;

	@Column(name = "product_type_name")
	public String productTypeName;

	

	@Column(name = "active")
	public Boolean active;

	public static Finder<Integer, ProductType> find = new Finder<Integer, ProductType>(Integer.class, ProductType.class);

	public static ProductType findByName(String name) {
		return find.where().eq("productTypeName", name).findUnique();
	}
	
	public static List<ProductType> findAll() {
		return find.all();
	}

	public static void save(ProductType productType) {
		Ebean.save(productType);
	}
	
	public static void update(ProductType productType) {
		Ebean.update(productType);
	}


}