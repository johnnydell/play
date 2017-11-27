package common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileUtil {

	private static final Logger logger = LoggerFactory.getLogger(FileUtil.class);

	public static boolean saveFileToSpecificPath(String filePath, File file) {
		boolean result = false;
		
		File targetFile = new File(filePath);
		// check path if it's existed, if not, created

		File fileParent = targetFile.getParentFile();
		if (!fileParent.exists()) {
			result = fileParent.mkdirs();
		}
		else{
			//already existed.
			result = true;
		}
		// check if path created succeed.
		if (result) {
			// write file content
			try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file)); FileOutputStream fos = new FileOutputStream(targetFile); BufferedOutputStream bos = new BufferedOutputStream(fos);) {
				byte[] b = new byte[1024];
				while (bis.read(b) != -1) {
					bos.write(b);
				}
				result = true;
			} catch (IOException e) {
				result = false;
				logger.error("save file failed: " + e);
			}
		} else {
			logger.error("Create File path: " + fileParent.getPath() + " Error");
		}

		return result;
	}

}