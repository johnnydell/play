var meetAttd = function(){
	var attendanceDetails = [];	
	var years = manager.years();
	var months = manager.months;
	var lines = common.getAllLines();
	var attendance = {id:"0",year:"",month:"",line_id:"",line_name:"",time_start:"10:00",time_end:"10:30",spot:"Team Board",host:"Team Leader",daysCnt:0,days:[],updated:"0"};
	var limits = permission.load("meeting_attendance");
	console.log(limits.view);
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "meetAttd", "../../");
				manager.loadProperties(this, "common", "../../");
				this.set("years",years);
				this.set("months",months);
				this.set("lines",lines);
				attendance.line_id = lines[0].id;
				var sys_date = manager.getSystemDate();
				attendance.year = sys_date.split("-")[0];
				attendance.month = sys_date.split("-")[1];
				refreshAttendance();
				this.set("attendance",attendance);
				refreshAttendanceDetails();
				this.set("attendanceDetails",attendanceDetails);
			},
			oncomplete: function(){				
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
			disableKeydown:function(){
				return false;
			},
			toShowLineSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideLineSelect:function(e){
				$(e.node).hide().prev().show();
			}, 
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
			changeLine:function(){
				refreshAttendance();
				this.set("attendance",attendance);
				refreshAttendanceDetails();
				this.set("attendanceDetails",attendanceDetails);
			},
			changeYear:function(){
				refreshAttendance();
				this.set("attendance",attendance);
				refreshAttendanceDetails();
				this.set("attendanceDetails",attendanceDetails);
			},
			changeMonth:function(){
				refreshAttendance();
				this.set("attendance",attendance);
				refreshAttendanceDetails();
				this.set("attendanceDetails",attendanceDetails);
			},
			toShowMeetingTimeText:function(e){				
				$(e.node).hide().next().show().focus();		
			},
			toHideMeetingTimeText:function(e){
				$(e.node).hide().prev().show();
				attendance.updated = "1";
				this.set("attendance",attendance);
			},
			toShowMeetingSpotText:function(){
				$("#meetingSpotTd label").hide().next().show().focus();
			},			
			toHideMeetingSpotText:function(){
				var _$txt = $("#meetingSpotTd input");
				_$txt.hide().prev().show();
				attendance.updated = "1";
				this.set("attendance",attendance);
			},
			toShowMeetingHostText:function(){
				$("#meetingHostTd label").hide().next().show().focus();
			},
			toHideMeetingHostText:function(){
				var _$txt = $("#meetingHostTd input");
				_$txt.hide().prev().show();
				attendance.updated = "1";
				this.set("attendance",attendance);
			},
			addAttendee:function(){		
				var attendee = {id:"0",checked:false,meeting_attendee:"",required:"R",frequency:"",dept:"",days:formDays(attendance.year,attendance.month),updated:"0"};
				attendanceDetails.push(attendee);
				ractive.set("attendanceDetails",attendanceDetails);
			},
			deleteAttendee:function(){
				var deletedAttendanceDetails =[];
				var deleteCnt = 0;
				$(attendanceDetails).each(function(i,n){
					if(n.checked){
						if(n.id != '0'){
							deletedAttendanceDetails.push(n);
						}
						deleteCnt++;
					}
				})
				
				if(deleteCnt > 0){
					if(deletedAttendanceDetails.length > 0){
						$.ajax({
							url: manager.root + "/metAttd/deleteMeetingAttendanceDetails",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({deletedAttendanceDetails:deletedAttendanceDetails}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								var i = attendanceDetails.length-1;
								while (i >= 0){
								  var temp = attendanceDetails[i];
								  if(temp.checked){
								      attendanceDetails.splice(i,1);	
								  }
								  i--;
								}	
								ractive.set("attendanceDetails",attendanceDetails);		
								jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
							},
							error:function(){
								jAlert($.i18n.prop("i18n_delete_error"), $.i18n.prop("i18n_error"));
							},
							complete: function() {
								manager.unblock();
							}
						});						
					} else {
						var i = attendanceDetails.length-1;
						while (i >= 0){
						  var temp = attendanceDetails[i];
						  if(temp.checked){
						      attendanceDetails.splice(i,1);	
						  }
						  i--;
						}	
						ractive.set("attendanceDetails",attendanceDetails);		
						jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
					}
				} else {
					jAlert($.i18n.prop("i18n_select_to_delete"), $.i18n.prop("i18n_error"));
				} 		      
			},
			saveAttendee:function(){
				var error = false;
				//判断主体部分有没有为空的
				if(attendance.time_start == '' ||attendance.time_end == '' ||attendance.spot == ''||attendance.host == ''){	
					jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
					error = true;
					return false;
				}
				
				//判断参与详细有没为空的
				$(attendanceDetails).each(function(i,n){
					if(n.meeting_attendee == '' ||n.dept == ''){	
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
				})
				
				if(!error){
					//整理出需要新增和更新的
					var addAttendanceDetails = [];
					var updateAttendanceDetails = [];
					$(attendanceDetails).each(function(i,n){
						if(n.id == '0'){
							addAttendanceDetails.push(n);
						} else if(n.updated == "1"){
							updateAttendanceDetails.push(n);
						}
					})
					
					if(attendance.id == "0" || attendance.updated == "1" || addAttendanceDetails.length > 0 || updateAttendanceDetails.length > 0){
						$.ajax({
							url: manager.root + "/metAttd/saveMeetingAttendance",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({attendance:attendance,addAttendanceDetails:addAttendanceDetails,updateAttendanceDetails:updateAttendanceDetails}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshAttendance();
								ractive.set("attendance",attendance);
								refreshAttendanceDetails();
								ractive.set("attendanceDetails",attendanceDetails);		
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});		
					}
				}
			},
			test:function(){
				console.log(attendanceDetails[0]);
			},
			toShowColumnEditor:function(e){
				var index = $(e.node).parent().parent().attr("lang");
				$(e.node).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				var txt;
				var index = $(e.node).parent().parent().attr("lang");
				if(type == 'select-one'){
					txt = $(e.node).find("option:selected").text();
					var colName = $(e.node).attr("colName");
					if(colName != undefined && colName == 'day'){
						var flag = $(e.node).attr("flag");
						var val = $(e.node).find("option:selected").val();
						var bg = "white";
						if(val == 'A'){
							bg = "red";
						} else if(val == 'E'){
							bg = "yellow";
						}
						attendanceDetails[index]["days"][flag].bg=bg;
					}
				} else if(type == 'textarea') {
					txt = $(e.node).val();
					var colName = $(e.node).attr("colName");
					if(colName != undefined && colName != ''){
						attendanceDetails[index][colName] = txt;
					}
				} else {
					txt = $(e.node).val();
				}
				txt = txt.length>10?txt.substring(0,10)+"....":txt;
				$(e.node).hide().prev().show().text(txt);
				attendanceDetails[index].updated = "1";
				ractive.update("attendanceDetails");
			},
			checkAll:function(e){
				$(attendanceDetails).each(function(i,n){
					n.checked = $(e.node).is(':checked');
				});				
				ractive.update("attendanceDetails");
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
	
	//根据当前的attendanceid获得相关的details
	function getMetAtdanceDetails(attendance_id){
		var ret;
		$.ajax({
			url: manager.root + "/metAttd/getMetAtdanceDetails",
			type: "GET",
			async:false,
			dataType:"json",
			data:{attendance_id:attendance_id},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret;
	}
	
	//刷新MeetingAttendance头对象,触发点主要是年，月选项
	function refreshAttendance(){
		var info = getMetAtdanceInfo(attendance.line_id,attendance.year,attendance.month);
		attendance.id = info.id;
		attendance.line_name = info.productLine.lineName;
		attendance.line_id = info.productLine.id;
		attendance.updated = "0";
		if(info.id != '0'){
			attendance.time_start = info.meetingTimeStart;
			attendance.time_end = info.meetingTimeEnd;
			attendance.spot = info.meetingSpot;
			attendance.host = info.meetingHost;
		}
		var daysCnt = cntDays(attendance.year,attendance.month);
		attendance.daysCnt = daysCnt;
		attendance.days = formDays(attendance.year,attendance.month);		
	}
	
	//根据对应结构的年月条件和实际的数据形成days数据结构
	function refreshAttendanceDetails(){
	    var attendance_id = attendance.id;
	    attendanceDetails = [];
	    if(attendance_id != '0'){
	    	var dets = getMetAtdanceDetails(attendance_id);
	    	if(dets.length > 0){
	    		$(dets).each(function(i,n){
	    			var attendee = {};
	    			attendee.id = n.id;
	    			attendee.checked = false;
	    			attendee.meeting_attendee = n.meeting_attendee;
	    			attendee.required = n.required;
	    			attendee.frequency = n.frequency;
	    			attendee.dept = n.dept;
	    			attendee.updated = "0";
	    			var real_days = n.meetingAttendanceDetailsDays;
	    			if(real_days.length > 0){
	    				var days = [];
	    				var daysCnt = cntDays(attendance.year,attendance.month);
	    				for(i = 1;i <= daysCnt;i++){
	    					var day = real_days[i-1];
	    					if(day == undefined){
	    						days.push({id:"0",d:i,v:"",s:verifyWeekend(attendance.year,attendance.month,i)+'',bg:"white",updated:"0"});//s标示是否为周末
	    					} else {
	    						var bg = "white";
	    						if(day.dayVal == 'A'){
	    							bg = "red";
	    						} else if(day.dayVal == 'L' || day.dayVal == 'E'){
	    							bg = "yellow";
	    						}
	    						days.push({id:day.id,d:i,v:day.dayVal,s:day.dayWeekend,bg:bg,updated:"0"});//s标示是否为周末
	    					}
	    				}
	    				attendee.days = days;
	    			} else {
	    				attendee.days = formDays(attendance.year,attendance.month);
	    			}
	    			attendanceDetails.unshift(attendee);
	    		});
	    	}
	    }
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
			days.push({id:"0",d:i,v:"",s:verifyWeekend(year,month,i)+'',bg:"white",updated:"0"});//s标示是否为周末
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
