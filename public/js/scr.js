var scr = function(){
	function init(){
		var data;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "scr", "../");
				manager.setMenuBar("scr");
			},
			oncomplete: function(){	
				data = {
						currType:'8888888888-2Y8',
						currJP:'15',
						currRS:'12',
						planCC:'500',
						actualCC:'501',
						diff:'+1',
						oee:'85%',
						nextType:'6666666666-6SB',
						nextJP:'15',
						nextRS:'12'
				}
				
				this.set("data",data);
				
			}
		});
		
		ractive.on({
			toShowEditor:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideEditor:function(e){
				$(e.node).hide().prev().text($(e.node).val()).show();
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(scr.init);