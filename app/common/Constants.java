package common;

public class Constants {
	
	public static String CTX_PATH = "";
	
	public static String INDEX_PATH = CTX_PATH+ "/edashboard/views/index.html";
	
	public static String STATIC_FILE_SAVE_PATH = play.Play.application().configuration().getString("file.save.path");

	public static String STATIC_FILE_SAVE_PATH_LAYOUT = play.Play.application().configuration().getString("file.path.layout");

	public static String STATIC_FILE_SAVE_PATH_BALANCE = play.Play.application().configuration().getString("file.path.balance");
	
	public static String STATIC_FILE_SAVE_PATH_PSS = play.Play.application().configuration().getString("file.path.pss");
	
	public static String STATIC_FILE_SAVE_PATH_PSS2 = play.Play.application().configuration().getString("file.path.pss2");

	public static String STATIC_FILE_SAVE_PATH_OEEPDCA = play.Play.application().configuration().getString("file.path.oeepdca");
	
	public static String STATIC_FILE_SAVE_PATH_5S = play.Play.application().configuration().getString("file.path.5s");

	public static String STATIC_FILE_SAVE_PATH_MATRIX = play.Play.application().configuration().getString("file.path.trainmatrix");
	
	public static String STATIC_FILE_SAVE_PATH_5M1E = play.Play.application().configuration().getString("file.path.5m1e");
	
	public static String STATIC_FILE_SAVE_PATH_14Q_CHKLIST = play.Play.application().configuration().getString("file.path.14qchklist");
	
	public static String STATIC_FILE_SAVE_PATH_ESCALATION_PLAN = play.Play.application().configuration().getString("file.path.escalation");

}
