package models;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_oee_lose_type")
public class OeeLossType extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	

	@Column(name = "loss_type_name")
	public String lossTypeName;

	@Column(name = "active")
	public Boolean active;

	public static Finder<String, OeeLossType> find = new Finder<String, OeeLossType>(String.class, OeeLossType.class);

	public static OeeLossType findByName(String name) {
		return find.where().eq("lossTypeName", name).findUnique();
	}
	
	public static OeeLossType findById(String id){
		return find.where().eq("id", id).findUnique();
	}

	public static void save(OeeLossType oeeLossType) {
		Ebean.save(oeeLossType);
	}

}