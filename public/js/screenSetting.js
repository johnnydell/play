var screenSetting = function(){
	var sysParam = manager.getSystemParams();
	
	var screenTimeInterval = {id:"", value:0};
	
	var screenColorGreen = {id:"", value:0};
	
	var screenColorYellow = {id:"", value_min:0,value_max:0};
	
	var screenColorRed = {id:"", value:0};
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/setting/screenSetting.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{
	            	root:manager.root,
	            	timeInterval:screenTimeInterval,
	            	colorGreen:screenColorGreen,
	            	colorYellow:screenColorYellow,
	            	colorRed: screenColorRed
	            },
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "sysconfig", "../../");
					manager.loadProperties(this, "common", "../../");
					//initLossData();
					//refreshLossSubType(0,this);	
				},
	            oncomplete: function(){
	            	//console.log(sysParam);
	            	if (!manager.isNull(sysParam["SCREEN"])){
	            		if (!manager.isNull(sysParam["SCREEN"]["TIME_INTERVAL"])){
	            			screenTimeInterval = {id:sysParam["SCREEN"]["TIME_INTERVAL"].id, value:sysParam["SCREEN"]["TIME_INTERVAL"].paramValue};
	            		}
	            		if (!manager.isNull(sysParam["SCREEN"]["COLOR_GREEN"])){
	            			screenColorGreen = {id:sysParam["SCREEN"]["COLOR_GREEN"].id, value:sysParam["SCREEN"]["COLOR_GREEN"].paramValue};
	            		}
	            		if (!manager.isNull(sysParam["SCREEN"]["COLOR_YELLOW"])){
	            			var color_yellow = sysParam["SCREEN"]["COLOR_YELLOW"];
	            			screenColorYellow.id = color_yellow.id;
	            			screenColorYellow.value = color_yellow.paramValue;
	            			if (!manager.isNull(color_yellow.paramValue)){
	    	            		screenColorYellow.value_min=color_yellow.paramValue.split(",")[0];
	    	            		screenColorYellow.value_max=color_yellow.paramValue.split(",")[1];
	    	            	}
	            		}
	            		if (!manager.isNull(sysParam["SCREEN"]["COLOR_RED"])){
	            			screenColorRed = {id:sysParam["SCREEN"]["COLOR_RED"].id, value:sysParam["SCREEN"]["COLOR_RED"].paramValue};
	            		}
	            	}
	            	
	            	this.set("timeInterval", screenTimeInterval);
	            	this.set("colorGreen", screenColorGreen);
	            	this.set("colorYellow", screenColorYellow);
	            	this.set("colorRed", screenColorRed);
	            }
	        }); 
	        
	        ractive.on({
	        	/*保存实时显示屏配置*/
	        	saveScreenConfig: function(e){
	        		
	        		var params = {
	        				screenTimeInterval 	: screenTimeInterval,
	        				screenColorGreen	: screenColorGreen,
	        				screenColorYellow	: screenColorYellow,
	        				screenColorRed		: screenColorRed
					};
	        		if (manager.isNull(screenTimeInterval.value)){
	        			jAlert($.i18n.map['i18n_required'], $.i18n.map['i18n_error']);
	        			$("#intervalTd").css("border-color", "red");
	        			return false;
	        		}
	        		else{
	        			$("#intervalTd").css("border-color", "#000");
	        		}
	        		if (manager.isNull(screenColorGreen.value)){
	        			jAlert($.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
	        			$("#greenTd").css("border-color", "red");
	        			return false;
	        		}else{
	        			$("#greenTd").css("border-color", "#000");
	        		}
	        		if (manager.isNull(screenColorYellow.value_min)){
	        			jAlert($.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
	        			$("#yellowMinTd").css("border-color", "red");
	        			return false;
	        		}else{
	        			$("#yellowMinTd").css("border-color", "#000");
	        		}
	        		if (manager.isNull(screenColorYellow.value_max)){
	        			jAlert($.i18n.map['i18n_required'], $.i18n.map['i18n_error']);
	        			$("#yellowMaxTd").css("border-color", "red");
	        			return false;
	        		}else{
	        			$("#yellowMaxTd").css("border-color", "#000");
	        		}
	        		if (manager.isNull(screenColorRed.value)){
	        			jAlert($.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
	        			$("#redTd").css("border-color", "red");
	        			return false;
	        		}else{
	        			$("#redTd").css("border-color", "#000");
	        		}
					$.ajax({
						url		: manager.root + '/sysConfig/saveScreenConfig',
						type	: 'post',
						data	: JSON.stringify(params),
						contentType: "application/json", 
						success: function(ret){
							if (ret == '0'){
								jAlert($.i18n.map['i18n_save_error'], $.i18n.map['i18n_error']);	
							}
							else{
								jAlert($.i18n.map['i18n_save_ok'], $.i18n.map['i18n_info']);	
								
							}
						}
					})
	        	},
	        	toShowColumnEditor:function(e){
					$(e.node).children(0).hide().next().show().focus().select();
				},
				/*hide text, show label*/
				toHideColumnEditor:function(e){
					$(e.node).hide().prev().show();
				},
				/*Only allow input number in text*/
				toValidateEditorOnlyNum:function(e){
					manager.onlyAcceptNumAndPoint(e.node);
				}
	        });
	    });
	}
	
	
	
	return {
		init:init
	}
}();