package models;

import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity  
public class City extends Model {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String ID = UUID.randomUUID().toString().replace("-", "");
	
	public String Name;
	
	public String countrycode;
	
	public String District;
	 	
	public Integer Population; 
	
	// Query
    public static Finder<String,City> find = 
            new Finder<String,City>(String.class, City.class);
    
    public static List<City> findAll() {
        return find.all();
    }
    
    public static City findByName (String name) {
        return find.where().eq("Name", name).findUnique();
    }
    
    public static void save(City city){
    	Ebean.save(city);
    }
    
    public static void saveList(List<City> cities){
    	Ebean.save(cities);
    }
	

}
