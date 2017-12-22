package models;

import java.sql.Time;
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

import play.db.ebean.Model;

@Entity
@Table(name = "edb_opl")
public class OPL extends Model {
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name = "line_id")
	public ProductLine productLine;
	
	@Column(name = "line_id")
	public String lineId;
	
	@Column(name = "date")
	public String date;
	
	@Column(name="founder")
	public String founder;
	
	@Column(name = "ref_no")
	public String refNo;
	
	@Column(name = "station_no")
	public String stationNo;
	
	@Column(name = "desc")
	public String desc;
	
	@Column(name = "start")
	public String start;
	
	@Column(name = "end")
	public String end;
	
	@Column(name = "timing")
	public String timing;
	
	@Column(name = "amount")
	public String amount;
	
	@Column(name = "root_cause")
	public String rootCause;
	
	@Column(name = "immediate")
	public String immediate;
	
	@Column(name = "long_term")
	public String longTerm;
	
	@Column(name = "problem_solve")
	public String problemSolve;
	
	@Column(name = "pss_link")
	public String pssLink;
	
	@Column(name = "owner")
	public String owner;
	
	@Column(name = "deadline")
	public String deadline;
	
	@Column(name = "status")
	public String status;
	
	@Column(name = "create_time")
	public String createTime;

	public static Finder<String, OPL> find = new Finder<String, OPL>(String.class, OPL.class);

	public static OPL findByOplId(String oplId){
		
		return find.where().eq("id", oplId).orderBy("").fetch("oplFounder").fetch("oplOwner").findUnique();
	}
	
	public static List<OPL> findByParams(String lineName, Date oplStartDate, Date oplEndDate){
		
		return find.where().eq("productLine.lineName", lineName).between("oplDate", oplStartDate, oplEndDate).orderBy("").fetch("oplFounder").fetch("oplOwner").fetch("productLine").findList();
	}
	
	public static OPL findByOplDesc(String oplDesc){		
		return find.where().ilike("oplDesc", "%" + oplDesc + "%").orderBy("").fetch("oplFounder").fetch("oplOwner").fetch("productLine").findUnique();
	}

	public static void save(OPL base) {
		Ebean.save(base);
	}
	
	public static void update(OPL base) {
		Ebean.update(base);
	}
}