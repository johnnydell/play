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
