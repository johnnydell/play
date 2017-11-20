var index = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "index", "../");
				console.log("render");
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
$(document).ready(index.init);