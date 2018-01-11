package models.board2;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity
@Table(name = "edb_complain_type")
public class ComplainType extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	public String id = UUID.randomUUID().toString().replace("-", "");

	@Column(name = "type_name")
	public String typeName;

	@Column(name = "index")
	public String index;

	public static Finder<String, ComplainType> find = new Finder<String, ComplainType>(
			String.class, ComplainType.class);
	
	public static List<ComplainType> getAllList() {
        return find.findList();
	}
	
	public static void saveList(List<ComplainType> li){
    	Ebean.save(li);
    }
	
	public static void updateList(List<ComplainType> li){
		if(li != null && li.size() > 0){
			for(ComplainType type:li){
				Ebean.update(type);
			}
		}
	}
	
	public static ComplainType find(String id){
		return Ebean.find(ComplainType.class, id);
	}
	
	public static void deleteList(List<ComplainType> li){
		Ebean.delete(li);
	}

	public static void save(ComplainType complainType) {
		Ebean.save(complainType);
	}

	public static void update(ComplainType complainType) {
		Ebean.update(complainType);
	}

}