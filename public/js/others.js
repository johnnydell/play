var others = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template"
		});
	}
	
	return {
		init:init
	}
}();
$(document).ready(others.init);