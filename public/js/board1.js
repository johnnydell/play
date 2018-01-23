var board1 = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var ractive = null;
	var sysParam = manager.getSystemParams();
	var uploadList = common.getLastUploadList();
	var expired_days_balance = 0;
	var expired_days_layout = 0;
	var expired_days_oeepdca = 0;
	var date_gap_layout = 0;
	var date_gap_balance = 0;
	var date_gap_oeepdca = 0;
	function init(){
	   
	   $.get(manager.root+"/views/board1.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root,lineName:lineName, lineId:lineId},
	            template: template,
	            onrender: function(){
	            	manager.loadProperties(this, "boards", "../../");
	            },
	            oncomplete: function(){
	            	if (!manager.isNull(sysParam["STATICPAGE"])){
	            		if (!manager.isNull(sysParam["STATICPAGE"]["LAYOUT"])){
	            			expired_days_balance = manager.isNull(sysParam["STATICPAGE"]["LAYOUT"].paramValue) ? 0 : parseInt(sysParam["STATICPAGE"]["LAYOUT"].paramValue);
	            		}
	            		if (!manager.isNull(sysParam["STATICPAGE"]["BALANCE"])){
	            			expired_days_layout = manager.isNull(sysParam["STATICPAGE"]["BALANCE"].paramValue) ? 0 : parseInt(sysParam["STATICPAGE"]["BALANCE"].paramValue);
	            		}
	            		if (!manager.isNull(sysParam["STATICPAGE"]["OEEPDCA"])){
	            			expired_days_oeepdca = manager.isNull(sysParam["STATICPAGE"]["OEEPDCA"].paramValue) ? 0 : parseInt(sysParam["STATICPAGE"]["OEEPDCA"].paramValue);
	            		}
	            	}
	            	var now = new Date();
	            	
	            	for(i = 0; i < uploadList.length; i ++){
	            		if (uploadList[i].fileName == 'oeepdca'){
	            			lastUpload = uploadList[i].lastUploadTime;
	            			date_gap_oeepdca = ( now.getTime() - parseInt(lastUpload) ) / (1000 * 60 * 60 * 24);
	            		}
	            		else if (uploadList[i].fileName == 'balance'){
	            			lastUpload = uploadList[i].lastUploadTime;
	            			date_gap_balance = ( now.getTime() - parseInt(lastUpload) ) / (1000 * 60 * 60 * 24);
	            		}
	            		else if (uploadList[i].fileName == 'layout'){
	            			lastUpload = uploadList[i].lastUploadTime;
	            			date_gap_layout = ( now.getTime() - parseInt(lastUpload) ) / (1000 * 60 * 60 * 24);
	            		}
	            	}
	            	
	            	ractive.set("balance_alarm", ( expired_days_balance > date_gap_balance ? 0 : 1 ) );
	            	ractive.set("oeepdca_alarm", ( expired_days_oeepdca > date_gap_oeepdca ? 0 : 1 ) );
	            	ractive.set("layout_alarm", ( expired_days_layout > date_gap_layout ? 0 : 1 ) );
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