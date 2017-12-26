package models.settings;

import java.util.Date;
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

import models.ProductLine;
import play.db.ebean.Model;

@Entity
@Table(name = "edb_hourly_count_base")
public class HCConfigBase extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name="product_line_id")
	public ProductLine productLine;
	
	@Column(name = "product_line_id")
	public String line_id;

	@Column(name = "product_date")
	public Date productDate;
	
	@Column(name = "team_leader_sign_1")
	public String teamLeaderSign1;

	@Column(name = "team_leader_sign_2")
	public String teamLeaderSign2;
	
	@Column(name = "team_leader_sign_3")
	public String teamLeaderSign3;
	
	@Column(name = "group_leader_sign")
	public String groupLeaderSign;
	
	@Column(name = "target_oee_percent")
	public Double targetOeePercent;
	
	@Column(name = "plan_opl_total_output")
	public Integer planOplTotalOutput;
	
	@Column(name = "target_oee_total_output")
	public Integer targetOeeTotalOutput;
	
	@Column(name = "actual_oee_total_output")
	public Integer actualOeeTotalOutput;
	
	//自定义放置明细
    public List<HCConfigDetail> hcConfigDetail; 

	public static Finder<String, HCConfigBase> find = new Finder<String, HCConfigBase>(String.class, HCConfigBase.class);
	
	public static HCConfigBase getHCConfigBaseByParams(String line_id,String date){
		return find.where().eq("product_line_id", line_id).eq("product_date", date).findUnique();
	}
}