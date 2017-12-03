package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_hourly_count_base")
public class HourlyCountBase extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public Integer id;
	
	@ManyToOne
	@JoinColumn(name="product_line_id")
	public ProductLine productLine;
	
	@ManyToOne
	@JoinColumn(name="product_type_id_1")
	public ProductType productType1;
	
	@ManyToOne
	@JoinColumn(name="product_type_id_2")
	public ProductType productType2;

	@Column(name = "product_cycle_1")
	public Integer productCycle1;
	
	@Column(name = "product_cycle_2")
	public Integer productCycle2;

	@Column(name = "product_date")
	public Date productDate;

	

	public static Finder<Integer, HourlyCountBase> find = new Finder<Integer, HourlyCountBase>(Integer.class, HourlyCountBase.class);

	public static HourlyCountBase findByProduct1Name(String name) {
		return find.where().ilike("productType1.productTypeName", "%" + name + "%").orderBy("").fetch("productLine").fetch("productType1").fetch("productType2").findUnique();
	}

	public static void save(HourlyCountBase uploadFile) {
		Ebean.save(uploadFile);
	}

}