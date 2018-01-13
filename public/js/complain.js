var complain = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var lines = common.getAllLines();
	var types = common.getComplainType();
	var years = manager.years();
	var months = manager.months;
	var limits = permission.load("complain");
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root,lineName:lineName, lineId:lineId},
			onrender: function(){
				manager.loadProperties(this, "complain", "../../");
			},
			oncomplete: function(){		
				complainIn.init();
			}
		});
		
		
		ractive.on({
			switchToIn:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");				
				complainIn.init();
			},
			switchToOut:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				complainOut.init();
			}
		})
	}
	
	return {
		init:init,
		lines:lines,
		types:types,
		years:years,
		months:months,
		limits:limits
	}
}();
$(document).ready(complain.init);