package controllers;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import models.Func;
import bean.FuncEditor;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

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
	   JsonNode in = request().body().asJson();
	   ArrayList<FuncEditor> li = new ArrayList<FuncEditor>();
	   FuncEditor editor;
	   Iterator<JsonNode> a = in.iterator();
	   while(a.hasNext()){
		   JsonNode node = a.next();
		   editor = new FuncEditor();
		   editor.setId(node.get("id").toString());
		   editor.setModuleName(node.get("moduleName").toString());
		   editor.setFuncKey(node.get("funcKey").toString());
		   editor.setFuncName(node.get("funcName").toString());
		   editor.setActive(node.get("active").toString());
		   editor.setChecked(node.get("checked").toString());
		   editor.setUpdated(node.get("updated").toString());
		   li.add(editor);
	   }
	   
	   return ok("{a:'123'}");
   }

}
