package models;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_opl_pss")
public class OPLPSS extends Model {

	private static final long serialVersionUID = 1L;
	
	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@Column(name = "opl_id")
	public String oplId;
	
	@Column(name = "file_name")
	public String fileName;
	
	@Column(name = "file_real_name")
	public String fileRealName;
	
	@Column(name = "create_time")
	public String createTime;
	
	public static Finder<String, OPLPSS> find = new Finder<String, OPLPSS>(String.class, OPLPSS.class);
	
	public static OPLPSS find(String id){
		return Ebean.find(OPLPSS.class, id);
	}
	
	public static void save(OPLPSS pss){
		Ebean.save(pss);
	}
	
	public static void update(OPLPSS pss){
		Ebean.update(pss);
	}
	
	public static List<OPLPSS> getListByOPLId(String oplId){
		return find.where().eq("opl_id", oplId).order("createTime desc").findList();
	}
}
