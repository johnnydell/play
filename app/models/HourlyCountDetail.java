package models;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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
@Table(name = "edb_hourly_count_detail")
public class HourlyCountDetail extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	public Integer id;
	
	@ManyToOne
	@JoinColumn(name="hourly_count_base_id")
	public HourlyCountBase hourlyCountBase;
	
	@Column(name = "product_hour")
	public Integer productHour;
	
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
	
	@Column(name = "plan_count")
	public Integer planCount;

	@Column(name = "actual_count")
	public Integer actualCount;
	
	@Column(name = "product_hour_count")
	public Integer productHourCount;
	
	@Column(name = "scrap_count")
	public Integer scrapCount;
	
	@Column(name = "rework_count")
	public Integer reworkCount;
	
	@Column(name = "quality_loss")
	public Integer qualityLoss;
	
	@Column(name = "breakdown_count")
	public Integer breakdownCount;
	
	@Column(name = "adjustment_count")
	public Integer adjustmentCount;
	
	@Column(name = "technical_loss")
	public Integer technicalLoss;
	
	@Column(name = "plan_setup_count")
	public Integer planSetupCount;
	
	@Column(name = "unplan_setup_count")
	public Integer unplanSetupCount;
	
	@Column(name = "exchg_tool_count")
	public Integer exchgToolCount;
	
	@Column(name = "changeover_loss")
	public Integer changeoverLoss;
	
	@Column(name = "lack_personnel_count")
	public Integer lackPersonnelCount;
	
	@Column(name = "lack_material_count")
	public Integer lackMaterialCount;
	
	@Column(name = "test_release_three_parts_count")
	public Integer testReleaseThreePartsCount;
	
	@Column(name = "exchg_material_count")
	public Integer exchgMaterialCount;
	
	@Column(name = "unplan_sample_count")
	public Integer unplanSampleCount;
	
	@Column(name = "new_operator_count")
	public Integer newOperatorCount;
	
	@Column(name = "others_Count")
	public Integer othersCount;
	
	@Column(name = "orgnization_loss")
	public Integer orgnizationLoss;
	
	@Column(name = "unplan_tpm_count")
	public Integer unplanTpmCount;
	
	@Column(name = "performance_count")
	public Integer performanceCount;
	
	@Column(name = "undefined_count")
	public Integer undefinedCount;
	
	@Column(name = "remark")
	public String remark;
	
	@Column(name = "tech_down_code")
	public String techDownCode;
	

	

	public static Finder<Integer, HourlyCountDetail> find = new Finder<Integer, HourlyCountDetail>(Integer.class, HourlyCountDetail.class);

	public static List<HourlyCountDetail> findByLineName(String lineName, Date productDate) {
		
		return find.where().ilike("hourlyCountBase.productLine.lineName", "%" + lineName + "%").eq("hourlyCountBase.productDate", productDate).orderBy("").fetch("hourlyCountBase").findList();
	}
	
	public static List<HourlyCountDetail> findByBaseId(Integer baseId){
		return find.where().eq("hourlyCountBase.id", baseId).findList();
	}

	public static void save(HourlyCountDetail hourlyCountDetail) {
		Ebean.save(hourlyCountDetail);
	}
	
	public static void saveList(List<HourlyCountDetail> lists){
		Ebean.save(lists);
	}

}