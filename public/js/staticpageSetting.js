var staticpageSetting = function(){
	var sysParam = manager.getSystemParams();
	var ractive = null;
	var static_page_balance = {id:"",value:""};
	var static_page_layout = {id:"",value:""};
	var static_page_oeepdca = {id:"",value:""};
	var static_page_5s = {id:"",value:""};
	var static_page_trainmatrix = {id:"",value:""};
	var static_page_5m1e = {id:"",value:""};
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/setting/staticpageSetting.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{
	            	root:manager.root
	            },
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "sysconfig", "../../");
					manager.loadProperties(this, "common", "../../");
					manager.loadProperties(this, "uploader", "../../");
				},
	            oncomplete: function(){
	            	manager.setMenuBar("xtsz");
	            	initStaticPageData();
	            }
	        }); 
	        
	        ractive.on({
	        	/*保存实时显示屏配置*/
	        	saveStaticPageConfig: function(e){
	        		
	        		var params = {
	        				staticPageBalance 		: static_page_balance,
	        				staticPageLayout		: static_page_layout,
	        				staticPageOeepdca		: static_page_oeepdca,
	        				staticPage5s			: static_page_5s,
	        				staticPageTrainmatrix	: static_page_trainmatrix,
	        				staticPage5m1e			: static_page_5m1e
					};
	        		
					$.ajax({
						url		: manager.root + '/sysConfig/saveStaticPageConfig',
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
				/*Only allow input number in text*/
				toValidateEditorOnlyNum:function(e){
					var val = $(e.node).val();
					$(e.node).val(val.replace(/\D/g, ''));
				},
				/*hide text, show label*/
				toHideColumnEditor:function(e){
					$(e.node).hide().prev().show();
				}
	        });
	    });
	}
	
	//取得默认结构数据
	function initStaticPageData(){
		if (!manager.isNull(sysParam["STATICPAGE"])){
    		if (!manager.isNull(sysParam["STATICPAGE"]["LAYOUT"])){
    			static_page_balance = {id:sysParam["STATICPAGE"]["LAYOUT"].id, value:sysParam["STATICPAGE"]["LAYOUT"].paramValue};
    		}
    		if (!manager.isNull(sysParam["STATICPAGE"]["BALANCE"])){
    			static_page_layout = {id:sysParam["STATICPAGE"]["BALANCE"].id, value:sysParam["STATICPAGE"]["BALANCE"].paramValue};
    		}
    		if (!manager.isNull(sysParam["STATICPAGE"]["OEEPDCA"])){
    			static_page_oeepdca = {id:sysParam["STATICPAGE"]["OEEPDCA"].id, value:sysParam["STATICPAGE"]["OEEPDCA"].paramValue};
    		}
    		if (!manager.isNull(sysParam["STATICPAGE"]["5S"])){
    			static_page_5s = {id:sysParam["STATICPAGE"]["5S"].id, value:sysParam["STATICPAGE"]["5S"].paramValue};
    		}
    		if (!manager.isNull(sysParam["STATICPAGE"]["MATRIX"])){
    			static_page_trainmatrix = {id:sysParam["STATICPAGE"]["MATRIX"].id, value:sysParam["STATICPAGE"]["MATRIX"].paramValue};
    		}
    		if (!manager.isNull(sysParam["STATICPAGE"]["5M1E"])){
    			static_page_5m1e = {id:sysParam["STATICPAGE"]["5M1E"].id, value:sysParam["STATICPAGE"]["5M1E"].paramValue};
    		}
    	}
		
		ractive.set("staticPageBalance", 		static_page_balance);
		ractive.set("staticPageLayout", 		static_page_layout);
		ractive.set("staticPageOeepdca", 		static_page_oeepdca);
		ractive.set("staticPage5s", 			static_page_5s);
		ractive.set("staticPageTrainmatrix", 	static_page_trainmatrix);
		ractive.set("staticPage5m1e", 			static_page_5m1e);
	}
	
	return {
		init:init
	}
}();