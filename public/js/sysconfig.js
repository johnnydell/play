var sysconfig = function(){
	
	function init(){
		
		
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "sysconfig", "../../");
				manager.loadProperties(this, "common", "../../");
				
				
			},
			oncomplete: function(){	
				manager.setMenuBar("xtsz");
				oeeLossSubType.init();
			}
		});
		
		ractive.on({
			
			switchToSysConfig:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				oeeLossSubType.init();
			},
			switchToDisplay:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				screenSetting.init();
			},
			switchToLine:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				lineSetting.init();
			},
			switchToStaticPage:function(e){
				$("#tabs li").attr("id","");
				$(e.node).parent().attr("id", "current");
				staticpageSetting.init();
			},
			
		})
	}
	

	
	
	return {
		init:init
	}
}();
$(document).ready(sysconfig.init);