var meetAttd = function(){
	function init(){
		var attendees = [];
		var days = {
				d1:"X",
				d2:"X",
				d3:"X",
				d4:"X",
				d5:"X",
				d6:"X",
				d7:"X",
				d8:"X",
				d9:"X",
				d10:"X",
				d11:"X",
				d12:"X",
				d13:"X",
				d14:"X",
				d15:"X",
				d16:"X",
				d17:"X",
				d18:"X",
				d19:"X",
				d20:"X",
				d21:"X",
				d22:"X",
				d23:"X",
				d24:"X",
				d25:"X",
				d26:"X",
				d27:"X",
				d28:"X",
				d29:"X",
				d30:"X",
				d31:"X"
		}
		
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "meetAttd", "../../");
			},
			oncomplete: function(){
				
				/*var attendee = {name:"zzj",type:"R",dept:"SG/XXX",days:days};
				var attendees = [attendee];
				ractive.set("attendees",attendees);*/
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
				var attendee = {id:(attendees.length),name:"Newer",type:"R",dept:"",days:days};
				attendees.push(attendee);
				ractive.set("attendees",attendees);
			},
			test:function(){
				console.log(attendees[0].name);
			},
			toShowNameInput:function(){
				console.log(event.context);
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(meetAttd.init);