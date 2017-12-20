package models;

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
@Table(name = "edb_meeting_attendance")
public class MetAttd extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="line_id",insertable=false,updatable=false)
	public ProductLine productLine;
	
	@Column(name = "line_id")
	public String lineId;
	
	@Column(name = "meeting_year")
	public String meetingYear;
	
	@Column(name = "meeting_month")
	public String meeingMonth;
	
	@Column(name = "meeting_time_start")
	public String meetingTimeStart;	
	
	@Column(name = "meeting_time_end")
	public String meetingTimeEnd;
	
	@Column(name = "meeting_spot")
	public String meetingSpot;
	
	@Column(name = "meeting_host")
	public String meetingHost;
		
	public static Finder<String,MetAttd> find = new Finder<String,MetAttd>(String.class, MetAttd.class);
	
	public static MetAttd getMetAtdanceInfo(String lineId,String year,String month){
		return find.where().eq("line_id", lineId).eq("meeting_year", year).eq("meeting_month", month).orderBy("").fetch("productLine").findUnique();
	}
	
	public static void save(MetAttd metAttd){
    	Ebean.save(metAttd);
    }
	
	public static void update(MetAttd metAttd){
	    Ebean.update(metAttd);
	}

}
