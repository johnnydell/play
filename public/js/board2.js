var board2 = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var ractive = null;
	function init(){
	   
	   $.get(manager.root+"/views/board2.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root,lineName:lineName, lineId:lineId},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "common", "../");
					
				},
	            oncomplete: function(){}
	        }); 
	        
	        ractive.on({
	        	
	        });
	    });
	}
	
	
		
	return {
		init:init
	}
}();