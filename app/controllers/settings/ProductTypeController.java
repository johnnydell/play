package controllers.settings;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import models.ProductType;
import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;
import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class ProductTypeController extends Controller {
 
	/**
	 * 返回激活的产品类型列表
	 * @return
	 */
   public static Result getList() {
        List<ProductType> types = ProductType.getList();
        String str = JSON.toJSONString(types);
        return ok(str);
   }
   
   /**
    * 保存types
    * @return
    */
   @Transactional
   public static Result saveType(){
	   JsonNode in = request().body().asJson();
	   
	   //保存新增部分
	   JsonNode addType = in.get("addType");
	   ArrayList<ProductType> addTypeLi = new ArrayList<ProductType>();
	   Iterator<JsonNode> a = addType.iterator();
	   while(a.hasNext()){
			JsonNode node = a.next();
		    String name = node.get("name").asText();
		    String cycle_time = node.get("cycle_time").asText();
		    String persons = node.get("persons").asText();
		    String plan_output = node.get("plan_output").asText();
		    String target_output = node.get("target_output").asText();
		    
		    ProductType type = new ProductType();
		    type.productTypeName = name;
		    type.cycle = cycle_time;
		    type.persons = persons;
		    type.planOutput = plan_output;
		    type.targetOutput = target_output;
		    type.active = true;
		    addTypeLi.add(type);
		}
		
		if(addTypeLi.size() > 0){
			ProductType.saveList(addTypeLi);
		} 
		
		//保存更新部分
    	JsonNode updateType = in.get("updateType");
    	ArrayList<ProductType> updateTypeLi = new ArrayList<ProductType>();
		Iterator<JsonNode> b = updateType.iterator();
		while(b.hasNext()){
			JsonNode node = b.next();
			String id = node.get("id").asText();
			String name = node.get("name").asText();
		    String cycle_time = node.get("cycle_time").asText();
		    String persons = node.get("persons").asText();
		    String plan_output = node.get("plan_output").asText();
		    String target_output = node.get("target_output").asText();
		    
		    ProductType type = new ProductType();
		    type.id = id;
		    type.productTypeName = name;
		    type.cycle = cycle_time;
		    type.persons = persons;
		    type.planOutput = plan_output;
		    type.targetOutput = target_output;
		    type.active = true;		    
		    updateTypeLi.add(type);
		}
		
		if(updateTypeLi.size() > 0){
			ProductType.updateList(updateTypeLi);
		}
		
		return ok("{\"add\":\""+addTypeLi.size()+"\",\"update\":\""+updateTypeLi.size()+"\"}");	   
   }
   
   /**
	 * 删除
	 * @return
	 */
	@Transactional
	public static Result deleteType(){
		JsonNode in = request().body().asJson();
		JsonNode deletedType = in.get("deletedType");
		ArrayList<ProductType> deletedTypeLi = new ArrayList<ProductType>();
		Iterator<JsonNode> b = deletedType.iterator();
		while(b.hasNext()){
			 JsonNode node = b.next();
			 String id = node.get("id").asText();
			 ProductType type = ProductType.find(id);
			 type.active = false;
			 deletedTypeLi.add(type);
		}
		
		if(deletedTypeLi.size() > 0){
			ProductType.updateList(deletedTypeLi);
		}
		return ok("{\"delete\":\""+deletedTypeLi.size()+"\"}");
	}
}
