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
@Table(name = "edb_complain_actual_days")
public class ComplainActualDays extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="complain_id",insertable=false,updatable=false)
	public Complain complain;
	
	@Column(name = "complain_id")
	public String complainId;
	
	@ManyToOne
	@JoinColumn(name="type_id",insertable=false,updatable=false)
	public ComplainType type;
	
	@Column(name = "type_id")
	public String typeId;
	
	@Column(name = "day_key")
	public String dayKey;
	
	@Column(name = "day_val")
	public String dayVal;
}
