var staticpage = function(){
	function init(){
		var pagename = manager.getPV("pageName");
		var oplLink = manager.getPV("oplLinkName");
		var lineName = manager.getPV("lineName");
		var lineId = manager.getPV("lineId");
		var root=manager.root;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {
				root:manager.root,
				pageName : pagename,
				lineName : lineName,
				lineId	 : lineId
				},
			onrender: function(){
				manager.loadProperties(this, "staticpage", "../../");
				manager.loadProperties(this, "common", "../../");
				console.log("pagename=" + pagename);
			},
			oncomplete: function(){
				$.ajax({
					url		: manager.root + '/views/staticpage/viewdoc/' + pagename + "/" + oplLink,
					type	: 'post',
					data	: '',
					success: function(ret)
					{
						if (ret == "0"){
							$("#msginfo").html(pagename + $.i18n.map['i18n_upload_needed']);
							//$("#uploadURL").css("display", "");
							ractive.set("displayed", "none");
							ractive.set("displayed_upload", "");
						}else{
							var suffixIndex = ret.lastIndexOf(".pdf");
							var excelFileName = '', pdfFileName = '';
							if (suffixIndex == -1){
								suffixIndex = ret.lastIndexOf(".");
								pdfFileName = ret.substr(0, suffixIndex) + ".pdf";
								excelFileName = ret;
							}
							else{
								pdfFileName = ret;
							}
							$("#pdfviewer").css("display", "").css("width", "100%").css("height", "800");
							$("#pdfviewer").attr("src", root + "/" + pdfFileName);
							ractive.set("displayed", "");
							ractive.set("displayed_upload", "none");
							ractive.set("checklist_download_url", root + "/" + excelFileName);
							
							
						}
					}
				});
			}
			
		});
		
		
		ractive.on({
			downloadFile : function () {
				
				
			}
		});
				
	}
	
	return {
		init:init
	}
}();
$(document).ready(staticpage.init);