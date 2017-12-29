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
import com.avaje.ebean.SqlRow;

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
	
	public static List<OeeLossChildChildType> findAll() {
		return find.all();
	}
	
	public static List<SqlRow> findAllBySql() {
		String sql = "select t.id as loss_id, t.loss_type_name as loss_name, ct.id as sub_loss_id, ct.sub_lose_type_name as sub_loss_name, " 
				+ " ct.sub_lose_type_code, cct.id as sub_sub_loss_id, cct.loss_type_name as sub_sub_loss_name, cct.loss_type_code  "
				+ " from edb_oee_lose_type t  "
				+ " left join edb_oee_loss_child_type ct on t.id = ct.lose_type_id  "
				+ " left join edb_oee_loss_child_child_type cct on ct.id = cct.loss_child_type_id";
		List<SqlRow> rows =	Ebean.createSqlQuery(sql).findList();
		return rows;
	}

	public static void save(OeeLossChildChildType oeeLossChildChildType) {
		Ebean.save(oeeLossChildChildType);
	}

}