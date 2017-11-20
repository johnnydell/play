var moe2 = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				//manager.loadProperties(this, "index", "../");
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
$(document).ready(moe2.init);