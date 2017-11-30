package controllers;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;

import common.Constants;
import common.util.FileUtil;
import models.UploadFile;
import models.UploadFileHistory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;

public class UploaderController extends Controller {

	private final static Logger logger = LoggerFactory.getLogger(UploaderController.class);
	
	private final static DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
	private final static DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static Result uploadFile(String fileType) {
		JSONObject json = new JSONObject();
		MultipartFormData body = request().body().asMultipartFormData();
		FilePart filePart = body.getFile(fileType);
		Date now = new Date();
		json.put("last_update_time", df1.format(now));
		if (filePart != null) {
			String fileName = filePart.getFilename();
			String contentType = filePart.getContentType();
			File file = filePart.getFile();
			logger.info("file name:" + fileName + ", contentType:" + contentType);
			String extension = fileName.substring(fileName.lastIndexOf("."));
			if ( extension.equalsIgnoreCase(".xls") || extension.equalsIgnoreCase(".xlsx") || extension.equalsIgnoreCase(".pdf") || extension.equalsIgnoreCase(".xlsm") )
			{
				// try to save to server directory
				String filePath = prepareFilePath(now, fileType, extension);
				boolean saveResult = false;
				if (!"".equals(filePath))
					saveResult = FileUtil.saveFileToSpecificPath(filePath, file);
				
				if (saveResult) {
					//try save data into DB
					UploadFile uploadFile = UploadFile.findByName(fileType);
					if (uploadFile == null)
						uploadFile = new UploadFile();
					//save
					uploadFile.fileName = fileType;
					uploadFile.fileNameLast = prepareFileName(now, fileType, extension);
					uploadFile.lastUploadTime = now;
					uploadFile.active = true;
					UploadFile.save(uploadFile);
					
					UploadFileHistory fileHistory = new UploadFileHistory();
					fileHistory.fileName = uploadFile.fileNameLast;
					fileHistory.uploadFile = uploadFile;
					fileHistory.uploadTime = now;
					UploadFileHistory.save(fileHistory);
					
					json.put("result", "OK");
					json.put("info", "upload file " + fileType + " Succeed!");
				} else {
					json.put("result", "FAIL");
					json.put("info", "Upload file " + fileType + " Failed: Cannot save to Local directory. ");
				}
			}
			else{
				json.put("result", "FAIL");
				json.put("info", "Upload file " + fileType + " Failed: Only accept [xls], [xlsx] and [pdf] files.");
			}
			
		} else {
			json.put("result", "FAIL");
			json.put("info", "Upload file " + fileType + " Failed: there's no file detected.");
		}
		return ok(json.toJSONString());
	}

	private static String prepareFilePath(Date now, String fileName, String extension) {
		String result = "";
		StringBuffer buffer = new StringBuffer();
		buffer.append(Constants.STATIC_FILE_SAVE_PATH);
		
		if (null != fileName) {
			// check file name
			if ("layout".equals(fileName)) {
				// layout excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_LAYOUT );
				
			}
			else if ("balance".equals(fileName)) {
				// blance excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_BALANCE );
				
			}
			
			buffer.append(File.separator);
			buffer.append(prepareFileName(now, fileName, extension));
			
			result = buffer.toString() ;
		}
		
		return result;
	}
	
	private static String prepareFileName(Date now, String fileName, String extension){
		String result = "";
		StringBuffer buffer = new StringBuffer();
		buffer.append(fileName);
		buffer.append("_");
		buffer.append(df.format(now));
		buffer.append(extension);
		result = buffer.toString();
		return result;
	}

}