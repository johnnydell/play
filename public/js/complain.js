var complain = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var lines = getAllLines();
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
				//complainIn.init();
			},
			switchToOut:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				//complainOut.init();
			}
		})
	}
	
	//取得所有有效的lines
	function getAllLines(){
		var ret;
		$.ajax({
			url: manager.root + "/line/getActiveList",
			type: "GET",
			async:false,
			dataType:"json",
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});
		return ret;
	}
	
	return {
		init:init,
		lines:lines
	}
}();
$(document).ready(complain.init);