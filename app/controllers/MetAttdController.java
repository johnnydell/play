package controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;

import models.MetAttd;
import models.MetAttdDetails;
import models.MetAttdDetailsDays;
import models.ProductLine;
import play.db.ebean.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

public class MetAttdController extends Controller  {
	
	private final static DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * 
	 * @param line_id
	 * @param year
	 * @param month
	 * @return 根据产线ID和年月获得已经存储的记录
	 */
	public static Result getMetAtdanceInfo(String line_id,String year,String month) {		
		MetAttd  attd = MetAttd.getMetAtdanceInfo(line_id, year, month);
		if(attd == null){
			attd = new MetAttd();
			attd.id = "0";
			ProductLine line = ProductLine.findById(line_id);
			if(line != null){
				attd.productLine = line;
				attd.lineId = line.id;
			}
		}
		String str = JSON.toJSONString(attd);
   	 	return ok(str);
    }
	
	/**
	 * 
	 * @param attendance_id
	 * @return 根据会议ID获取详情
	 */
	public static Result getMetAtdanceDetails(String attendance_id){
		List<MetAttdDetails> li = MetAttdDetails.getMetAtdanceDetailsByAtdId(attendance_id);
		if(li == null || li.size() == 0){
			li = new ArrayList<MetAttdDetails>();
		}
		String str = JSON.toJSONString(li);
   	 	return ok(str);
	}
	
	/**
	 * 保存会议的头部和明细的新增和更新
	 * @return
	 */
	@Transactional
	public static Result saveMeetingAttendance(){
		JsonNode in = request().body().asJson();
		JsonNode attendance = in.get("attendance");		
		//保存或更新Attendance部分
		String id = attendance.get("id").asText();
		String year = attendance.get("year").asText();
		String month = attendance.get("month").asText();
		String line_id = attendance.get("line_id").asText();
		String time_start = attendance.get("time_start").asText();
		String time_end = attendance.get("time_end").asText();
		String spot = attendance.get("spot").asText();
		String host = attendance.get("host").asText();
		MetAttd metAttd = new MetAttd();
		if(!id.equals("0")){
			metAttd.id = id;
		}
		metAttd.meetingYear = year;
		metAttd.meeingMonth = month;
		metAttd.lineId = line_id;
		metAttd.meetingTimeStart = time_start;
		metAttd.meetingTimeEnd = time_end;
		metAttd.meetingSpot = spot;
 		metAttd.meetingHost = host;
		if(!id.equals("0")){
			MetAttd.update(metAttd);
		} else {
			MetAttd.save(metAttd);
		}	

		//保存新增部分明细
		JsonNode addAttendanceDetails = in.get("addAttendanceDetails");
		ArrayList<MetAttdDetails> addDetailsLi = new ArrayList<MetAttdDetails>();
		Iterator<JsonNode> a = addAttendanceDetails.iterator();
		while(a.hasNext()){
			JsonNode node = a.next();
			String meeting_attendee = node.get("meeting_attendee").asText();
		    String required = node.get("required").asText();
		    String frequency = node.get("frequency").asText();
		    String dept = node.get("dept").asText();
		    
		    MetAttdDetails detail = new MetAttdDetails();
		    detail.meetingAttendanceId = metAttd.id;
		    detail.meeting_attendee = meeting_attendee;
		    detail.required = required;
		    detail.frequency = frequency;
		    detail.dept = dept;
		    detail.createTime = df1.format(new Date());
		    
		    //封装details中的days
		    List<MetAttdDetailsDays> detailDays = new ArrayList<MetAttdDetailsDays>();
		    JsonNode days = node.get("days");
		    Iterator<JsonNode> daysI = days.iterator();
		    while(daysI.hasNext()){
		    	JsonNode dayNode = daysI.next();
		    	String d = dayNode.get("d").asText();
		    	String v = dayNode.get("v").asText();
		    	String s = dayNode.get("s").asText();
		    	MetAttdDetailsDays day = new MetAttdDetailsDays();
		    	day.meetingAttendanceDetailsId = detail.id;
		    	day.dayKey = d;
		    	day.dayVal = v;
		    	day.dayWeekend = s;
		    	detailDays.add(day);
		    }
		    detail.meetingAttendanceDetailsDays = detailDays;
		    addDetailsLi.add(detail);
		}
		if(addDetailsLi.size() > 0){
			MetAttdDetails.saveList(addDetailsLi);
		}
		
		//保存更新部分明细
		JsonNode updateAttendanceDetails = in.get("updateAttendanceDetails");
		ArrayList<MetAttdDetails> updatedDetailsLi = new ArrayList<MetAttdDetails>();
		Iterator<JsonNode> b = updateAttendanceDetails.iterator();
		while(b.hasNext()){
			JsonNode node = b.next();
			String detailId = node.get("id").asText();
			String meeting_attendee = node.get("meeting_attendee").asText();
		    String required = node.get("required").asText();
		    String frequency = node.get("frequency").asText();
		    String dept = node.get("dept").asText();
		    
		    MetAttdDetails detail = new MetAttdDetails();
		    detail.id = detailId;
		    detail.meetingAttendanceId = metAttd.id;
		    detail.meeting_attendee = meeting_attendee;
		    detail.required = required;
		    detail.frequency = frequency;
		    detail.dept = dept;
		    
		    //封装details中的days
		    List<MetAttdDetailsDays> detailDays = new ArrayList<MetAttdDetailsDays>();
		    JsonNode days = node.get("days");
		    Iterator<JsonNode> daysI = days.iterator();
		    while(daysI.hasNext()){
		    	JsonNode dayNode = daysI.next();
		    	String detailDaysId = dayNode.get("id").asText();
		    	String d = dayNode.get("d").asText();
		    	String v = dayNode.get("v").asText();
		    	String s = dayNode.get("s").asText();
		    	MetAttdDetailsDays day = new MetAttdDetailsDays();
		    	day.id = detailDaysId;
		    	day.meetingAttendanceDetailsId = detail.id;
		    	day.dayKey = d;
		    	day.dayVal = v;
		    	day.dayWeekend = s;
		    	detailDays.add(day);
		    }
		    detail.meetingAttendanceDetailsDays = detailDays;
		    updatedDetailsLi.add(detail);
		}
		if(updatedDetailsLi.size() > 0){
			MetAttdDetails.updateList(updatedDetailsLi);
		}
		
		return ok("{\"add\":\""+addDetailsLi.size()+"\",\"update\":\""+updatedDetailsLi.size()+"\"}");
	}
}
