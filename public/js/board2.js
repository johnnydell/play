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
					manager.loadProperties(this, "safety", "../");
					manager.loadProperties(this, "complain", "../");
					manager.loadProperties(this, "hourlycount", "../");
				},
	            oncomplete: function(){}
	        }); 
	        
	        ractive.on({
	        	linkToChkList: function(){
	        		console.log("test");
	        		if (window.ActiveXObject){  
	        		    var openDocObj = new ActiveXObject("SharePoint.OpenDocuments.1");  
	        		    openDocObj.EditDocument(manager.root+"/excel/14qchklist/14Q_checklist.xlsx");
	        		}  
	        		else{
	        			jAlert($.i18n.map['i18n_explorer_not_support'], $.i18n.map['i18n_error']);	
	        			return;
	        		}
	        	}
	        });
	    });
	}
	
	
		
	return {
		init:init
	}
}();