package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
	public Integer id;

	@Column(name = "file_name")
	public String fileName;

	@Column(name = "upload_time")
	public Date uploadTime;

	@ManyToOne
	public UploadFile uploadFile;

	public static Finder<Integer, UploadFileHistory> find = new Finder<Integer, UploadFileHistory>(Integer.class, UploadFileHistory.class);

	public static List<UploadFileHistory> findByName(String name) {
		return find.where().ilike("fileName", "%" + name + "%").findList();
	}

	public static void save(UploadFileHistory uploadFileHistory) {
		Ebean.save(uploadFileHistory);
	}

}