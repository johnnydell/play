var meetAttd = function(){
	var attendees = [];
	var deletedAttendees =[];
	var years = manager.years();
	var months = manager.months;
	var attendance = {id:"0",year:"",month:"",line_id:"",line_name:"",time_start:"10:00",time_end:"10:30",spot:"Team Board",host:"Team Leader",daysCnt:0,days:[]};
	console.log(years);
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "meetAttd", "../../");
				this.set("years",years);
				this.set("months",months);
				attendance.line_id = "9336b6f78e7448e685bad5ba71c2e3f8";
				var sys_date = manager.getSystemDate();
				attendance.year = sys_date.split("-")[0];
				attendance.month = sys_date.split("-")[1];
				refreshAttendance();
				this.set("attendance",attendance);
			},
			oncomplete: function(){
				//以下days需要根据实际数据集合来形成days对象
				/*var attendee1 = {id:"1",checked:false,name:"Member A",type:"R",frequency:"2",dept:"Dept A",days:formDays(attendance.year,attendance.month)};
				attendees.push(attendee1);
				var attendee2 = {id:"2",checked:false,name:"Member B",type:"R",frequency:"2",dept:"Dept B",days:formDays(attendance.year,attendance.month)};
				attendees.push(attendee2);*/
				ractive.set("attendees",attendees);
				
				$(".meettimeStart").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
				$(".meettimeEnd").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
			}
		});
		
		ractive.on({
			toShowYearSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideYearSelect:function(e){
				$(e.node).hide().prev().show();
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();	
			},
			toHideMonthSelect:function(e){
				var _$select = $(e.node);
				_$select.hide().prev().show();
			},
			changeYear:function(){
				refreshAttendance();
				ractive.update("attendance");
			},
			changeMonth:function(){
				refreshAttendance();
				ractive.update("attendance");
			},
			toShowMeetingTimeText:function(e){				
				$(e.node).hide().next().show().focus();		
			},
			toHideMeetingTimeText:function(e){
				$(e.node).hide().prev().show();			
			},
			toShowMeetingSpotText:function(){
				$("#meetingSpotTd label").hide().next().show().focus();
			},
			toShowMeetingHostText:function(){
				$("#meetingHostTd label").hide().next().show().focus();
			},			
			toHideMeetingSpotText:function(){
				var _$txt = $("#meetingSpotTd input");
				_$txt.hide().prev().show();
			},
			toHideMeetingHostText:function(){
				var _$txt = $("#meetingHostTd input");
				_$txt.hide().prev().show();
			},
			addAttendee:function(){		
				var attendee = {id:"0",checked:false,name:"",type:"R",frequency:"",dept:"",days:formDays(attendance.year,attendance.month)};
				attendees.unshift(attendee);
				ractive.set("attendees",attendees);
			},
			deleteAttendee:function(){
			      var i = attendees.length-1;
			      while (i >= 0){
			        var temp = attendees[i];
			        if(temp.checked){
			            if(temp.id != '0'){
			            	deletedAttendees.push(temp);
			            }
			        	attendees.splice(i,1);	
			        }
				  	i--;
				  }		      
			},
			saveAttendee:function(){
				console.log(attendance);
				console.log(attendees);
				console.log("prepare to save");
			},
			test:function(){
				console.log(attendees[0].days[3]);
				console.log(deletedAttendees);
			},
			toShowColumnEditor:function(e){
				var index = $(e.node).parent().parent().attr("lang");
				$(e.node).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				var txt;
				if(type == 'select-one'){
					txt = $(e.node).find("option:selected").text();
				} else if(type == 'textarea') {
					txt = $(e.node).val();
					var index = $(e.node).parent().parent().attr("lang");
					var colName = $(e.node).attr("colName");
					if(colName != undefined && colName != ''){
						opl[index][colName] = txt;
					}
				} else {
					txt = $(e.node).val();
				}
				txt = txt.length>10?txt.substring(0,10)+"....":txt;
				$(e.node).hide().prev().show().text(txt)
			},
			checkAll:function(e){
				$(attendees).each(function(i,n){
					n.checked = $(e.node).is(':checked');
				});				
				ractive.update("attendees");
			}
		})
	}
	
	//根据产线和年月获取对应会议头信息
	function getMetAtdanceInfo(line_id,year,month){
		var ret;
		$.ajax({
			url: manager.root + "/metAttd/getMetAtdanceInfo",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,month:month},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret;
	}
	
	//刷新MeetingAttendance头对象
	function refreshAttendance(){
		var daysCnt = cntDays(attendance.year,attendance.month);
		attendance.daysCnt = daysCnt;
		attendance.days = formDays(attendance.year,attendance.month);
		var info = getMetAtdanceInfo(attendance.line_id,attendance.year,attendance.month);
		console.log(info);
		attendance.id = info.id;
		attendance.line_name = info.productLine.lineName;
		//var attendance = {id:"0",year:"",month:"",line_id:"",line_name:"FAG2",time_start:"10:00",time_end:"10:30",spot:"Team Board",host:"Team Leader",daysCnt:0,days:[]};
		//attendance.id
		return attendance;
	}
	
	//根据对应结构的年月条件和实际的数据形成days数据结构
	function refreshAttendanceDetails(){
		
	}
	
	//根据年月返回天数
	function cntDays(year,month){
		return manager.getDaysCnt(year,month);
	}
	
	//根据年月返回所有天对象
	function formDays(year,month){
		var days = [];
		var daysCnt = cntDays(year,month);
		for(i = 1;i <= daysCnt;i++){
			days.push({d:i,v:"",s:verifyWeekend(year,month,i)+''});//s标示是否为周末
		}
		return days;
	}
	
	//验证日期是否为周末
	function verifyWeekend(year,month,day){
		var dt = new Date(parseInt(year),parseInt(month)-1,parseInt(day));
		var ret = 0;//not a weekend day		
		if (dt.getDay() == 0 || dt.getDay() == 6){
		  ret = 1;
		} 
		return ret;
	}
	
	return {
		init:init
	}
}();
$(document).ready(meetAttd.init);