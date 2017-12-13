var meetAttd = function(){
	function init(){
		var attendees = [];
		var deletedAttendees =[];
		var years = ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
		var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
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
				this.set("years",years);
				this.set("months",months);
				this.set("currYear","2017");
				this.set("currMonth","12");
			},
			oncomplete: function(){
				
				/*var attendee1 = {id:"0",checked:false,name:"",type:"R",dept:"",days:days};
				attendees.push(attendee1);
				var attendee2 = {id:"0",checked:false,name:"",type:"R",dept:"",days:days};
				attendees.push(attendee2);
				ractive.set("attendees",attendees);*/
			}
		});
		
		ractive.on({
			toSignIn:function(){
				location.href = "meetAttdSignIn.html";
			},
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
				var attendee = {id:"0",checked:false,name:"",type:"R",dept:"",days:days};
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
	
	return {
		init:init
	}
}();
$(document).ready(meetAttd.init);