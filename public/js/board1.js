var board1 = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "board1", "../");
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
$(document).ready(board1.init);