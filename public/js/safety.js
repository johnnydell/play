var safety = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root,lineName:lineName, lineId:lineId},
			onrender: function(){
				manager.loadProperties(this, "safety", "../../");
				manager.loadProperties(this, "common", "../../");
			},
			oncomplete: function(){		
				manager.setMenuBar("sy");
				safetyReport.init();
			}
		});
		
		
		ractive.on({
			switchToEdit:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				
				safetyEdit.init();
			},
			switchToReport:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				safetyReport.init();
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(safety.init);