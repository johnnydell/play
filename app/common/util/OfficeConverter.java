package common.util;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.ComThread;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

public class OfficeConverter {

	private static final Integer WORD_TO_PDF_OPERAND = 17;

	private static final Integer PPT_TO_PDF_OPERAND = 32;

	private static final Integer EXCEL_TO_PDF_OPERAND = 0;

	private static final Integer EXCEL_TO_HTML_OPERAND = 44;

	public static void docTopdf(String srcFilePath, String pdfFilePath) throws Exception {
		ActiveXComponent app = null;
		Dispatch doc = null;
		try {
			ComThread.InitSTA();
			app = new ActiveXComponent("Word.Application");
			app.setProperty("Visible", false);
			Dispatch docs = app.getProperty("Documents").toDispatch();
			Object[] obj = new Object[] { srcFilePath, new Variant(false), new Variant(false), // 是否只读
					new Variant(false), new Variant("pwd") };
			doc = Dispatch.invoke(docs, "Open", Dispatch.Method, obj, new int[1]).toDispatch();
			// Dispatch.put(doc, "Compatibility", false); //兼容性检查,为特定值false不正确
			Dispatch.put(doc, "RemovePersonalInformation", false);
			Dispatch.call(doc, "ExportAsFixedFormat", pdfFilePath, WORD_TO_PDF_OPERAND); // word保存为pdf格式宏，值为17

		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			if (doc != null) {
				Dispatch.call(doc, "Close", false);
			}
			if (app != null) {
				app.invoke("Quit", 0);
			}
			ComThread.Release();
		}
	}

	public static void pptTopdf(String srcFilePath, String pdfFilePath) throws Exception {
		ActiveXComponent app = null;
		Dispatch ppt = null;
		try {
			ComThread.InitSTA();
			app = new ActiveXComponent("PowerPoint.Application");
			Dispatch ppts = app.getProperty("Presentations").toDispatch();

			/*
			 * call param 4: ReadOnly param 5: Untitled指定文件是否有标题 param 6:
			 * WithWindow指定文件是否可见
			 */
			ppt = Dispatch.call(ppts, "Open", srcFilePath, true, true, false).toDispatch();
			Dispatch.call(ppt, "SaveAs", pdfFilePath, PPT_TO_PDF_OPERAND); // ppSaveAsPDF为特定值32

		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			if (ppt != null) {
				Dispatch.call(ppt, "Close");
			}
			if (app != null) {
				app.invoke("Quit");
			}
			ComThread.Release();
		}
	}

	public static void excelToPdf(String inFilePath, String outFilePath) throws Exception {
		ActiveXComponent excel = null;
		Dispatch workbooks = null;
		Dispatch workbook = null;
		try {
			ComThread.InitMTA();
			excel = new ActiveXComponent("Excel.Application");
			excel.setProperty("Visible", new Variant(false));
			excel.setProperty("AutomationSecurity", new Variant(3)); // 禁用宏
			//ax.setProperty("AutoRecover", new Variant(false));
			workbooks = excel.getProperty("Workbooks").toDispatch();

			Object[] obj = new Object[] { inFilePath, new Variant(false), new Variant(false) };
			workbook = Dispatch.invoke(workbooks, "Open", Dispatch.Method, obj, new int[1]).toDispatch();
//			Object[] obj = new Object[] { 
//					inFilePath, 			//file name
//					new Variant(0) , 		//UpdateLinks      
//					new Variant(true), 		//ReadOnly      
//					new Variant(""),		//Format      
//					new Variant(""),		//Password      
//					new Variant(""),		//WriteResPassword      
//					new Variant(false),		//IgnoreReadOnlyRecommended      
//					new Variant(""),		//Origin      
//					new Variant(""),		//Delimiter      
//					new Variant(false),		//Editable      
//					new Variant(false),		//Notify      
//					new Variant(""),		//Converter      
//					new Variant(false),		//AddToMru      
//					new Variant(false),		//Local      
//					new Variant(1)			//CorruptLoad      
//					};
			
			
//			workbook = Dispatch.call(workbooks, "Open", inFilePath, 
//					0,
//					true,
//					5,
//					"",
//					"",
//					false,
//					"xlWindows",
//					",",
//					false,
//					false,
//					1,
//					false,
//					false,
//					1).toDispatch();
			
//			workbook = Dispatch.call(workbooks, "Open", inFilePath, // FileName
//					3, // UpdateLinks
//					false, // Readonly
//					5, // Format
//					"" // Password
//					).toDispatch();
			

			// 转换格式
			Object[] obj2 = new Object[] { new Variant(EXCEL_TO_PDF_OPERAND), // PDF格式=0
					outFilePath, new Variant(0) // 0=标准 (生成的PDF图片不会变模糊) ; 1=最小文件
			};
			Dispatch.invoke(workbook, "ExportAsFixedFormat", Dispatch.Method, obj2, new int[1]);

		} catch (Exception es) {
			es.printStackTrace();
			throw es;
		} finally {
			if (workbook != null) {
				Dispatch.call(workbook, "Close", new Variant(false));
				workbook = null;
			}
			if (workbooks != null) {
				Dispatch.call(workbooks, "Close");
				workbooks = null;
			}
			if (excel != null) {
				excel.invoke("Quit", new Variant[] {});
				excel = null;
			}
			ComThread.Release();
		}

	}

	public static void excelToHtml(String xlsfile, String htmlfile) {
		ActiveXComponent app = new ActiveXComponent("Excel.Application"); // 启动Excel
		try {
			app.setProperty("Visible", new Variant(false));
			app.setProperty("AutomationSecurity", new Variant(3));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			//Dispatch excel = Dispatch.invoke(excels, "Open", Dispatch.Method, new Object[] { xlsfile, new Variant(false), new Variant(true) }, new int[1]).toDispatch();
			Dispatch excel = Dispatch.invoke(excels, "Open", Dispatch.Method, new Object[] { xlsfile, new Variant(0) }, new int[1]).toDispatch();
			// Dispatch sheet = Dispatch.invoke(excel, "sheet(0)", arg2, arg3,
			// arg4)
			Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] { htmlfile, new Variant(EXCEL_TO_HTML_OPERAND) }, new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(excel, "Close", f);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			app.invoke("Quit", new Variant[] {});
		}
	}
	
	public static void main(String[] args) {
		String inFilePath = "D:\\workspace_18\\edash\\public\\temp\\balance\\balance_20171130101824.xlsm";
		String outFilePath = "D:\\workspace_18\\edash\\public\\temp\\balance\\balance_20171130101824.pdf";
		try {
			excelToPdf(inFilePath, outFilePath);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

}
