var others = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			onrender: function(){
				manager.loadProperties(this, "others", "../");
			},
			oncomplete: function(){
			}
		});
	}
	
	return {
		init:init
	}
}();
$(document).ready(others.init);