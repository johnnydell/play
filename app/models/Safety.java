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
@Table(name = "edb_safety")
public class Safety extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name = "line_id")
	public ProductLine productLine;

	@Column(name = "safety_date")
	public Date safetyDate;
	
	@Column(name = "safety_target_count")
	public Integer safetyTargetCount;
	
	@Column(name = "safety_actual_count")
	public Integer safetyActualCount;

	public static Finder<String, Safety> find = new Finder<String, Safety>(String.class, Safety.class);
	
	public static List<Safety> getActiveList(){
		return find.where().eq("active", true).findList();
	}
	
	
	
	public static Safety findById(String id){
		return find.where().eq("id", id).findUnique();
	}

	public static void save(Safety productLine) {
		Ebean.save(productLine);
	}
	
	public static void saveList(List<Safety> lists){
		Ebean.save(lists);
	}
	
	public static void updateList(List<Safety> lists){
		for(Safety safety : lists){
			Ebean.update(safety);
		}
	}
	
	public static void deleteList(List<Safety> lists){
		for(Safety line : lists){
			Ebean.delete(Safety.class, line.id);
		}
	}
	
	public static List<Safety> getSafetiesByLineAndDate(String lineName, Date startDate, Date endDate){
		return find.where().eq("productLine.lineName", lineName).between("safetyDate", startDate, endDate).orderBy("safetyDate").findList();
	}
	
	public static List<SqlRow> findYearlySafetyData(String name, Date startDate, Date endDate)  {
		String sql = "select date_format(b.safety_date,'%Y') years, avg(b.safety_target_count) as target_total," 
				+" sum(b.safety_actual_count) as actual_total "
				+ " from edb_safety b, edb_line l "
				+" where b.line_id = l.id "
				+"  and b.safety_date between :startDt and :endDt "
				+ " and l.line_name = :lineName "
				+ " group by years order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDt", startDate).setParameter("endDt", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlySafetyData(String name, Date startDate, Date endDate)  {
		String sql = "select date_format(b.safety_date,'%m') months, sum(b.safety_actual_count) as actual_total, avg(b.safety_target_count) as target_total "
				
				+ " from edb_safety b, edb_line l "
				+ " where b.line_id = l.id"
				+ " and l.line_name = :lineName"
				+ " and b.safety_date between :startDate and :endDate "
				+ " group by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).setParameter("startDate", startDate).setParameter("endDate", endDate).findList();
		return rows;
	}
	
	public static List<SqlRow> findYearlySafetySummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.safety_date,'%Y') years, l.line_name , sum(b.safety_actual_count) as actual_total, sum(b.safety_target_count) as target_total "
				+ " from edb_safety b, edb_line l "
				+ " where b.line_id = l.id"
				+ " and b.safety_date between :startDate and :endDate "
				+ " group by years, line_name order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDate", startDt).setParameter("endDate", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlySafetySummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.safety_date,'%m') months, l.line_name , sum(b.safety_actual_count) as actual_total, sum(b.safety_target_count) as target_total "
				+ " from edb_safety b, edb_line l "
				+ " where b.line_id = l.id"
				+ " and b.safety_date between :startDate and :endDate "
				+ " group by months, line_name order by months";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDate", startDt).setParameter("endDate", endDt).findList();
		return rows;
	}
	
	public static List<SqlRow> findDailySafetySummaryData(Date startDt, Date endDt)  {
		String sql = "select date_format(b.safety_date,'%d') days, l.line_name , sum(b.safety_actual_count) as actual_total, sum(b.safety_target_count) as target_total "
				+ " from edb_safety b, edb_line l "
				+ " where b.line_id = l.id"
				+ " and b.safety_date between :startDate and :endDate "
				+ " group by days, line_name order by days";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("startDate", startDt).setParameter("endDate", endDt).findList();
		return rows;
	}

}