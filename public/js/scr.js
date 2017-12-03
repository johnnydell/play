var scr = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "scr", "../");
				manager.setMenuBar("scr");
			},
			oncomplete: function(){	
			    
			}
		});
	}
	
	return {
		init:init
	}
}();
$(document).ready(scr.init);