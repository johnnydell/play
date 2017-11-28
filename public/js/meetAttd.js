var meetAttd = function(){
	function init(){
		var attendees = [];
		var deletedAttendees =[];
		var days = [
			{d:1,v:"X",s:'0'},
			{d:2,v:"E",s:'0'},
			{d:3,v:"E",s:'0'},
			{d:4,v:"E",s:'1'},
			{d:5,v:"E",s:'1'},
			{d:6,v:"E",s:'0'},
			{d:7,v:"E",s:'0'},
			{d:8,v:"E",s:'0'},
			{d:9,v:"E",s:'0'},
			{d:10,v:"E",s:'0'},
			{d:11,v:"E",s:'0'},
			{d:12,v:"E",s:'1'},
			{d:13,v:"E",s:'1'},
			{d:14,v:"E",s:'0'},
			{d:15,v:"E",s:'0'},
			{d:16,v:"E",s:'0'},
			{d:17,v:"E",s:'0'},
			{d:18,v:"E",s:'0'},
			{d:19,v:"E",s:'1'},
			{d:20,v:"E",s:'1'},
			{d:21,v:"E",s:'0'},
			{d:22,v:"E",s:'0'},
			{d:23,v:"E",s:'0'},
			{d:24,v:"E",s:'0'},
			{d:25,v:"E",s:'0'},
			{d:26,v:"E",s:'1'},
			{d:27,v:"E",s:'1'},
			{d:28,v:"E",s:'0'},
			{d:29,v:"E",s:'0'},
			{d:30,v:"E",s:'0'},
			{d:31,v:"E",s:'0'}
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
				console.log(attendees[0].days[3]);
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