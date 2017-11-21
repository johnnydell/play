var fag2 = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "boards", "../");
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
$(document).ready(fag2.init);