package models;

import java.sql.Time;
import java.util.Date;
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
public class Opl extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@Column(name = "opl_date")
	public Date oplDate;
	
	@ManyToOne
	@JoinColumn(name="opl_found_id")
	public User oplFounder;
	
	@Column(name = "station_no")
	public String stationNo;
	
	@Column(name = "opl_desc")
	public String oplDesc;
	
	@Column(name = "opl_start")
	public Time oplStart;
	
	@Column(name = "opl_end")
	public Time oplEnd;
	
	@Column(name = "opl_amount")
	public Integer oplAmount;
	
	@Column(name = "opl_root_cause")
	public String oplRootCause;
	
	@Column(name = "opl_immediate")
	public String oplImmediate;
	
	@Column(name = "opl_long_term")
	public String oplLongTerm;
	
	@Column(name = "problem_solve")
	public boolean problemSolve;
	
	@Column(name = "pss_link")
	public String pssLink;
	
	@Column(name = "opl_owner_id")
	public User oplOwner;
	
	@Column(name = "opl_deadline")
	public Date oplDeadline;
	
	@Column(name = "opl_status")
	public boolean oplStatus;

	public static Finder<String, Opl> find = new Finder<String, Opl>(String.class, Opl.class);

	public static Opl findByOplId(String oplId)  {
		
		return find.where().eq("id", oplId).orderBy("").fetch("oplFounder").fetch("oplOwner").findUnique();
	}
	
	public static Opl findByOplDesc(String oplDesc)  {
		
		return find.where().ilike("oplDesc", "%" + oplDesc + "%").orderBy("").fetch("oplFounder").fetch("oplOwner").findUnique();
	}

	public static void save(Opl base) {
		Ebean.save(base);
	}
	public static void update(Opl base) {
		Ebean.update(base);
	}
}