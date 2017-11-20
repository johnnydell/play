package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

@Entity  
public class City extends Model {
	
	@Id
	public Integer ID;
	
	public String Name;
	
	public String countrycode;
	
	public String District;
	 	
	public Integer Population; 
	
	// Query
    public static Finder<Integer,City> find = 
            new Finder<Integer,City>(Integer.class, City.class);
    
    public static List<City> findAll() {
        return find.all();
    }
    
    public static City findByName (String name) {
        return find.where().eq("Name", name).findUnique();
    }
    
    public static void save(City city){
    	Ebean.save(city);
    }
	

}
