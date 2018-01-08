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

}