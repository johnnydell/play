package controllers;


import java.util.List;
import com.alibaba.fastjson.JSON;
import models.City;
import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class CityController extends Controller {

   @Transactional
   public static Result addCity() {
    	City  c1 = new City();
    	c1.ID = 14;
    	c1.Name = "dell";
    	c1.District = "1";
    	c1.Population = 1;
    	c1.countrycode = "12";
    	City  c2 = new City();
    	c2.ID = 14;
    	c2.Name = "vicky";
    	c2.District = "1";
    	c2.Population = 1;
    	c2.countrycode = "12";
    	c1.save();
    	c2.save();
    	return ok("saved");
    	
    }
    
   public static Result allCities() {
        List<City> cities = City.findAll();
        String str = JSON.toJSONString(cities);
        return ok(str);
    }
    
    public static Result show() {  
    	City city = City.findByName("Herat");  
    	String str = JSON.toJSONString(city);
    	 return ok(str);
    }  

}
