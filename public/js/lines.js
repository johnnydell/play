var lines = function(){
	var lineData;
	var ractive = null;
	function init(){
		ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "lines", "../");
			},
			oncomplete: function(){
				initLineData();
			}
		});
		
		ractive.on({
		   kpiplEvt:function(){
		     location.href = "kpi.html";
		   }
		})
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
$(document).ready(lines.init);