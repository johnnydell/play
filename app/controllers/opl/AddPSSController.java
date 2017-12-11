package controllers.opl;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.alibaba.fastjson.JSONObject;
import common.Constants;
import common.util.FileUtil;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;

public class AddPSSController extends Controller {

	private final static Logger logger = LoggerFactory.getLogger(AddPSSController.class);
	
	private final static DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
	private final static DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static Result uploadFile() {
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
				saveResult = FileUtil.saveFileToSpecificPath(filePath, file);
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
		String filePrefix = fileName.substring(0, fileName.lastIndexOf("."));
		String extension = fileName.substring(fileName.lastIndexOf("."));
		buffer.append(filePrefix);
		buffer.append("_");
		buffer.append(df.format(now));
		buffer.append(extension);
		result = buffer.toString();
		return result;
	}

}