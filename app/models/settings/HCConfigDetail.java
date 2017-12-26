package models.settings;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import models.ProductType;
import play.db.ebean.Model;

@Entity
@Table(name = "edb_hourly_count_detail")
public class HCConfigDetail extends Model {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="hourly_count_base_id")
	public HCConfigBase hcConfigBase;
	
	@Column(name = "hourly_count_base_id")
	public String base_id;
	
	@Column(name = "product_hour")
	public Integer productHour;
	
	@Column(name = "product_hour_index")
	public Integer productHourIndex;
	
	@ManyToOne
	@JoinColumn(name="product_type_id_1")
	public ProductType productType1;
	
	@Column(name = "product_persons_1")
	public Integer productPersons1;
	
	@ManyToOne
	@JoinColumn(name="product_type_id_2")
	public ProductType productType2;

	@Column(name = "product_cycle_1")
	public Integer productCycle1;
	
	@Column(name = "product_cycle_2")
	public Integer productCycle2;
	
	@Column(name = "product_persons_2")
	public Integer productPersons2;
	
	@Column(name = "target_oee_percent")
	public Float targetOeePercent;
	
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
	
	@Column(name = "breakdown_min")
	public Integer breakdownMin;
	
	@Column(name = "breakdown_count")
	public Integer breakdownCount;
	
	@Column(name = "adjustment_min")
	public Integer adjustmentMin;
	
	@Column(name = "adjustment_count")
	public Integer adjustmentCount;
	
	@Column(name = "technical_loss")
	public Integer technicalLoss;
	
	@Column(name = "plan_setup_min")
	public Integer planSetupMin;
	
	@Column(name = "plan_setup_count")
	public Integer planSetupCount;
	
	@Column(name = "unplan_setup_min")
	public Integer unplanSetupMin;
	
	@Column(name = "unplan_setup_count")
	public Integer unplanSetupCount;
	
	@Column(name = "exchg_tool_min")
	public Integer exchgToolMin;
	
	@Column(name = "exchg_tool_count")
	public Integer exchgToolCount;
	
	@Column(name = "changeover_loss")
	public Integer changeoverLoss;
	
	@Column(name = "lack_personnel_min")
	public Integer lackPersonnelMin;
	
	@Column(name = "lack_personnel_count")
	public Integer lackPersonnelCount;
	
	@Column(name = "lack_material_min")
	public Integer lackMaterialMin;
	
	@Column(name = "lack_material_count")
	public Integer lackMaterialCount;
	
	@Column(name = "test_release_three_parts_min")
	public Integer testReleaseThreePartsMin;
	
	@Column(name = "test_release_three_parts_count")
	public Integer testReleaseThreePartsCount;
	
	@Column(name = "exchg_material_min")
	public Integer exchgMaterialMin;
	
	@Column(name = "exchg_material_count")
	public Integer exchgMaterialCount;
	
	@Column(name = "unplan_sample_min")
	public Integer unplanSampleMin;
	
	@Column(name = "unplan_sample_count")
	public Integer unplanSampleCount;
	
	@Column(name = "new_operator_min")
	public Integer newOperatorMin;
	
	@Column(name = "new_operator_count")
	public Integer newOperatorCount;
	
	@Column(name = "others_min")
	public Integer othersMin;
	
	@Column(name = "others_Count")
	public Integer othersCount;
	
	@Column(name = "orgnization_loss")
	public Integer orgnizationLoss;
	
	@Column(name = "unplan_tpm_min")
	public Integer unplanTpmMin;
	
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

	public static Finder<String, HCConfigDetail> find = new Finder<String, HCConfigDetail>(String.class, HCConfigDetail.class);
	
	//获得当前日期的前部分明细
	public static List<HCConfigDetail> getHCConfigDetailPreByBaseId(String baseId){
		return find.where().eq("hourly_count_base_id", baseId).between("product_hour_index", 1, 16).orderBy("product_hour_index asc").fetch("productType1").fetch("productType2").findList();
	}
	
	//获得当前日期的后部分明细
	public static List<HCConfigDetail> getHCConfigDetailSufByBaseId(String baseId){
		return find.where().eq("hourly_count_base_id", baseId).between("product_hour_index", 17, 24).orderBy("product_hour_index asc").fetch("productType1").fetch("productType2").findList();
	}

}