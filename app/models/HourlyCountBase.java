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
	
	public static List<SqlRow> findYearlyOeeData(String name)  {
		String sql = "select date_format(b.product_date,'%Y') years, avg(b.target_oee_percent) as target_oee_percent," 
				+" sum(b.target_oee_total_output) as target_oee_total, sum(b.actual_oee_total_output) as actual_oee_total "
				+ " from edb_hourly_count_base b, edb_line l "
				+" where b.product_line_id = l.id "
				+ " and l.line_name = :lineName "
				+ " group by years order by years";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).setParameter("lineName", name).findList();
		return rows;
	}
	
	public static List<HourlyCountBase> findDailyOeeData(String lineName, Date startDate, Date endDate){
		return find.where().ieq("productLine.lineName", lineName).between("productDate", startDate, endDate).findList();
	}

	public static void save(HourlyCountBase base) {
		Ebean.save(base);
	}
	public static void update(HourlyCountBase base) {
		Ebean.update(base);
	}
}