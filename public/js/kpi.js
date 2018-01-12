var kpi = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "kpi", "../");
			},
			oncomplete: function(){
			}
		});
		
		ractive.on({
		   cpplEvt:function(){
		     location.href = "lines.html";
		   }
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(kpi.init);