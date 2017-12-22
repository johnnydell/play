package controllers;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import common.Constants;
import common.util.FileUtil;
import models.OPL;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

public class OPLController extends Controller {
	
	private static Log logger = LogFactory.getLog(OPLController.class);
	
	private final static DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
	private final static DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

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
	public static Result getOPLByParamPagination(String line_id,String year,String month,String page,String pageSize) throws ParseException{
		List<OPL> oplList = OPL.getOPLByParamPagination(line_id,year,month,page,pageSize);
		if(oplList == null || oplList.size() == 0){
			oplList = new ArrayList<OPL>();
		}
		String str = JSON.toJSONString(oplList);
   	 	return ok(str);
	}

}
