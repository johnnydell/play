var boards = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root,lineName:lineName, lineId:lineId},
			onrender: function(){
				manager.loadProperties(this, "boards", "../../");
				
			},
			oncomplete: function(){	
				manager.setMenuBar("sy");
				board1.init();
			}
		});
		
		
		ractive.on({
			switchToBoard1:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				
				board1.init();
			},
			switchToBoard2:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				board2.init();
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(boards.init);