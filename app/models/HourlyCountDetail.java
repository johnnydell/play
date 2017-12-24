package models;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlRow;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_hourly_count_detail")
public class HourlyCountDetail extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="hourly_count_base_id")
	public HourlyCountBase hourlyCountBase;
	
	@Column(name = "product_hour")
	public Integer productHour;
	
	@Column(name = "product_hour_index")
	public Integer productHourIndex;
	
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
	

	

	public static Finder<String, HourlyCountDetail> find = new Finder<String, HourlyCountDetail>(String.class, HourlyCountDetail.class);

	public static List<HourlyCountDetail> findByLineName(String lineName, Date productDate) {
		
		return find.where().ilike("hourlyCountBase.productLine.lineName", "%" + lineName + "%").eq("hourlyCountBase.productDate", productDate).orderBy("productHourIndex").fetch("hourlyCountBase").fetch("productType1").fetch("productType2").findList();
	}
	
	public static List<HourlyCountDetail> findByBaseId(String baseId){
		return find.where().eq("hourlyCountBase.id", baseId).findList();
	}

	public static void save(HourlyCountDetail hourlyCountDetail) {
		Ebean.save(hourlyCountDetail);
	}
	
	public static void saveList(List<HourlyCountDetail> lists){
		Ebean.save(lists);
	}
	
	public static void updateList(List<HourlyCountDetail> lists){
		for(HourlyCountDetail detail : lists){
			Ebean.update(detail);
		}
	}
	
	public static List<SqlRow> findMonthlyLossData(String name, Date startDate, Date endDate)  {
		String sql = "select date_format(b.product_date,'%m') months, sum(d.quality_loss) as quality_loss_total, sum(d.technical_loss) as technical_loss_total,"
				+ " sum(d.changeover_loss) as changeover_loss_total, sum(d.orgnization_loss) as orgnization_loss_total,"
				+ "  sum(distinct b.target_oee_total_output) as target_oee_total, sum(distinct b.actual_oee_total_output) as actual_oee_total"
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyQualityLossData(String name, Date startDate, Date endDate)  {
		String sql = "select DATE_FORMAT(b.product_date,'%m') months, sum(d.scrap_count) as scrap_loss_total, sum(d.rework_count) as rework_loss_total"
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyTechnicalLossData(String name, Date startDate, Date endDate)  {
		String sql = "select DATE_FORMAT(b.product_date,'%m') months, sum(d.breakdown_count) as breakdown_loss_total, sum(d.adjustment_count) as adjustment_loss_total"
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyChangeoverLossData(String name, Date startDate, Date endDate)  {
		String sql = "select DATE_FORMAT(b.product_date,'%m') months, sum(d.plan_setup_count) as plan_setup_loss_total, sum(d.unplan_setup_count) as unplan_setup_loss_total, sum(d.exchg_tool_count) as exchg_tool_loss_total"
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyOrgnizationLossData(String name, Date startDate, Date endDate)  {
		String sql = "select DATE_FORMAT(b.product_date,'%m') months, sum(d.lack_personnel_count) as lack_personnel_loss_total, sum(d.lack_material_count) as lack_material_loss_total,"
				+ " sum(d.test_release_three_parts_count) as test_release_three_parts_loss_total, sum(d.exchg_material_count) as exchg_material_loss_total,"
				+ " sum(d.unplan_tpm_count) as unplan_tpm_loss_total, sum(d.unplan_sample_count) as unplan_sample_loss_total,"
				+ " sum(d.new_operator_count) as new_operator_loss_total, sum(d.others_count) as others_loss_total "
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyPerformanceLossData(String name, Date startDate, Date endDate)  {
		String sql = "select DATE_FORMAT(b.product_date,'%m') months, sum(d.performance_count) as performance_loss_total, sum(d.undefined_count) as undefined_loss_total"
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyAllLossData(String name, Date startDate, Date endDate)  {
		String sql = "select DATE_FORMAT(b.product_date,'%m') months, "
				//QualityLoss
				+ " sum(d.scrap_count) as scrap_loss_total, sum(d.rework_count) as rework_loss_total,"
				//TechnicalLoss
				+ " sum(d.breakdown_count) as breakdown_loss_total, sum(d.adjustment_count) as adjustment_loss_total,"
				//ChangeoverLoss
				+ " sum(d.plan_setup_count) as plan_setup_loss_total, sum(d.unplan_setup_count) as unplan_setup_loss_total, sum(d.exchg_tool_count) as exchg_tool_loss_total,"
				//OrgnizationLoss
				+ " sum(d.lack_personnel_count) as lack_personnel_loss_total, sum(d.lack_material_count) as lack_material_loss_total,"
				+ " sum(d.test_release_three_parts_count) as test_release_three_parts_loss_total, sum(d.exchg_material_count) as exchg_material_loss_total,"
				+ " sum(d.unplan_tpm_count) as unplan_tpm_loss_total, sum(d.unplan_sample_count) as unplan_sample_loss_total,"
				+ " sum(d.new_operator_count) as new_operator_loss_total, sum(d.others_count) as others_loss_total, "
				//PerformanceLoss
				+ " sum(d.performance_count) as performance_loss_total, sum(d.undefined_count) as undefined_loss_total " 
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}

}