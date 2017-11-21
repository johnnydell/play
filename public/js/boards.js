var boards = function(){
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
$(document).ready(boards.init);