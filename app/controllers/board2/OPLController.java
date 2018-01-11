package controllers.board2;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.avaje.ebean.Page;
import com.fasterxml.jackson.databind.JsonNode;

import common.Constants;
import common.util.FileUtil;
import models.OPL;
import models.OPLPSS;
import models.ProductLine;
import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

public class OPLController extends Controller {
	
	private static Log logger = LogFactory.getLog(OPLController.class);
	
	private final static DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
	private final static DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static Result getListByOPLId(String opl_id){
	   List<OPLPSS> pssLi = OPLPSS.getListByOPLId(opl_id);
       String str = JSON.toJSONString(pssLi);
       return ok(str);
	}
	
	public static Result addPSS() {
		JSONObject json = new JSONObject();
		MultipartFormData body = request().body().asMultipartFormData();
		FilePart filePart = body.getFile("file");
		Date now = new Date();
		json.put("last_update_time", df1.format(now));
		if (filePart != null) {
			String fileName = filePart.getFilename();
			File file = filePart.getFile();		
			// try to save to server directory
			StringBuffer buffer = new StringBuffer();
			buffer.append(Constants.STATIC_FILE_SAVE_PATH);
			buffer.append( Constants.STATIC_FILE_SAVE_PATH_PSS );
			buffer.append(File.separator);
			String newFileName = prepareFileName(now, fileName);
			buffer.append(newFileName);
			String filePath = buffer.toString();
			boolean saveResult = false;
			if (!"".equals(filePath))
				logger.info("trigger uploading to physic path");
				saveResult = FileUtil.copyFileToSpecificPath(filePath, file);
			if (saveResult) {				
				json.put("result", "OK");
				json.put("newFileName", newFileName);
				json.put("fileRealName", fileName);
				json.put("info", "upload file Succeed!");
			} else {
				json.put("result", "FAIL");
				json.put("info", "Upload file Failed: Cannot save to Local directory. ");
			}			
		} else {
			json.put("result", "FAIL");
			json.put("info", "Upload file Failed: there's no file detected.");
		}
		return ok(json.toJSONString());
	}
	
	private static String prepareFileName(Date now, String fileName){
		String result = "";
		StringBuffer buffer = new StringBuffer();
		String extension = fileName.substring(fileName.lastIndexOf("."));
		buffer.append("pss_");
		buffer.append(df.format(now));
		buffer.append(extension);
		result = buffer.toString();
		return result;
	}
	
	/**
	 * 根据分页等参数条件获取OPL信息
	 * @param line_id
	 * @param year
	 * @param month
	 * @param page
	 * @param pageSize
	 * @return
	 * @throws ParseException
	 */
	public static Result getOPLByParamPagination(String line_id,String year,String month,String status,String page,String pageSize) throws ParseException{
		Page<OPL> pagination = OPL.getOPLByParamPagination(line_id,year,month,status,page,pageSize);
		Integer pageCnt = pagination.getTotalPageCount();
		List<OPL> oplList = pagination.getList();
		ProductLine line = ProductLine.findById(line_id);
		if(oplList == null || oplList.size() == 0){
			oplList = new ArrayList<OPL>();
		}
		String data = JSON.toJSONString(oplList);
		String lineStr = JSON.toJSONString(line);
   	 	return ok("{\"line\":"+lineStr+",\"pageCnt\":"+pageCnt+",\"data\":"+data+"}");
	}
	
	/**
	 * 保存opl的详细信息
	 * @return
	 */
	@Transactional
    public static Result saveOPL(){
    	JsonNode in = request().body().asJson();
    	JsonNode condition = in.get("condition");
    	String lineId = condition.get("line_id").asText();
    	
    	//保存新增部分opl
    	JsonNode addOPL = in.get("addOPL");
    	ArrayList<OPL> addOPLLi = new ArrayList<OPL>();
		Iterator<JsonNode> a = addOPL.iterator();
		while(a.hasNext()){
			JsonNode node = a.next();
		    String date = node.get("date").asText();
		    String refNo = node.get("refNo").asText();
		    String founder = node.get("founder").asText();
		    String station = node.get("station").asText();
		    String description = node.get("description").asText();
		    String dtFrom = node.get("dtFrom").asText();
		    String dtTo = node.get("dtTo").asText();
		    String timing = node.get("timing").asText();
		    String amt = node.get("amt").asText();
		    String rootCause = node.get("rootCause").asText();
		    String immediate = node.get("immediate").asText();
		    String longTerm = node.get("longTerm").asText();
		    String problemSolvingSheet = node.get("problemSolvingSheet").asText();
		    JsonNode pssJson = node.get("pss");
		    String responsible = node.get("responsible").asText();
		    String deadline = node.get("deadline").asText();
		    String status = node.get("status").asText();
		    
		    OPL opl = new OPL();
		    opl.amount = amt;
		    opl.createTime = df1.format(new Date());
			opl.date = date;
			opl.deadline = deadline;
			opl.description = description;
			opl.start = dtFrom;
			opl.end = dtTo;
			opl.founder = founder;
			opl.immediate = immediate;
			opl.lineId = lineId;
			opl.longTerm = longTerm;
			opl.owner = responsible;
			opl.problemSolve = problemSolvingSheet;
			
			String file_name = pssJson.get("file_name").asText();
			String file_real_name = pssJson.get("file_real_name").asText();
			String create_time = pssJson.get("create_time").asText();
			boolean has = pssJson.get("has").asBoolean();
			if(opl.problemSolve.equals("Y") && has){
				OPLPSS pss = new OPLPSS();
				pss.oplId = opl.id;
				pss.fileName = file_name;
				pss.fileRealName = file_real_name;
				pss.createTime = create_time;
				OPLPSS.save(pss);
				opl.pss_id = pss.id;
			}
			opl.refNo = refNo;
			opl.rootCause = rootCause;
			opl.station = station;
			opl.status = status;
			opl.timing = timing;
			addOPLLi.add(opl);
		}
		
		if(addOPLLi.size() > 0){
			OPL.saveList(addOPLLi);
		}
		
		//保存更新部分opl
    	JsonNode updateOPL = in.get("updateOPL");
    	ArrayList<OPL> updateOPLLi = new ArrayList<OPL>();
		Iterator<JsonNode> b = updateOPL.iterator();
		while(b.hasNext()){
			JsonNode node = b.next();
			String id = node.get("id").asText();
		    String date = node.get("date").asText();
		    String refNo = node.get("refNo").asText();
		    String founder = node.get("founder").asText();
		    String station = node.get("station").asText();
		    String description = node.get("description").asText();
		    String dtFrom = node.get("dtFrom").asText();
		    String dtTo = node.get("dtTo").asText();
		    String timing = node.get("timing").asText();
		    String amt = node.get("amt").asText();
		    String rootCause = node.get("rootCause").asText();
		    String immediate = node.get("immediate").asText();
		    String longTerm = node.get("longTerm").asText();
		    String problemSolvingSheet = node.get("problemSolvingSheet").asText();
		    JsonNode pssJson = node.get("pss");
		    String responsible = node.get("responsible").asText();
		    String deadline = node.get("deadline").asText();
		    String status = node.get("status").asText();
		    
		    OPL opl = OPL.find(id);
		    opl.amount = amt;
			opl.date = date;
			opl.deadline = deadline;
			opl.description = description;
			opl.start = dtFrom;
			opl.end = dtTo;
			opl.founder = founder;
			opl.immediate = immediate;
			opl.lineId = lineId;
			opl.longTerm = longTerm;
			opl.owner = responsible;
			opl.problemSolve = problemSolvingSheet;
			
			String pss_id = pssJson.get("id").asText();
			String file_name = pssJson.get("file_name").asText();
			String file_real_name = pssJson.get("file_real_name").asText();
			String create_time = pssJson.get("create_time").asText();
			boolean has = pssJson.get("has").asBoolean();
			if(opl.problemSolve.equals("Y") && has){
				OPLPSS pss = new OPLPSS();
				if(pss_id.equals("0")){			
					pss.oplId = opl.id;
					pss.fileName = file_name;
					pss.fileRealName = file_real_name;
					pss.createTime = create_time;
					OPLPSS.save(pss);
					pss_id = pss.id;
				} 
				opl.pss_id = pss_id;
			} else {
				opl.pss_id = null;
			}			
			opl.refNo = refNo;
			opl.rootCause = rootCause;
			opl.station = station;
			opl.status = status;
			opl.timing = timing;
			updateOPLLi.add(opl);
		}
		
		if(updateOPLLi.size() > 0){
			OPL.updateList(updateOPLLi);
		}
		return ok("{\"add\":\""+addOPLLi.size()+"\",\"update\":\""+updateOPLLi.size()+"\"}");
    }
	
	/**
	 * 删除opl记录
	 * @return
	 */
	@Transactional
	public static Result deleteOPL(){
		JsonNode in = request().body().asJson();
		JsonNode deletedOPL = in.get("deletedOPL");
		ArrayList<OPL> deletedOPLLi = new ArrayList<OPL>();
		Iterator<JsonNode> b = deletedOPL.iterator();
		while(b.hasNext()){
			 JsonNode node = b.next();
			 String id = node.get("id").asText();
			 OPL opl = OPL.find(id);
			 deletedOPLLi.add(opl);
		}
		
		if(deletedOPLLi.size() > 0){
			OPL.deleteList(deletedOPLLi);
		}
		return ok("{\"delete\":\""+deletedOPLLi.size()+"\"}");
	}

}
