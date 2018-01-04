var board1 = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {
				root:manager.root,
				lineName:lineName,
				lineId:lineId
			},
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