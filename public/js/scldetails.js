var scldetails = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "scldetails", "../");
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
$(document).ready(scldetails.init);