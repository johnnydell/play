var staticpage = function(){
	function init(){
		var pagename = manager.getPV("pageName");;
		var root=manager.root;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {
				root:manager.root,
				pageName : pagename
				},
			onrender: function(){
				manager.loadProperties(this, "staticpage", "../../");
				console.log("pagename=" + pagename);
			},
			oncomplete: function(){
				$.ajax({
					url		: manager.root + '/views/staticpage/viewdoc/' + pagename,
					type	: 'post',
					data	: '',
					success: function(ret)
					{
						if (ret == "0"){
							$("#msginfo").html(pagename + " was not uploaded before, please go to upload page.");
							$("#uploadURL").css("display", "");
						}else{
							$("#pdfviewer").css("display", "").css("width", "100%").css("height", "800");
							$("#pdfviewer").attr("src", root + "/" + ret);
						}
					}
				});
			}
			
		});
		
		
		ractive.on({
			testtest : function () {
				console.log("test");
				
			}
		});
				
	}
	
	return {
		init:init
	}
}();
$(document).ready(staticpage.init);