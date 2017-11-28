var oeeLoss = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "oeeLoss", "../../");
			},
			oncomplete: function(){	
				oeeLossChart1.init();
				oeeLossChart2.init();
				oeeLossChart3.init();
				oeeLossChart4.init();
				oeeLossChart5.init();
			}
		});
	}
	
	return {
		init:init
	}
}();
$(document).ready(oeeLoss.init);