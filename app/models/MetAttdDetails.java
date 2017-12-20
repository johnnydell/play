package models;

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

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_meeting_attendance_details")
public class MetAttdDetails extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="meeting_attendance_id",insertable=false,updatable=false)
	public MetAttd meetingAttendance;
	
	@Column(name = "meeting_attendance_id")
	public String meetingAttendanceId;
	
	@Column(name = "meeting_attendee")
	public String meeting_attendee;
	
	@Column(name = "required")
	public String required;
	
	@Column(name = "frequency")
	public String frequency;
	
	@Column(name = "dept")
	public String dept;
	
	@Column(name = "create_time")
	public String createTime;
	
	@OneToMany(mappedBy="meetingAttendanceDetails", cascade=CascadeType.ALL)
	@OrderBy("dayKey ASC")
    public List<MetAttdDetailsDays> meetingAttendanceDetailsDays; 
	
	public static Finder<String,MetAttdDetails> find = new Finder<String,MetAttdDetails>(String.class, MetAttdDetails.class);
	
	public static List<MetAttdDetails> getMetAtdanceDetailsByAtdId(String meetingAttendanceId){
		return find.where().eq("meeting_attendance_id", meetingAttendanceId).orderBy("create_time asc").findList();
	}
	
	public static MetAttdDetails find(String detailId){
		return Ebean.find(MetAttdDetails.class, detailId);
	}
	
	public static void saveList(List<MetAttdDetails> details){
    	Ebean.save(details);
    }
	
	public static void updateList(List<MetAttdDetails> details){
		if(details != null && details.size() > 0){
			for(MetAttdDetails det:details){
				Ebean.update(det);
			}
		}
	}
	
	public static void deleteList(List<MetAttdDetails> details){
		Ebean.delete(details);
	}
}
