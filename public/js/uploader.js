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
				//init click event - Layout
				
	             $("#avatval_layout").click(function(){
	                 $("#layout_upload").trigger('click');
	             });
	             $("#layout_upload").change(function(){
	                 $("#avatval_layout").val($(this).val());
	             });
	             
	           //init click event - Balance
	             $("#avatval_balance").click(function(){
	                 $("#balance_upload").trigger('click');
	             });
	             $("#balance_upload").change(function(){
	                 $("#avatval_balance").val($(this).val());
	             });
	             
	             
	             //init click event - Problem Solved Sheet
	             $("#avatval_pss").click(function(){
	                 $("#pss_upload").trigger('click');
	             });
	             $("#pss_upload").change(function(){
	                 $("#avatval_pss").val($(this).val());
	             });
	             
	           //init click event - OEE_PDCA
	             $("#avatval_oeepdca").click(function(){
	                 $("#oeepdca_upload").trigger('click');
	             });
	             $("#oeepdca_upload").change(function(){
	                 $("#avatval_oeepdca").val($(this).val());
	             });
	             
	           //init click event - 5S
	             $("#avatval_5s").click(function(){
	                 $("#5s_upload").trigger('click');
	             });
	             $("#5s_upload").change(function(){
	                 $("#avatval_5s").val($(this).val());
	             });
	             
	           //init click event - 5m1e
	             $("#avatval_5m1e").click(function(){
	                 $("#5m1e_upload").trigger('click');
	             });
	             $("#5m1e_upload").change(function(){
	                 $("#avatval_5m1e").val($(this).val());
	             });
	             
	           //init click event - Training_Matrix
	             $("#avatval_train_matrix").click(function(){
	                 $("#train_matrix_upload").trigger('click');
	             });
	             $("#train_matrix_upload").change(function(){
	                 $("#avatval_train_matrix").val($(this).val());
	             });
	           
	           //init click event - Checklist
	             $("#avatval_checklist").click(function(){
	                 $("#checklist_upload").trigger('click');
	             });
	             $("#checklist_upload").change(function(){
	                 $("#avatval_checklist").val($(this).val());
	             });
			}
			
		});
		
		
		ractive.on({
			//upload layout static page
			uploadLayoutPage : function () {
				$("#form_layout_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_layout").html($.i18n.map[data.result]);
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
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_balance").html($.i18n.map[data.result]);
                        $("#time_balance").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/balance', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
				
			},
			
			//upload Problem Solved Sheet static page
			uploadPssPage : function () {
				$("#form_pss_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_pss").html($.i18n.map[data.result]);
                        $("#time_pss").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/pss', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
				
			},
			
			//upload OEE_PDCA static page
			uploadOeePdcaPage : function () {
				$("#form_oeepdca_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_oeepdca").html($.i18n.map[data.result]);
                        $("#time_oeepdca").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/oeepdca', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
				
			},
			
			//upload 5S static page
			upload5sPage : function () {
				$("#form_5s_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_5s").html($.i18n.map[data.result]);
                        $("#time_5s").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/5s', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
				
			},
			
			//upload 5S static page
			upload5m1ePage : function () {
				$("#form_5m1e_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_5m1e").html($.i18n.map[data.result]);
                        $("#time_5m1e").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/5m1e', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
				
			},
			
			//upload Training_Matrix static page
			uploadTrainMatrixPage : function () {
				$("#form_trainmatrix_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_trainmatrix").html($.i18n.map[data.result]);
                        $("#time_trainmatrix").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/trainmatrix', /*设置post提交到的页面*/
                    type: "post", /*设置表单以post方法提交*/
                    dataType: "json" /*设置返回值类型为文本*/
                });
			},
			
			//upload checklist static page
			uploadChecklistPage : function () {
				$("#form_checklist_upload").ajaxSubmit({
                    success: function (data) {
                        $("#msg_info").html($.i18n.map[data.info]);
                        $("#result_checklist").html($.i18n.map[data.result]);
                        $("#time_checklist").html(data.last_update_time);
                    },
                    error: function (error) {console.log(error); },
                    url: root + '/views/upload/uploadFile/checklist', /*设置post提交到的页面*/
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