var staticpage = function(){
	function init(){
		var pagename;
		var root=manager.root;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "staticpage", "../../");
				pagename = manager.getPV("pageName");
				console.log("pagename=" + pagename);
			},
			oncomplete: function(){
				$.ajax({
					url		: '/edashboard/views/staticpage/viewdoc/' + pagename,
					type	: 'post',
					data	: '',
					success: function(json)
					{
						console.log(json);
						$("#pdfviewer").css("display", "").css("width", "100%").css("height", "600");
						$("#pdfviewer").attr("src", root + "/" + json);
						
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