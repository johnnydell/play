package models.board2;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import models.ProductLine;

import org.apache.commons.lang3.StringUtils;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.ExpressionList;
import com.avaje.ebean.Page;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_opl2")
public class OPL extends Model {
	
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");
	
	@ManyToOne
	@JoinColumn(name = "line_id",insertable=false,updatable=false)
	public ProductLine productLine;
	
	@Column(name = "line_id")
	public String lineId;
	
	@Column(name = "date")
	public String date;
	
	@Column(name="founder")
	public String founder;
	
	@Column(name = "ref_no")
	public String refNo;
	
	@Column(name = "station")
	public String station;
	
	@Column(name = "description")
	public String description;
	
	@Column(name = "start")
	public String start;
	
	@Column(name = "end")
	public String end;
	
	@Column(name = "timing")
	public String timing;
	
	@Column(name = "amount")
	public String amount;
	
	@Column(name = "root_cause")
	public String rootCause;
	
	@Column(name = "immediate")
	public String immediate;
	
	@Column(name = "long_term")
	public String longTerm;
	
	@Column(name = "problem_solve")
	public String problemSolve;
	
	@Column(name = "pss_id")
	public String pss_id;
	
	@ManyToOne
	@JoinColumn(name = "pss_id",insertable=false,updatable=false)
	public OPLPSS pss;
	
	@Column(name = "owner")
	public String owner;
	
	@Column(name = "deadline")
	public String deadline;
	
	@Column(name = "status")
	public String status;
	
	@Column(name = "create_time")
	public String createTime;

	public static Finder<String, OPL> find = new Finder<String, OPL>(String.class, OPL.class);
		
	public static Page<OPL> getOPLByParamPagination(String line_id,String year,String month,String status,String page,String pageSize){
		ExpressionList<OPL> eLi = find.where().eq("line_id", line_id).between("date", year+"-"+month+"-01",  year+"-"+month+"-31");
		if(StringUtils.isNotBlank(status)){
			eLi.eq("status", status);
		}
		Page<OPL> pagination = eLi.orderBy("createTime desc").fetch("pss").
				findPagingList(Integer.parseInt(pageSize)).setFetchAhead(false).getPage(Integer.parseInt(page)-1);
		return pagination;
	}
	
	public static OPL find(String id){
		return Ebean.find(OPL.class, id);
	}
	
	public static void saveList(List<OPL> li){
    	Ebean.save(li);
    }
	
	public static void updateList(List<OPL> li){
		if(li != null && li.size() > 0){
			for(OPL opl:li){
				Ebean.update(opl);
			}
		}
	}
	
	public static void deleteList(List<OPL> li){
		Ebean.delete(li);
	}
}
