package controllers;


import java.util.List;

import models.Func;

import com.alibaba.fastjson.JSON;

import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;

public class FuncController extends Controller {
 
   public static Result getList() {
        List<Func> funcs = Func.getList();
        String str = JSON.toJSONString(funcs);
        return ok(str);
    }
   
   public static Result saveFunc(){
	   RequestBody  rb = request().body();
	   return ok("{a:'123'}");
   }

}
