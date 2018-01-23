var lineSetting = function(){
	var ractive = null;
	var lineData;
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/setting/lineSetting.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{
	            	root:manager.root
	            },
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "sysconfig", "../../");
					manager.loadProperties(this, "common", "../../");

				},
	            oncomplete: function(){
	            	manager.setMenuBar("xtsz");
	            	initLineData();
	            }
	        }); 
	        
	        ractive.on({
	        	/*保存实时显示屏配置*/
	        	saveLineConfig: function(e){
	        		
	        		var params = {
	        				lineData: lineData
					};
	        		
					$.ajax({
						url		: manager.root + '/sysConfig/saveLineConfig',
						type	: 'post',
						data	: JSON.stringify(params),
						contentType: "application/json", 
						success: function(ret){
							if (ret == '0'){
								jAlert($.i18n.map['i18n_save_error'], $.i18n.map['i18n_error']);	
							}
							else{
								jAlert($.i18n.map['i18n_save_ok'], $.i18n.map['i18n_info']);	
								initLineData();
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
				newLineConfig: function(e){
					var tmpData = {id:"",lineName:""};
					lineData.push(tmpData);
					this.update();
				}
	        });
	    });
	}
	
	//取得默认结构数据
	function initLineData(){
		$.ajax({
			url		: manager.root + '/sysConfig/getProductLine',
			type	: 'GET',
			data	: '',
			async   : false,
			success: function(listdata){
				lineData = listdata;
				ractive.set("lineData",lineData);
			}
    	});
	}
	
	return {
		init:init
	}
}();