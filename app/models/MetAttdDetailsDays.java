package models;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import play.db.ebean.Model;

@Entity
@Table(name = "edb_meeting_attendance_details_days")
public class MetAttdDetailsDays extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="meeting_attendance_details_id",insertable=false,updatable=false)
	public MetAttdDetails meetingAttendanceDetails;
	
	@Column(name = "meeting_attendance_details_id")
	public String meetingAttendanceDetailsId;
	
	@Column(name = "day_key")
	public String dayKey;
	
	@Column(name = "day_val")
	public String dayVal;
	
	@Column(name = "day_weekend")
	public String dayWeekend;

}
