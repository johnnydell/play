package models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_oee_loss_child_type")
public class OeeLossChildType extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="lose_type_id")
	public OeeLossType oeeLossType;

	@Column(name = "sub_lose_type_name")
	public String subLoseTypeName;

	@Column(name = "sub_lose_type_code")
	public String subLoseTypeCode;

	@Column(name = "active")
	public Boolean active;
	
	@Transient
	public List<OeeLossChildChildType> subSubTypes = new ArrayList<OeeLossChildChildType>();

	public static Finder<String, OeeLossChildType> find = new Finder<String, OeeLossChildType>(String.class, OeeLossChildType.class);

	public static OeeLossChildType findByName(String name) {
		return find.where().eq("subLoseTypeName", name).findUnique();
	}
	
	public static OeeLossChildType findById(String id){
		return find.where().eq("id", id).findUnique();
	}

	public static void save(OeeLossChildType oeeLossChildType) {
		Ebean.save(oeeLossChildType);
	}

}