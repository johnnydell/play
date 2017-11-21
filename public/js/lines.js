var lines = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "lines", "../");
			},
			oncomplete: function(){
				console.log("sdfsdf");
			}
		});
		
		ractive.on({
		   kpiplEvt:function(){
		     location.href = "kpi.html";
		   }
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(lines.init);