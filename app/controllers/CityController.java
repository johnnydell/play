package controllers;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;

import models.City;
import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class CityController extends Controller {

   @Transactional
   public static Result addCity() {
	    List<City> cities = new ArrayList<City>();
		City  c1 = new City();
		//c1.ID = 20;
		c1.Name = "dell";
		c1.District = "1";
		c1.Population = 1;
		c1.countrycode = "12";
		City  c2 = new City();
		//c2.ID = 19;
		c2.Name = "vicky";
		c2.District = "1";
		c2.Population = 1;
		c2.countrycode = "12";
		cities.add(c1);
		cities.add(c2);
		City.saveList(cities);
		return ok("saved");
    }
   
   @Transactional
   public static Result addCity2(String id,String name) {
		City  c1 = new City();
		c1.ID = id;
		c1.Name =name;
		c1.District = "1";
		c1.Population = 1;
		c1.countrycode = "12";
		City.save(c1);
		return ok("saved");
    }
   
   @Transactional
   public static Result addCity3() {
	    Map parameters = request().body().asFormUrlEncoded();
	    String id = ((String[]) parameters.get("id"))[0];
	    String name = ((String[]) parameters.get("name"))[0];
		return ok("saved");
    }
   
   @Transactional
   public static Result addCity4() {
	    JsonNode node = request().body().asJson();
	    String id = node.get("id").asText();
	    String name = node.get("name").asText();
		return ok("saved");
    }
    
   public static Result allCities() {
        List<City> cities = City.findAll();
        String str = JSON.toJSONString(cities);
        return ok(str);
    }
    
    public static Result show(String key) {  
    	City city = City.findByName("Herat");  
    	session("connected",key);
    	String str = JSON.toJSONString(city);
    	 return ok(str);
    } 
    
    public static Result set() {    
    	 return ok(session().get("connected") == null ? "":session().get("connected"));
    } 

}
