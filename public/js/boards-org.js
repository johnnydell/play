var boards = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "boards", "../");
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
$(document).ready(boards.init);