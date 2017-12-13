var index = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {language:manager.getLanguage()},
			onrender: function(){
				manager.loadProperties(this, "index", "../");
			},
			oncomplete: function(){		
				
			}
		});
		
		ractive.on({
			setLanguage:function(e){
				var language = $(e.node).val();
				manager.setLanguage(language);
			}
		})
		
	}
	
	return {
		init:init
	}
}();
$(document).ready(index.init);