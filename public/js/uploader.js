var uploader = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "uploader", "../../");
			},
			oncomplete: function(){
				
			}
			
		});
		
		
		ractive.on({
			testtest : function () {
				console.log("test");
				
			}
		});
				
	}
	
	return {
		init:init
	}
}();
$(document).ready(uploader.init);