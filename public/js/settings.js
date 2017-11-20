var settings = function(){
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
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(settings.init);