var oee = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "oee", "../../");
			},
			oncomplete: function(){	
				oeeChart1.init();
				oeeChart2.init();
			}
		});
	}
	
	return {
		init:init
	}
}();
$(document).ready(oee.init);