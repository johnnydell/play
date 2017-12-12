package models;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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

	public static Finder<Integer, HourlyCountBase> find = new Finder<Integer, HourlyCountBase>(Integer.class, HourlyCountBase.class);

	public static HourlyCountBase findByLineNameAndDate(String name, Date productDate)  {
		
		return find.where().eq("productLine.lineName", name).eq("productDate", productDate).orderBy("").fetch("productLine").findUnique();
	}

	public static void save(HourlyCountBase base) {
		Ebean.save(base);
	}
	public static void update(HourlyCountBase base) {
		Ebean.update(base);
	}
}