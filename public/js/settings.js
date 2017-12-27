var settings = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "settings", "../");
			},
			oncomplete: function(){
			}
		});
		
		ractive.on({		
			toFuncMgt:function(){
				location.href=manager.root+"/views/settings/func.html";
			},
			toRoleMgt:function(){
				location.href=manager.root+"/views/settings/role.html";
			},
			/*
			toUpload:function(){
				location.href=manager.root+"/views/settings/uploader.html";
			}
			,
			*/
			
			toSysConfig:function(){
				location.href=manager.root+"/views/settings/sysconfig.html";
			},
			toProductType:function(){
				location.href=manager.root+"/views/settings/productType.html";
			},
			toHCConfig:function(){
				location.href=manager.root+"/views/settings/hcConfig.html";
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(settings.init);