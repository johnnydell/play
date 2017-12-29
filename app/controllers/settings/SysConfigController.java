package controllers.settings;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;

import com.avaje.ebean.SqlRow;

import models.OeeLossChildChildType;
import models.OeeLossChildType;
import models.OeeLossType;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class SysConfigController extends Controller {
	
	private static Log logger = LogFactory.getLog(SysConfigController.class);
	
	public static Result getOeeLossSubTypes(){
		List<SqlRow> lists = OeeLossChildChildType.findAllBySql();
		
		List<OeeLossType> losses = new ArrayList<OeeLossType>();
		
		for(SqlRow row : lists){
			String lossId 			= row.getString("loss_id");
			String lossName 		= row.getString("loss_name");
			String subLossId 		= row.getString("sub_loss_id");
			String subLossName 		= row.getString("sub_loss_name");
			String subSubLossId 	= row.getString("sub_sub_loss_id");
			String subSubLossName 	= row.getString("sub_sub_loss_name");
			if (losses.size() == 0) {
				OeeLossChildChildType subSubLoss = new OeeLossChildChildType();
				subSubLoss.id = subSubLossId;
				subSubLoss.lossTypeName = subSubLossName;
				OeeLossChildType subLoss_1 = new OeeLossChildType();
				subLoss_1.id = subLossId;
				subLoss_1.subLoseTypeName = subLossName;
				subLoss_1.subSubTypes.add(subSubLoss);
				OeeLossType loss_1 = new OeeLossType();
				loss_1.id = lossId;
				loss_1.lossTypeName = lossName;
				loss_1.subTypes.add(subLoss_1);
				losses.add(loss_1);
			} else {
				boolean isFoundLoss = false;
				for (OeeLossType loss : losses) {
					
					if (null != loss.id) {
						if (loss.id.equalsIgnoreCase(lossId)) {
							isFoundLoss = true;
							// same loss, check sub loss
							boolean isFoundSubLoss = false;
							for (OeeLossChildType subLoss : loss.subTypes) {
								if (subLoss.id.equalsIgnoreCase(subLossId)) {
									isFoundSubLoss = true;
									// same sub loss, check sub sub loss
									boolean isFoundSubSubLoss = false;
									for (OeeLossChildChildType subSubLoss : subLoss.subSubTypes) {
										if (subSubLoss.id.equalsIgnoreCase(subSubLossId)) {
											isFoundSubSubLoss = true;
											break;
										}
									}
									if (!isFoundSubSubLoss && !StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")) {
										OeeLossChildChildType subSubLoss 	= new OeeLossChildChildType();
										subSubLoss.id 						= subSubLossId;
										subSubLoss.lossTypeName 			= subSubLossName;
										subLoss.subSubTypes.add(subSubLoss);
									}
								} 
							}
							if (!isFoundSubLoss ) {
								OeeLossChildType subLoss_1 				= new OeeLossChildType();
								subLoss_1.id 							= subLossId;
								subLoss_1.subLoseTypeName 				= subLossName;
								if (!StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")){
									OeeLossChildChildType subSubLoss 	= new OeeLossChildChildType();
									subSubLoss.id 						= subSubLossId;
									subSubLoss.lossTypeName	 			= subSubLossName;
									subLoss_1.subSubTypes.add(subSubLoss);
								}
								
								loss.subTypes.add(subLoss_1);
								
							}

						} else {
							
						}
					} 

				}
				if (!isFoundLoss){
					OeeLossChildType subLoss_1 				= new OeeLossChildType();
					subLoss_1.id 							= subLossId;
					subLoss_1.subLoseTypeName 				= subLossName;
					if (!StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")){
						OeeLossChildChildType subSubLoss 	= new OeeLossChildChildType();
						subSubLoss.id 						= subSubLossId;
						subSubLoss.lossTypeName 			= subSubLossName;
						subLoss_1.subSubTypes.add(subSubLoss);
					}
					OeeLossType loss_1 						= new OeeLossType();
					loss_1.id 								= lossId;
					loss_1.lossTypeName 					= lossName;
					loss_1.subTypes.add(subLoss_1);
					losses.add(loss_1);
				}
			}
			
		}
		
		
		
		
		return ok(Json.toJson(losses));
	}
	
	/*public static void main(String[] args) {
		
		Test test1 = new Test("1", "质量损失", "1", "报废", "Q1", "1", "材料缺陷", "null");
		Test test2 = new Test("1", "质量损失", "1", "报废", "Q1", "4", "材料停产", "null");
		Test test3 = new Test("1", "质量损失", "2", "返工", "Q2", "2", "产品缺陷", "null");
		Test test4 = new Test("2", "技术损失", "3", "设备停机", "T1", "3", "停电", "null");
		Test test5 = new Test("2", "技术损失", "4", "调试损失", "T2", "null", "null", "null");
		Test test6 = new Test("3", "换型损失", "5", "计划损失", "C1", "null", "null", "null");
		Test test7 = new Test("3", "换型损失", "6", "非计划损失", "C2", "null", "null", "null");
		Test test8 = new Test("3", "换型损失", "7", "更换工具", "C3", "null", "null", "null");
		Test test9 = new Test("4", "组织损失", "10", "首末中间检查", "O3", "null", "null", "null");
		Test test10 = new Test("4", "组织损失", "11", "更换原材料(含包材)", "O4", "null", "null", "null");
		Test test11 = new Test("4", "组织损失", "12", "非计划TPM", "O5", "null", "null", "null");
		Test test12 = new Test("4", "组织损失", "13", "非计划样件生产", "O6", "null", "null", "null");
		Test test13 = new Test("4", "组织损失", "14", "新员工培训", "O7", "null", "null", "null");
		Test test14 = new Test("4", "组织损失", "15", "其他", "O8", "null", "null", "null");
		Test test15 = new Test("4", "组织损失", "8", "缺人", "O1", "null", "null", "null");
		Test test16 = new Test("4", "组织损失", "9", "缺料(含包材)", "O2", "null", "null", "null");
		
		
		List<Test> list1 = new ArrayList<Test>();

		list1.add(test1);
		list1.add(test2);
		list1.add(test3);
		list1.add(test4);
		list1.add(test5);
		list1.add(test6);
		list1.add(test7);
		list1.add(test8);
		list1.add(test9);
		list1.add(test10);
		list1.add(test11);
		list1.add(test12);
		list1.add(test13);
		list1.add(test14);
		list1.add(test15);
		list1.add(test16);

		System.out.println(list1);
		List<OeeLossType> l = calc(list1);
		System.out.println("");
		
	}
	
	public static List<OeeLossType> calc(List<Test> list1) {
		List<OeeLossType> losses = new ArrayList<OeeLossType>();
		for (Test test : list1) {
			String lossId = test.id1;
			String lossName = test.name1;
			String subLossId = test.id2;
			String subLossName = test.name2;
			String subSubLossId = test.id3;
			String subSubLossName = test.name3;
			if (losses.size() == 0) {
				OeeLossChildChildType subSubLoss = new OeeLossChildChildType();
				subSubLoss.id = subSubLossId;
				subSubLoss.lossTypeName = subSubLossName;
				OeeLossChildType subLoss_1 = new OeeLossChildType();
				subLoss_1.id = subLossId;
				subLoss_1.subLoseTypeName = subLossName;
				subLoss_1.subSubTypes.add(subSubLoss);
				// loss.subTypes.add(subLoss_1);
				OeeLossType loss_1 = new OeeLossType();
				loss_1.id = lossId;
				loss_1.lossTypeName = lossName;
				loss_1.subTypes.add(subLoss_1);
				losses.add(loss_1);
			} else {
				boolean isFoundLoss = false;
				for (OeeLossType loss : losses) {
					
					if (null != loss.id) {
						if (loss.id.equalsIgnoreCase(lossId)) {
							isFoundLoss = true;
							// same loss, check sub loss
							boolean isFoundSubLoss = false;
							for (OeeLossChildType subLoss : loss.subTypes) {
								if (subLoss.id.equalsIgnoreCase(subLossId)) {
									isFoundSubLoss = true;
									// same sub loss, check sub sub loss
									boolean isFoundSubSubLoss = false;
									for (OeeLossChildChildType subSubLoss : subLoss.subSubTypes) {
										if (subSubLoss.id.equalsIgnoreCase(subSubLossId)) {
											isFoundSubSubLoss = true;
											break;
										}
									}
									if (!isFoundSubSubLoss && !StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")) {
										OeeLossChildChildType subSubLoss = new OeeLossChildChildType();
										subSubLoss.id = subSubLossId;
										subSubLoss.lossTypeName = subSubLossName;
										subLoss.subSubTypes.add(subSubLoss);
									}
								} 
							}
							if (!isFoundSubLoss ) {
								OeeLossChildType subLoss_1 = new OeeLossChildType();
								subLoss_1.id = subLossId;
								subLoss_1.subLoseTypeName = subLossName;
								if (!StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")){
									OeeLossChildChildType subSubLoss = new OeeLossChildChildType();
									subSubLoss.id = subSubLossId;
									subSubLoss.lossTypeName = subSubLossName;
									subLoss_1.subSubTypes.add(subSubLoss);
								}
								
								loss.subTypes.add(subLoss_1);
								
							}

						} else {
							
						}
					} 

				}
				if (!isFoundLoss){
					OeeLossChildType subLoss_1 = new OeeLossChildType();
					subLoss_1.id = subLossId;
					subLoss_1.subLoseTypeName = subLossName;
					if (!StringUtils.isEmpty(subSubLossId) && !subSubLossId.equalsIgnoreCase("null")){
						OeeLossChildChildType subSubLoss = new OeeLossChildChildType();
						subSubLoss.id = subSubLossId;
						subSubLoss.lossTypeName = subSubLossName;
						subLoss_1.subSubTypes.add(subSubLoss);
					}
					OeeLossType loss_1 = new OeeLossType();
					loss_1.id = lossId;
					loss_1.lossTypeName = lossName;
					loss_1.subTypes.add(subLoss_1);
					losses.add(loss_1);
				}
			}
		}
		
		return losses;
	}
	
	public static class Test{
		String id1;
		String name1;
		String id2;
		String name2;
		String code2;
		String id3;
		String name3;
		String code3;
		public Test(String id1, String name1, String id2, String name2, String code2, String id3, String name3, String code3) {
			super();
			this.id1 = id1;
			this.name1 = name1;
			this.id2 = id2;
			this.name2 = name2;
			this.code2 = code2;
			this.id3 = id3;
			this.name3 = name3;
			this.code3 = code3;
		}
		@Override
		public String toString() {
			return "Test [id1=" + id1 + ", name1=" + name1 + ", id2=" + id2 + ", name2=" + name2 + ", code2=" + code2 + ", id3=" + id3 + ", name3=" + name3 + ", code3=" + code3 + "]";
		}
		
		
		
	}*/
}
