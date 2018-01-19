package controllers;

import java.io.File;
import java.io.UnsupportedEncodingException;
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
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;

public class UploaderController extends Controller {

	private final static Logger logger = LoggerFactory.getLogger(UploaderController.class);
	
	private final static DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
	private final static DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static Result uploadFile(String fileType) throws UnsupportedEncodingException {
		
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
					saveResult = FileUtil.copyFileToSpecificPath(filePath, file);
				
				if (saveResult) {
					//try save data into DB
					UploadFile uploadFile = new UploadFile();
					UploadFile uploadFile1 = UploadFile.findByName(fileType);
					boolean isExist = true;
					
					if (uploadFile1 == null){
						isExist = false;
					}
					
					String fileNameLastUpdate = prepareFileName(now, fileType, extension);
					logger.info("lastest file name = " + fileNameLastUpdate);
					//save
					uploadFile.fileName = fileType;
					uploadFile.fileNameLast = fileNameLastUpdate;
					uploadFile.lastUploadTime = now;
					uploadFile.active = true;
					if (!isExist)
						UploadFile.save(uploadFile);
					else{
						uploadFile.id = uploadFile1.id;
						UploadFile.updateBean(uploadFile);
					}
					
					UploadFileHistory fileHistory = new UploadFileHistory();
					fileHistory.fileName = fileNameLastUpdate;
					fileHistory.uploadFile = uploadFile;
					fileHistory.uploadTime = now;
					UploadFileHistory.save(fileHistory);
					
					json.put("result", "i18n_uploader_ok");
					json.put("info", "i18n_uploader_info_succeed");
				} else {
					json.put("result", "i18n_uploader_fail");
					json.put("info", "i18n_uploader_info_local_save_fail");
				}
			}
			else{
				json.put("result", "i18n_uploader_fail");
				json.put("info", "i18n_uploader_info_invalid_ext");
			}
			
		} else {
			json.put("result", "i18n_uploader_fail");
			json.put("info", "i18n_uploader_info_no_file");
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
			else if ("pss".equals(fileName)) {
				// blance excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_PSS );
				
			}
			else if ("oeepdca".equals(fileName)) {
				// blance excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_OEEPDCA );
				
			}
			else if ("5s".equals(fileName)) {
				// blance excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_5S );
				
			}
			else if ("trainmatrix".equals(fileName)) {
				// blance excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_MATRIX );
				
			}
			else if ("5m1e".equals(fileName)) {
				// blance excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_5M1E );
				
			}
			else if ("checklist".equals(fileName)) {
				// blance excel file
				buffer.append( Constants.STATIC_FILE_SAVE_PATH_14Q_CHKLIST );
				
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