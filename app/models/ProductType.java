package models;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.ConcurrencyMode;
import com.avaje.ebean.annotation.EntityConcurrencyMode;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_product_type")
@EntityConcurrencyMode(ConcurrencyMode.NONE)
public class ProductType extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@Column(name = "product_type_name")
	public String productTypeName;

	@Column(name = "cycle")
	public String cycle;

	@Column(name = "persons")
	public String persons;

	@Column(name = "plan_output")
	public String planOutput;

	@Column(name = "target_output")
	public String targetOutput;

	@Column(name = "active")
	public Boolean active;

	public static Finder<String, ProductType> find = new Finder<String, ProductType>(
			String.class, ProductType.class);
	
	public static List<ProductType> getList() {
        return find.where().eq("active", true).findList();
	}
	
	public static List<ProductType> getAllList() {
        return find.findList();
	}
	
	public static void saveList(List<ProductType> li){
    	Ebean.save(li);
    }
	
	public static void updateList(List<ProductType> li){
		if(li != null && li.size() > 0){
			for(ProductType type:li){
				Ebean.update(type);
			}
		}
	}
	
	public static ProductType find(String id){
		return Ebean.find(ProductType.class, id);
	}
	
	public static void deleteList(List<ProductType> li){
		Ebean.delete(li);
	}

	public static ProductType findByName(String name) {
		return find.where().eq("productTypeName", name).eq("active", true).findUnique();
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