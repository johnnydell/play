var index = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {language:manager.getLanguage(),root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "index", "../");
			},
			oncomplete: function(){
				manager.setMenuBar("cd");
			}
		});
		
		ractive.on({
			setLanguage:function(e){
				var language = $(e.node).val();
				manager.setLanguage(language);
				window.location.reload();
			},
			gotoMOE2:function(){
				window.location.href=manager.root+"/views/lines.html";
			}
		})
		
	}
	
	return {
		init:init
	}
}();
$(document).ready(index.init);