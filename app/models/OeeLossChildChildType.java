package models;

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
@Table(name = "edb_oee_loss_child_child_type")
public class OeeLossChildChildType extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="loss_child_type_id")
	public OeeLossChildType oeeLossChildType;

	@Column(name = "loss_type_name")
	public String lossTypeName;

	@Column(name = "loss_type_code")
	public String lossTypeCode;

	@Column(name = "active")
	public Boolean active;

	public static Finder<String, OeeLossChildChildType> find = new Finder<String, OeeLossChildChildType>(String.class, OeeLossChildChildType.class);

	public static List<OeeLossChildChildType> findByChildName(String name) {
		return find.where().eq("oeeLossChildType.subLoseTypeCode", name).findList();
	}
	
	public static OeeLossChildChildType findByChildChildName(String name) {
		return find.where().eq("lossTypeName", name).findUnique();
	}
	
	public static OeeLossChildChildType findById(String id){
		return find.where().eq("id", id).findUnique();
	}

	public static void save(OeeLossChildChildType oeeLossChildChildType) {
		Ebean.save(oeeLossChildChildType);
	}

}