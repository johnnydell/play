var meetAttd = function(){
	function init(){
		var attendees = [];
		var deletedAttendees =[];
		var days = [
			{d:1,v:"X"},
			{d:2,v:"E"},
			{d:3,v:"E"},
			{d:4,v:"E"},
			{d:5,v:"E"},
			{d:6,v:"E"},
			{d:7,v:"E"},
			{d:8,v:"E"},
			{d:9,v:"E"},
			{d:10,v:"E"},
			{d:11,v:"E"},
			{d:12,v:"E"},
			{d:13,v:"E"},
			{d:14,v:"E"},
			{d:15,v:"E"},
			{d:16,v:"E"},
			{d:17,v:"E"},
			{d:18,v:"E"},
			{d:19,v:"E"},
			{d:20,v:"E"},
			{d:21,v:"E"},
			{d:22,v:"E"},
			{d:23,v:"E"},
			{d:24,v:"E"},
			{d:25,v:"E"},
			{d:26,v:"E"},
			{d:27,v:"E"},
			{d:28,v:"E"},
			{d:29,v:"E"},
			{d:30,v:"E"},
			{d:31,v:"E"}
		];
		
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "meetAttd", "../../");
			},
			oncomplete: function(){
			}
		});
		
		ractive.on({
			toSignIn:function(){
				location.href = "meetAttdSignIn.html";
			},
			toShowMonthSelect:function(){
				$("#monthSelect label").hide().next().show().focus();	
			},
			toHideMonthSelect:function(){
				var _$select = $("#monthSelect select");
				_$select.hide().prev().show().text(_$select.find("option:selected").text());
			},
			toShowMeetingTimeText:function(){
				$("#meetingTimeTd label").hide().next().show().focus();				
			},
			toShowMeetingSpotText:function(){
				$("#meetingSpotTd label").hide().next().show().focus();
			},
			toShowMeetingHostText:function(){
				$("#meetingHostTd label").hide().next().show().focus();
			},
			toHideMeetingTimeText:function(){
				var _$txt = $("#meetingTimeTd input");
				_$txt.hide().prev().show().text(_$txt.val());			
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
				var attendee = {id:"0",checked:false,name:"Newer",type:"R",dept:"",days:days};
				attendees.push(attendee);
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
			test:function(){
				console.log(attendees);
				console.log(deletedAttendees);
			},
			toShowNameInput:function(e){
				$(e.node).find("label").hide().next().show().focus();
			},
			toHideNameInput:function(e){
				var _$input = $(e.node);
				_$input.hide().prev().text(_$input.val()).show();
			},
			toShowTypeSelect:function(e){
				$(e.node).find("label").hide().next().show().focus();
			},
			toHideTypeSelect:function(e){
				var _$select = $(e.node);
				_$select.hide().prev().text(_$select.find("option:selected").val()).show();
			},
			toShowDeptSelect:function(e){
				$(e.node).find("label").hide().next().show().focus();
			},
			toHideDeptInput:function(e){
				var _$input = $(e.node);
				_$input.hide().prev().text(_$input.val()).show();
			},
			toShowDaySelect:function(e){
				$(e.node).find("label").hide().next().show().focus();
			},
			toHideDaySelect:function(e){
				var _$select = $(e.node);
				_$select.hide().prev().text(_$select.find("option:selected").val()).show();
			}
			
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(meetAttd.init);