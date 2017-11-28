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
			openExcel:function(){
				var openDocObj; 
				openDocObj = new ActiveXObject("SharePoint.OpenDocuments.1"); 
				openDocObj.ViewDocument(manager.root+"/files/2.8_layout布局图.xls"); 
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(boards.init);