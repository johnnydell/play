var moe2SCL2 = function(){
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
	}
	
	return {
		init:init
	}
}();
$(document).ready(moe2SCL2.init);