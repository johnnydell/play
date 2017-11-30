var uploader = function(){
	function init(){
		var root = manager.root;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "uploader", "../../");
			},
			oncomplete: function(){
				
			}
			
		});
		
		
		ractive.on({
			//upload layout static page
			uploadLayoutPage : function () {
				$("#form_layout_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html(data.info);
                        $("#result_layout").html(data.result);
                        $("#time_layout").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/layout', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
				
			},
			
			//upload balance static page
			uploadBalancePage : function () {
				$("#form_balance_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html(data.info);
                        $("#result_balance").html(data.result);
                        $("#time_balance").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/balance', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
				
			}
			
		});
				
	}
	
	return {
		init:init
	}
}();
$(document).ready(uploader.init);