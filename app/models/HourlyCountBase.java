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
@Table(name = "edb_hourly_count_base")
public class HourlyCountBase extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="product_line_id")
	public ProductLine productLine;
	
	

	@Column(name = "product_date")
	//@DateTimeFormat(pattern="yyyy-mm-dd")
	public Date productDate;
	
	@Column(name = "man_Hour_Shift_1")
	public Integer manHourShift1;
	
	@Column(name = "man_Hour_Shift_2")
	public Integer manHourShift2;
	
	@Column(name = "man_Hour_Shift_3")
	public Integer manHourShift3;
	
	@Column(name = "team_leader_sign_1")
	public String teamLeaderSign1;

	@Column(name = "team_leader_sign_2")
	public String teamLeaderSign2;
	
	@Column(name = "team_leader_sign_3")
	public String teamLeaderSign3;
	
	@Column(name = "group_leader_sign")
	public String groupLeaderSign;
	
	@Column(name = "target_oee_percent")
	public Double targetOeePercent;
	
	@Column(name = "plan_opl_total_output")
	public Integer planOplTotalOutput;
	
	@Column(name = "target_oee_total_output")
	public Integer targetOeeTotalOutput;
	
	@Column(name = "actual_oee_total_output")
	public Integer actualOeeTotalOutput;

	public static Finder<String, HourlyCountBase> find = new Finder<String, HourlyCountBase>(String.class, HourlyCountBase.class);

	public static HourlyCountBase findByLineNameAndDate(String name, Date productDate)  {
		
		return find.where().eq("productLine.lineName", name).eq("productDate", productDate).orderBy("").fetch("productLine").findUnique();
	}
	
	public static List<SqlRow> findYearlyOeeData(String name, Date startDate, Date endDate)  {
		String sql = "select date_format(b.product_date,'%Y') years, avg(b.target_oee_percent) as target_oee_percent," 
				+" sum(b.target_oee_total_output) as target_oee_total, sum(b.actual_oee_total_output) as actual_oee_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+" where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by years order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDate).setParameter("endDt", endDate).findList();
		return rows;
	}
	
	public static List<HourlyCountBase> findDailyOeeData(String lineName, Date startDate, Date endDate){
		return find.where().ieq("productLine.lineName", lineName).between("productDate", startDate, endDate).findList();
	}
	
	public static List<HourlyCountBase> findOeeDataByDtScope(String lineId, Date startDate, Date endDate){
		return find.where().ieq("productLine.id", lineId).between("productDate", startDate, endDate).findList();
	} 
	
	public static List<SqlRow> findYearlyActualData(String lineId,Date startDt, Date endDt)  {
		String sql = "select year(base.product_date) as year,sum(base.actual_oee_total_output) as oee_actual_total "		
				+" from edb_hourly_count_base base  "
				+" where base.product_line_id = :lineId "  
				+" and base.product_date between :startDt and :endDt "
				+" GROUP BY year(base.product_date)";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineId", lineId).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyActualData(String lineId,Date startDt, Date endDt)  {
		String sql = "select month(base.product_date) as month,sum(base.actual_oee_total_output) as oee_actual_total "		
				+" from edb_hourly_count_base base  "
				+" where base.product_line_id = :lineId "  
				+" and base.product_date between :startDt and :endDt "
				+" GROUP BY month(base.product_date)";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineId", lineId).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findYearlyProductivityData(String name, Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%Y') years, " 
				+ " sum(b.man_Hour_Shift_1) as man_hour_total_1, sum(b.man_Hour_Shift_2) as man_hour_total_2, sum(b.man_Hour_Shift_3) as man_hour_total_3, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by years order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyProductivityData(String name, Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%m') months, " 
				+ " sum(b.man_Hour_Shift_1) as man_hour_total_1, sum(b.man_Hour_Shift_2) as man_hour_total_2, sum(b.man_Hour_Shift_3) as man_hour_total_3, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by months order by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findDailyProductivityData(String name, Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%d') days, " 
				+ " sum(b.man_Hour_Shift_1) as man_hour_total_1, sum(b.man_Hour_Shift_2) as man_hour_total_2, sum(b.man_Hour_Shift_3) as man_hour_total_3, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by days order by days";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findYearlyProdSummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%Y') years, l.line_name, " 
				+ " sum(b.man_Hour_Shift_1) as man_hour_total_1, sum(b.man_Hour_Shift_2) as man_hour_total_2, sum(b.man_Hour_Shift_3) as man_hour_total_3, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by years,line_name order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyProdSummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%m') months, l.line_name, " 
				+ " sum(b.man_Hour_Shift_1) as man_hour_total_1, sum(b.man_Hour_Shift_2) as man_hour_total_2, sum(b.man_Hour_Shift_3) as man_hour_total_3, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by months,line_name order by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findDailyProdSummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%d') days, l.line_name, " 
				+ " sum(b.man_Hour_Shift_1) as man_hour_total_1, sum(b.man_Hour_Shift_2) as man_hour_total_2, sum(b.man_Hour_Shift_3) as man_hour_total_3, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by days,line_name order by days";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findYearlyDeliveryData(String name, Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%Y') years, " 
				+ " sum(b.target_oee_total_output) as target_total, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by years order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyDeliveryData(String name, Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%m') months, " 
				+ " sum(b.target_oee_total_output) as target_total, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by months order by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findDailyDeliveryData(String name, Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%d') days, " 
				+ " sum(b.target_oee_total_output) as target_total, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by days order by days";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findYearlyDeliverySummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%Y') years, l.line_name, " 
				+ " sum(b.target_oee_total_output) as target_total, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by years order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyDeliverySummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%m') months, l.line_name, " 
				+ " sum(b.target_oee_total_output) as target_total, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by months order by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findDailyDeliverySummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.product_date,'%d') days, l.line_name, " 
				+ " b.target_oee_total_output as target_total, "
				+ " sum(b.actual_oee_total_output) as actual_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+ " where b.product_line_id = l.id "
				+"  and b.product_date between :startDt and :endDt "
				+ " group by days order by days";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDt", startDt).setParameter("endDt", endDt).findList();
		return rows;
	}

	public static void save(HourlyCountBase base) {
		Ebean.save(base);
	}
	public static void update(HourlyCountBase base) {
		Ebean.update(base);
	}
}