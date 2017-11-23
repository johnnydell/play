var meetAttd = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "meetAttd", "../../");
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
$(document).ready(meetAttd.init);