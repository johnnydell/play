package controllers;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.Constants;
import common.util.OfficeConverter;
import models.UploadFile;
import play.mvc.Controller;
import play.mvc.Result;

public class StaticPageController extends Controller {

	private final static Logger logger = LoggerFactory.getLogger(StaticPageController.class);

	public static Result viewFileByName(String fileName, String oplLinkName) {
		String latestFileName = "";
		boolean isExist = false;
		if ("pss".equals(fileName) || "pss2".equals(fileName)) {
			latestFileName = oplLinkName;
			isExist = true;
		} else {
			UploadFile uploadFile = UploadFile.findByName(fileName);
			if (null != uploadFile){
				latestFileName = uploadFile.fileNameLast;
				isExist = true;
			}
		}
		if (isExist){
			// try to find this file in local path
			String filePath = prepareFilePath(fileName, latestFileName);
			String contextFilePath = prepareContextFilePath(fileName, latestFileName);
			String pdfFilePath = "";
			// check if it's excel file or pdf file
			if (!fileName.toLowerCase().contains("pdf")) {
				// try to check if excel file existed or not
				File excelFile = new File(filePath);
				if (excelFile.exists()) {
					// need to convert it to pdf first
					int index = filePath.lastIndexOf(".");
					pdfFilePath = filePath.substring(0, index) + ".pdf";

					index = contextFilePath.lastIndexOf(".");
					contextFilePath = contextFilePath.substring(0, index) + ".pdf";

					logger.info("pdfPath : = " + pdfFilePath);
					File file = new File(pdfFilePath);
					if (!file.exists()) {
						try {

							OfficeConverter.excelToPdf(filePath, pdfFilePath);

							return ok(contextFilePath);
						} catch (Exception e) {
							logger.error("" + e);
							// prepare json format
							return ok(contextFilePath);
						}
					} else {
						return ok(contextFilePath);
					}
				} else {
					return ok("0");
				}
			} else {

				return ok(contextFilePath);
			}
		}
		else{
			return ok("0");
		}
		
	}

	private static String prepareFilePath(String fileType, String fileName) {
		String result = "";
		StringBuffer buffer = new StringBuffer();
		// buffer.append("/edashboard").append(File.separator);
		buffer.append(Constants.STATIC_FILE_SAVE_PATH);

		if (null != fileName && null != fileType) {
			// check file name
			if ("layout".equals(fileType)) {
				// layout excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_LAYOUT);

			} else if ("balance".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_BALANCE);

			} else if ("pss".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_PSS);

			}  else if ("pss2".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_PSS2);

			}  else if ("oeepdca".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_OEEPDCA);

			} else if ("5s".equals(fileType) ) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_5S);

			} else if ("trainmatrix".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_MATRIX);

			} else if ("5m1e".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_5M1E);

			}
			buffer.append(File.separator);
			buffer.append(fileName);

			result = buffer.toString();
		}

		return result;
	}

	private static String prepareContextFilePath(String fileType, String fileName) {
		String result = "";
		StringBuffer buffer = new StringBuffer();

		if (null != fileName && null != fileType) {
			// check file name
			if ("layout".equals(fileType)) {
				// layout excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_LAYOUT);

			} else if ("balance".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_BALANCE);

			} else if ("pss".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_PSS);

			} else if ("pss2".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_PSS2);

			} else if ("oeepdca".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_OEEPDCA);

			} else if ("5s".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_5S);

			} else if ("trainmatrix".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_MATRIX);

			} else if ("5m1e".equals(fileType)) {
				// blance excel file
				buffer.append(Constants.STATIC_FILE_SAVE_PATH_5M1E);

			}
			buffer.append(File.separator);
			buffer.append(fileName);

			result = buffer.toString();
		}

		return result;
	}

}