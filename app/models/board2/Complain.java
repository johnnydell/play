package models.board2;

import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import models.ProductLine;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlRow;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_complain")
public class Complain extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="line_id",insertable=false,updatable=false)
	public ProductLine productLine;
	
	@Column(name = "line_id")
	public String lineId;
	
	@Column(name = "year")
	public String year;
	
	@Column(name = "month")
	public String month;
	
	@Column(name = "total_target")
	public String totalTarget;
	
	@OneToMany(mappedBy="complain", cascade=CascadeType.ALL)
	@OrderBy("type.index asc,dayKey ASC")
    public List<ComplainActualDays> complainActualDays; 
	
	@OneToMany(mappedBy="complain", cascade=CascadeType.ALL)
	@OrderBy("dayKey ASC")
    public List<ComplainTargetDays> complainTargetDays; 
		
	public static Finder<String,Complain> find = new Finder<String,Complain>(String.class, Complain.class);
	
	public static Complain getComplainInfo(String lineId,String year,String month){
		return find.where().eq("line_id", lineId).eq("year", year).eq("month", month).orderBy("").fetch("productLine").findUnique();
	}
	
	public static List<SqlRow> findYearlyTargetData(String lineId,Integer startYear, Integer endYear)  {
		String sql = "select cp.year as year,sum(total_target) as total_target  "		
				+" from edb_complain cp  "
				+" where cp.line_id = :lineId "  
				+" and  cp.year BETWEEN :startYear and :endYear "
				+" group by cp.year";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineId", lineId).setParameter("startYear", startYear).setParameter("endYear", endYear).findList();
		return rows;
	}
	
	public static List<SqlRow> getYearlyTypes(String lineId,Integer startYear, Integer endYear)  {
		String sql = "select act.type_id,cp.year,sum(act.day_val) as cnt "		
				+" from edb_complain_actual_days act  "
				+" left join edb_complain cp on act.complain_id = cp.id "  
				+" where cp.line_id = :lineId "
				+" and cp.year BETWEEN :startYear and :endYear "
				+" group by act.type_id,cp.year ";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineId", lineId).setParameter("startYear", startYear).setParameter("endYear", endYear).findList();
		return rows;
	}
	
	public static List<SqlRow> findMonthlyTargetData(String lineId,String year)  {
		String sql = "select cp.month,cp.total_target "		
				+" from edb_complain cp  "
				+" where cp.line_id = :lineId "  
				+" and  cp.year = :year ";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineId", lineId).setParameter("year", year).findList();
		return rows;
	}
	
	public static List<SqlRow> getMonthlyTypes(String lineId,String year)  {
		String sql = "select act.type_id,cp.month,sum(act.day_val) as cnt "		
				+" from edb_complain_actual_days act  "
				+" left join edb_complain cp on act.complain_id = cp.id "  
				+" where cp.line_id = :lineId "
				+" and cp.year = :year"
				+" group by act.type_id,cp.month ";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineId", lineId).setParameter("year", year).findList();
		return rows;
	}
	
	public static Complain find(String id){
		return Ebean.find(Complain.class, id);
	}
	
	public static void save(Complain complain){
    	Ebean.save(complain);
    }
	
	public static void update(Complain complain){
		Ebean.update(complain);
	}

}
