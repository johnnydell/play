var board2 = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var ractive = null;
	var sysParam = manager.getSystemParams();
	var uploadList = common.getLastUploadList();
	var expired_days_5m1e = 0;
	var expired_days_5s = 0;
	var expired_days_trainmatrix = 0;
	var date_gap_5m1e = 0;
	var date_gap_5s = 0;
	var date_gap_trainmatrix = 0;
	function init(){
	   
	   $.get(manager.root+"/views/board2.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root,lineName:lineName, lineId:lineId},
	            template: template,
	            onrender: function(){
	            	manager.loadProperties(this, "boards", "../../");
				},
	            oncomplete: function(){
	            	if (!manager.isNull(sysParam["STATICPAGE"])){
	            		if (!manager.isNull(sysParam["STATICPAGE"]["5M1E"])){
	            			expired_days_5m1e = manager.isNull(sysParam["STATICPAGE"]["5M1E"].paramValue) ? 0 : parseInt(sysParam["STATICPAGE"]["5M1E"].paramValue);
	            		}
	            		if (!manager.isNull(sysParam["STATICPAGE"]["5S"])){
	            			expired_days_5s = manager.isNull(sysParam["STATICPAGE"]["5S"].paramValue) ? 0 : parseInt(sysParam["STATICPAGE"]["5S"].paramValue);
	            		}
	            		if (!manager.isNull(sysParam["STATICPAGE"]["MATRIX"])){
	            			expired_days_trainmatrix = manager.isNull(sysParam["STATICPAGE"]["MATRIX"].paramValue) ? 0 : parseInt(sysParam["STATICPAGE"]["MATRIX"].paramValue);
	            		}
	            	}
	            	var now = new Date();
	            	
	            	for(i = 0; i < uploadList.length; i ++){
	            		if (uploadList[i].fileName == 'trainmatrix'){
	            			lastUpload = uploadList[i].lastUploadTime;
	            			date_gap_trainmatrix = ( now.getTime() - parseInt(lastUpload) ) / (1000 * 60 * 60 * 24);
	            		}
	            		else if (uploadList[i].fileName == '5m1e'){
	            			lastUpload = uploadList[i].lastUploadTime;
	            			date_gap_5m1e= ( now.getTime() - parseInt(lastUpload) ) / (1000 * 60 * 60 * 24);
	            		}
	            		else if (uploadList[i].fileName == '5s'){
	            			lastUpload = uploadList[i].lastUploadTime;
	            			date_gap_5s = ( now.getTime() - parseInt(lastUpload) ) / (1000 * 60 * 60 * 24);
	            		}
	            	}
	            	
	            	ractive.set("alarm_5m1e", 		( expired_days_5m1e > date_gap_5m1e ? 0 : 1 ) );
	            	ractive.set("alarm_5s", 		( expired_days_5s > date_gap_5s ? 0 : 1 ) );
	            	ractive.set("alarm_trainmatrix", ( expired_days_trainmatrix > date_gap_trainmatrix ? 0 : 1 ) );
	            }
	        }); 
	        
	        ractive.on({
	        	
	        });
	    });
	}
	
	
		
	return {
		init:init
	}
}();