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
			}
		});
	}
	
	return {
		init:init
	}
}();
$(document).ready(scldetails.init);