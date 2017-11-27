package common;

public class Constants {
	
	public static String CTX_PATH = "";
	
	public static String INDEX_PATH = CTX_PATH+ "/edashboard/views/index.html";
	
	public static String STATIC_FILE_SAVE_PATH = play.Play.application().configuration().getString("file.save.path");

	public static String STATIC_FILE_SAVE_PATH_LAYOUT = play.Play.application().configuration().getString("file.path.layout");

	public static String STATIC_FILE_SAVE_PATH_BALANCE = play.Play.application().configuration().getString("file.path.balance");

}
