package controllers;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

	public static Result uploadFile(String fileType) {
		MultipartFormData body = request().body().asMultipartFormData();
		FilePart filePart = body.getFile(fileType);

		if (filePart != null) {
			String fileName = filePart.getFilename();
			String contentType = filePart.getContentType();
			File file = filePart.getFile();
			logger.info("file name:" + fileName + ", contentType:" + contentType);
			String extension = fileName.substring(fileName.lastIndexOf("."));
			if ( extension.equalsIgnoreCase(".xls") || extension.equalsIgnoreCase(".xlsx") || extension.equalsIgnoreCase(".pdf") )
			{
				// try to save to server directory
				String filePath = prepareFilePath(fileType, extension);
				boolean saveResult = false;
				if (!"".equals(filePath))
					saveResult = FileUtil.saveFileToSpecificPath(filePath, file);
				
				if (saveResult) {
					Date now = new Date();
					//try save data into DB
					UploadFile uploadFile = UploadFile.findByName(fileType);
					if (uploadFile == null)
						uploadFile = new UploadFile();
					//save
					uploadFile.fileName = fileType;
					uploadFile.fileNameLast = prepareFileName(fileType, extension);
					uploadFile.lastUploadTime = now;
					uploadFile.active = true;
					UploadFile.save(uploadFile);
					
					UploadFileHistory fileHistory = new UploadFileHistory();
					fileHistory.fileName = prepareFileName(fileType, extension);
					fileHistory.uploadFile = uploadFile;
					fileHistory.uploadTime = now;
					UploadFileHistory.save(fileHistory);
					
					return ok("File uploaded");
				} else {
					flash("error", "File Save Fail.");
					return badRequest();
				}
			}
			else{
				flash("error", "Only accept Excel or PDF file.");
				return badRequest();
			}
			/*
			if (saveResult) {
				// check if it's excel file or PDF file
				if (fileName.toLowerCase().contains(".xls") || fileName.toLowerCase().contains(".xlsx")) {
					String pdfFileName = fileName.toLowerCase().contains(".xlsx") ? fileName.replace("xlsx", "html") : fileName.replaceAll("xls", "html");
					// need to convert to PDF first
					try {
						OfficeConverter.excelToHtml(filePath  File.separator  fileName, filePath  File.separator pdfFileName);
						return ok("File uploaded");
					} catch (Exception e) {
						logger.error(""  e);
						flash("error", "Convert to PDF Fail.");
						return badRequest();
					}
				}
				else{
					//skip converting, just return result
					return ok("File uploaded");
				}

			} else {
				flash("error", "File Save Fail.");
				return badRequest();
			}*/
		} else {
			flash("error", "Missing file");
			return badRequest();
		}
		
	}

	private static String prepareFilePath(String fileName, String extension) {
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
			buffer.append(prepareFileName(fileName, extension));
			
			result = buffer.toString() ;
		}
		
		return result;
	}
	
	private static String prepareFileName(String fileName, String extension){
		String result = "";
		Date now = new Date();
		StringBuffer buffer = new StringBuffer();
		buffer.append(fileName);
		buffer.append("_");
		buffer.append(df.format(now));
		buffer.append(extension);
		result = buffer.toString();
		return result;
	}

}