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
@Table(name = "edb_upload_file_history")
public class UploadFileHistory extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@Column(name = "file_name")
	public String fileName;

	@Column(name = "upload_time")
	public Date uploadTime;

	@ManyToOne
	@JoinColumn(name="upload_file_id")
	public UploadFile uploadFile;
	
	@ManyToOne
	@JoinColumn(name="opl_id")
	public Opl opl;

	public static Finder<String, UploadFileHistory> find = new Finder<String, UploadFileHistory>(String.class, UploadFileHistory.class);

	public static List<UploadFileHistory> findByName(String name) {
		return find.where().ilike("fileName", "%" + name + "%").findList();
	}

	public static void save(UploadFileHistory uploadFileHistory) {
		Ebean.save(uploadFileHistory);
	}

}