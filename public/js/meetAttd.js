var meetAttd = function(){
	function init(){
		var attendees = [];
		var deletedAttendees =[];
		var years = manager.years;
		var months = manager.months;
		var daysStructure = {};
		
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "meetAttd", "../../");
				this.set("years",years);
				this.set("months",months);
				daysStructure.year = "2017";
				daysStructure.month = "12";
				refreshDaysData(daysStructure);
				this.set("daysStructure",daysStructure);
			},
			oncomplete: function(){
				
				var attendee1 = {id:"1",checked:false,name:"Member A",type:"R",frequency:"2",dept:"Dept A",days:daysStructure.days};
				attendees.push(attendee1);
				var attendee2 = {id:"2",checked:false,name:"Member B",type:"R",frequency:"2",dept:"Dept B",days:daysStructure.days};
				attendees.push(attendee2);
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
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();	
			},
			toHideMonthSelect:function(e){
				var _$select = $(e.node);
				_$select.hide().prev().show().text(_$select.find("option:selected").text());
			},
			changeYear:function(){
				refreshDaysData(daysStructure);
				ractive.update("daysStructure");
			},
			changeMonth:function(){
				refreshDaysData(daysStructure);
				ractive.update("daysStructure");
			},
			toShowMeetingTimeText:function(e){				
				$(e.node).hide().next().show().focus();		
			},
			toHideMeetingTimeText:function(e){
				$(e.node).hide().prev().show().text($(e.node).val());			
			},
			toShowMeetingSpotText:function(){
				$("#meetingSpotTd label").hide().next().show().focus();
			},
			toShowMeetingHostText:function(){
				$("#meetingHostTd label").hide().next().show().focus();
			},			
			toHideMeetingSpotText:function(){
				var _$txt = $("#meetingSpotTd input");
				_$txt.hide().prev().show().text(_$txt.val());
			},
			toHideMeetingHostText:function(){
				var _$txt = $("#meetingHostTd input");
				_$txt.hide().prev().show().text(_$txt.val());
			},
			addAttendee:function(){				
				var attendee = {id:"0",checked:false,name:"",type:"R",frequency:"",dept:"",days:daysStructure.days};
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
			}
		})
	}
	
	//构建对应年月份天数的days默认对象
	function refreshDaysData(daysStructure){
		var daysCnt = manager.getDaysCnt(daysStructure.year,daysStructure.month);
		daysStructure.days = [];
		daysStructure.daysCnt = daysCnt;
		for(i = 1;i <= daysCnt;i++){
			daysStructure.days.push({d:i,v:"",s:verifyWeekend(daysStructure.year,daysStructure.month,i)+''});//s标示是否为周末
		}
		return daysStructure;
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