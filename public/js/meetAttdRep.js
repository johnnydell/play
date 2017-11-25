var meetAttdRep = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "meetAttdRep", "../../");
			},
			oncomplete: function(){
			}
		});
		
		ractive.on({
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(meetAttdRep.init);