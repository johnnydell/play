package models;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_upload_file")
public class UploadFile extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@Column(name = "file_name")
	public String fileName;

	@Column(name = "file_name_last")
	public String fileNameLast;

	@Column(name = "last_upload_time")
	public Date lastUploadTime;

	@Column(name = "active")
	public Boolean active;

	public static Finder<String, UploadFile> find = new Finder<String, UploadFile>(String.class, UploadFile.class);

	public static UploadFile findByName(String name) {
		return find.where().ilike("fileName", "%" + name + "%").findUnique();
	}
	
	public static List<UploadFile> findAll() {
		return find.all();
	}

	public static void save(UploadFile uploadFile) {
		Ebean.save(uploadFile);
	}

	public static void updateBean(UploadFile uploadFile) {
		Ebean.update(uploadFile);
		
	}
}