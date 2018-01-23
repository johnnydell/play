var scl = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "scl", "../");
			},
			oncomplete: function(){
				manager.setMenuBar("sy");
			}
		});
		
		ractive.on({
		   cpplEvt:function(){
		     location.href = "lines.html";
		   }
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(scl.init);