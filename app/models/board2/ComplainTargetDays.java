package models.board2;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import play.db.ebean.Model;

@Entity
@Table(name = "edb_complain_target_days")
public class ComplainTargetDays extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="complain_id",insertable=false,updatable=false)
	public Complain complain;
	
	@Column(name = "complain_id")
	public String complainId;
	
	@Column(name = "day_key")
	public String dayKey;
	
	@Column(name = "day_val")
	public String dayVal;
	
	public static Finder<String, ComplainTargetDays> find = new Finder<String, ComplainTargetDays>(String.class, ComplainTargetDays.class);
	
	public static ComplainTargetDays findByDayKey(String complainId,String day_key){
		return find.where().eq("complain_id", complainId).eq("day_key", day_key).findUnique();
	}
}
