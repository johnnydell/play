package models;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
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
	
	@Column(name = "plan_total_count")
	public Integer planTotalCount;

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
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(productDate);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		Date secondDay = calendar.getTime();
		List<HourlyCountDetail> list_1 = find.where()
				.ilike("hourlyCountBase.productLine.lineName", "%" + lineName + "%")
				.eq("hourlyCountBase.productDate", productDate)
				.le("productHourIndex", 16)
				.orderBy("productHourIndex")
				.fetch("hourlyCountBase")
				.fetch("productType1")
				.fetch("productType2").findList();
		List<HourlyCountDetail> list_2 = find.where()
				.ilike("hourlyCountBase.productLine.lineName", "%" + lineName + "%")
				.eq("hourlyCountBase.productDate", secondDay)
				.ge("productHourIndex", 17)
				.le("productHourIndex", 24)
				.orderBy("productHourIndex")
				.fetch("hourlyCountBase")
				.fetch("productType1")
				.fetch("productType2").findList();
		list_1.addAll(list_2);
		return list_1;
	}
	
	public static List<HourlyCountDetail> findByBaseId(String baseId){
		return find.where().eq("hourlyCountBase.id", baseId).findList();
	}
	
	public static List<HourlyCountDetail> findByBaseIdAndFilterHour(String baseId, int startHour, int endHour){
		return find.where().eq("hourlyCountBase.id", baseId).ge("productHourIndex", startHour).le("productHourIndex", endHour).orderBy("productHourIndex").findList();
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
				+ "sum(b.target_oee_total_output) as target_oee_total, sum(b.actual_oee_total_output) as actual_oee_total,avg(b.target_oee_percent) as target_oee_percent,"
				+ " sum(d.changeover_loss) as changeover_loss_total, sum(d.orgnization_loss) as orgnization_loss_total"
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
	
	public static List<SqlRow> findHourlyData(String lineName, String productDate, int hourValue) throws ParseException{
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date currentDate = df.parse(productDate);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(currentDate);
		Date nextDate = currentDate;
		boolean isSameWorkDay = true;
		hourValue ++;
		if (hourValue == 23 ){
			calendar.add(Calendar.DAY_OF_MONTH, 1);
			nextDate = calendar.getTime();
			isSameWorkDay = false;
		}
		List<SqlRow> rows = null;
		StringBuffer sql = new StringBuffer();
		if (isSameWorkDay){
			sql.append("select tmp.*, t1.product_type_name as product_name1, t2.product_type_name as product_name2 from ( ");
			sql.append("select d.product_hour, d.product_type_id_1, d.product_cycle_1,  d.product_persons_1, d.product_type_id_2,  ");
			sql.append("d.product_cycle_2, d.product_persons_2, d.target_oee_percent, d.plan_count, d.product_hour_count ");
			sql.append(" from edb_hourly_count_base b, edb_hourly_count_detail d,edb_line l   ");
			sql.append(" where   d.hourly_count_base_id = b.id ");
			sql.append( " and b.product_line_id = l.id ");
			sql.append(" and l.line_name = :lineName ");
			sql.append(" and b.product_date = :productDate ");
			sql.append(" and d.product_hour in (:hours) ) as tmp ");
			sql.append(" left join edb_product_type t1 on tmp.product_type_id_1 = t1.id");
			sql.append(" left join edb_product_type t2 on tmp.product_type_id_2 = t2.id");
			List<Integer> hours = new ArrayList<Integer>();
			hours.add(hourValue);
			hours.add(hourValue + 1);
			rows =	Ebean.createSqlQuery(sql.toString()).setParameter("lineName", lineName).setParameter("productDate", productDate).setParameter("hours", hours).findList();
		}
		else{
			sql.append("select tmp.*, t1.product_type_name as product_name1, t2.product_type_name as product_name2 from ( ");
			sql.append("select d.product_hour, d.product_type_id_1, d.product_cycle_1,  d.product_persons_1, d.product_type_id_2,  ");
			sql.append("d.product_cycle_2, d.product_persons_2, d.target_oee_percent, d.plan_count, d.product_hour_count ");
			sql.append(" from edb_hourly_count_base b, edb_hourly_count_detail d,edb_line l   ");
			sql.append(" where   d.hourly_count_base_id = b.id ");
			sql.append( " and b.product_line_id = l.id ");
			sql.append(" and l.line_name = :lineName ");
			sql.append(" and b.product_date = :productDate_1 ");
			sql.append(" and d.product_hour =:hour_1 ) as tmp ");
			sql.append(" left join edb_product_type t1 on tmp.product_type_id_1 = t1.id");
			sql.append(" left join edb_product_type t2 on tmp.product_type_id_2 = t2.id");
			sql.append(" union ");
			sql.append("select tmp.*, t1.product_type_name as product_name1, t2.product_type_name as product_name2 from ( ");
			sql.append("select d.product_hour, d.product_type_id_1, d.product_cycle_1,  d.product_persons_1, d.product_type_id_2,  ");
			sql.append("d.product_cycle_2, d.product_persons_2, d.target_oee_percent, d.plan_count, d.product_hour_count ");
			sql.append(" from edb_hourly_count_base b, edb_hourly_count_detail d,edb_line l   ");
			sql.append(" where   d.hourly_count_base_id = b.id ");
			sql.append( " and b.product_line_id = l.id ");
			sql.append(" and l.line_name = :lineName ");
			sql.append(" and b.product_date = :productDate_2 ");
			sql.append(" and d.product_hour = 0 ) as tmp ");
			sql.append(" left join edb_product_type t1 on tmp.product_type_id_1 = t1.id");
			sql.append(" left join edb_product_type t2 on tmp.product_type_id_2 = t2.id");
			rows =	Ebean.createSqlQuery(sql.toString())
					.setParameter("lineName", lineName)
					.setParameter("productDate_1", productDate)
					.setParameter("hour_1", hourValue)
					.setParameter("productDate_2", nextDate)
					.findList();
		}
		
		return rows;
	}
	
	public static List<JSONObject> findYearlyScrapData(String name, Date startDate, Date endDate)  {
		String sql = "select date_format(b.product_date,'%Y') years, sum(d.scrap_count) as scrap_total_count "
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by years order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		sql = "select date_format(b.product_date,'%Y') years, sum(b.actual_oee_total_output) as actual_total_count "
				+ " from edb_hourly_count_base b, edb_line l"
				+ " where b.product_line_id = l.id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by years order by years";
		List<SqlRow> rows1 =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		List<JSONObject> jsons = new ArrayList<JSONObject>();
		for(SqlRow row : rows){
			JSONObject json = new JSONObject();
			String year = row.getString("years");
			String scrapTotal = row.getString("scrap_total_count");
			json.put("years", year);
			if (null != scrapTotal && !StringUtils.isEmpty(scrapTotal))
				json.put("scrapTotal", scrapTotal);
			else
				json.put("scrapTotal", 0);
			
			boolean isFound = false;
			for (SqlRow row1 : rows1){
				String year1 = row1.getString("years");
				String actualTotal = row1.getString("actual_total_count");
				if (year.equals(year1)){
					isFound = true;
					if (null != actualTotal && !StringUtils.isEmpty(actualTotal))
						json.put("actualTotal", actualTotal);
					else
						json.put("actualTotal", 0);
					break;
				}
			}
			if (!isFound){
				json.put("actualTotal", 0);
			}
			
			jsons.add(json);
		}
		return jsons;
	}
	
	public static List<JSONObject> findMonthlyScrapData(String name, Date startDate, Date endDate)  {
		String sql = "select date_format(b.product_date,'%m') months, sum(d.scrap_count) as scrap_total_count "
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months order by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		sql = "select date_format(b.product_date,'%m') months, sum(b.actual_oee_total_output) as actual_total_count "
				+ " from edb_hourly_count_base b, edb_line l"
				+ " where b.product_line_id = l.id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months order by months";
		List<SqlRow> rows1 =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		List<JSONObject> jsons = new ArrayList<JSONObject>();
		for(SqlRow row : rows){
			JSONObject json = new JSONObject();
			String month = row.getString("months");
			String scrapTotal = row.getString("scrap_total_count");
			json.put("months", month);
			if (null != scrapTotal && !StringUtils.isEmpty(scrapTotal))
				json.put("scrapTotal", scrapTotal);
			else
				json.put("scrapTotal", 0);
			
			boolean isFound = false;
			for (SqlRow row1 : rows1){
				String month1 = row1.getString("months");
				String actualTotal = row1.getString("actual_total_count");
				if (month.equals(month1)){
					isFound = true;
					if (null != actualTotal && !StringUtils.isEmpty(actualTotal))
						json.put("actualTotal", actualTotal);
					else
						json.put("actualTotal", 0);
					break;
				}
			}
			if (!isFound){
				json.put("actualTotal", 0);
			}
			
			jsons.add(json);
		}
		return jsons;
	}
	
	public static List<JSONObject> findDailyScrapData(String name, Date startDate, Date endDate){
		String sql = "select date_format(b.product_date,'%d') days, sum(d.scrap_count) as scrap_total_count "
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by days order by days";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		sql = "select date_format(b.product_date,'%d') days, sum(b.actual_oee_total_output) as actual_total_count "
				+ " from edb_hourly_count_base b, edb_line l"
				+ " where b.product_line_id = l.id"
				+ " and l.line_name = :lineName"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by days order by days";
		List<SqlRow> rows1 =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		List<JSONObject> jsons = new ArrayList<JSONObject>();
		for(SqlRow row : rows){
			JSONObject json = new JSONObject();
			String day = row.getString("days");
			String scrapTotal = row.getString("scrap_total_count");
			json.put("days", day);
			if (null != scrapTotal && !StringUtils.isEmpty(scrapTotal))
				json.put("scrapTotal", scrapTotal);
			else
				json.put("scrapTotal", 0);
			
			boolean isFound = false;
			for (SqlRow row1 : rows1){
				String day1 = row1.getString("days");
				String actualTotal = row1.getString("actual_total_count");
				if (day.equals(day1)){
					isFound = true;
					if (null != actualTotal && !StringUtils.isEmpty(actualTotal))
						json.put("actualTotal", actualTotal);
					else
						json.put("actualTotal", 0);
					break;
				}
			}
			if (!isFound){
				json.put("actualTotal", 0);
			}
			
			jsons.add(json);
		}
		return jsons;
	}
	
	public static List<JSONObject> findYearlyScrapSummaryData(Date startDate, Date endDate)  {
		String sql = "select date_format(b.product_date,'%Y') years,l.line_name, sum(d.scrap_count) as scrap_total_count "
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by years,line_name order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		sql = "select date_format(b.product_date,'%Y') years,l.line_name, sum(b.actual_oee_total_output) as actual_total_count "
				+ " from edb_hourly_count_base b, edb_line l"
				+ " where b.product_line_id = l.id"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by years,line_name order by years";
		List<SqlRow> rows1 =	Ebean.createSqlQuery(sql).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		List<JSONObject> jsons = new ArrayList<JSONObject>();
		for(SqlRow row : rows){
			JSONObject json = new JSONObject();
			String year = row.getString("years");
			String scrapTotal = row.getString("scrap_total_count");
			String lineName1 = row.getString("line_name");
			json.put("years", year);
			json.put("line_name", lineName1);
			if (null != scrapTotal && !StringUtils.isEmpty(scrapTotal))
				json.put("scrapTotal", scrapTotal);
			else
				json.put("scrapTotal", 0);
			
			boolean isFound = false;
			for (SqlRow row1 : rows1){
				String year1 = row1.getString("years");
				String actualTotal = row1.getString("actual_total_count");
				String lineName2 = row1.getString("line_name");
				if (year.equals(year1) && lineName1.equals(lineName2)){
					isFound = true;
					if (null != actualTotal && !StringUtils.isEmpty(actualTotal))
						json.put("actualTotal", actualTotal);
					else
						json.put("actualTotal", 0);
					break;
				}
			}
			if (!isFound){
				json.put("actualTotal", 0);
			}
			
			jsons.add(json);
		}
		return jsons;
	}
	
	public static List<JSONObject> findMonthlyScrapSummaryData(Date startDate, Date endDate)  {
		String sql = "select date_format(b.product_date,'%m') months,l.line_name, sum(d.scrap_count) as scrap_total_count "
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months,line_name order by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		sql = "select date_format(b.product_date,'%m') months,l.line_name, sum(b.actual_oee_total_output) as actual_total_count "
				+ " from edb_hourly_count_base b, edb_line l"
				+ " where b.product_line_id = l.id"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by months,line_name order by months";
		List<SqlRow> rows1 =	Ebean.createSqlQuery(sql).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		List<JSONObject> jsons = new ArrayList<JSONObject>();
		for(SqlRow row : rows){
			JSONObject json = new JSONObject();
			String month = row.getString("months");
			String scrapTotal = row.getString("scrap_total_count");
			String lineName1 = row.getString("line_name");
			json.put("line_name", lineName1);
			json.put("months", month);
			if (null != scrapTotal && !StringUtils.isEmpty(scrapTotal))
				json.put("scrapTotal", scrapTotal);
			else
				json.put("scrapTotal", 0);
			
			boolean isFound = false;
			for (SqlRow row1 : rows1){
				String month1 = row1.getString("months");
				String actualTotal = row1.getString("actual_total_count");
				String lineName2 = row1.getString("line_name");
				if (month.equals(month1) && lineName1.equals(lineName2)){
					isFound = true;
					if (null != actualTotal && !StringUtils.isEmpty(actualTotal))
						json.put("actualTotal", actualTotal);
					else
						json.put("actualTotal", 0);
					break;
				}
			}
			if (!isFound){
				json.put("actualTotal", 0);
			}
			
			jsons.add(json);
		}
		return jsons;
	}
	
	public static List<JSONObject> findDailyScrapSummaryData(Date startDate, Date endDate){
		String sql = "select date_format(b.product_date,'%d') days,l.line_name, sum(d.scrap_count) as scrap_total_count "
				+ " from edb_hourly_count_base b, edb_line l, edb_hourly_count_detail d"
				+ " where b.product_line_id = l.id"
				+ " and b.id = d.hourly_count_base_id"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by days,line_name order by days";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		sql = "select date_format(b.product_date,'%d') days,l.line_name, sum(b.actual_oee_total_output) as actual_total_count "
				+ " from edb_hourly_count_base b, edb_line l"
				+ " where b.product_line_id = l.id"
				+ " and b.product_date between :startDate and :endDate "
				+ " group by days,line_name order by days";
		List<SqlRow> rows1 =	Ebean.createSqlQuery(sql).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		
		List<JSONObject> jsons = new ArrayList<JSONObject>();
		for(SqlRow row : rows){
			JSONObject json = new JSONObject();
			String day = row.getString("days");
			String scrapTotal = row.getString("scrap_total_count");
			String lineName1 = row.getString("line_name");
			json.put("line_name", lineName1);
			json.put("days", day);
			if (null != scrapTotal && !StringUtils.isEmpty(scrapTotal))
				json.put("scrapTotal", scrapTotal);
			else
				json.put("scrapTotal", 0);
			
			boolean isFound = false;
			for (SqlRow row1 : rows1){
				String day1 = row1.getString("days");
				String actualTotal = row1.getString("actual_total_count");
				String lineName2 = row1.getString("line_name");
				if (day.equals(day1) && lineName1.equals(lineName2)){
					isFound = true;
					if (null != actualTotal && !StringUtils.isEmpty(actualTotal))
						json.put("actualTotal", actualTotal);
					else
						json.put("actualTotal", 0);
					break;
				}
			}
			if (!isFound){
				json.put("actualTotal", 0);
			}
			
			jsons.add(json);
		}
		return jsons;
	}

}