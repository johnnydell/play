var kpiscrap = function(){
	var lineSTGdata = [];
	var lineROGdata = [];
	var lineRECdata = [];
	var lineFAGdata = [];
	var ractive = null;
	function init(){
		ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {
				uppercase		: function(val){
					return val.toUpperCase();
				}
			},
			onrender: function(){
				manager.loadProperties(this, "common", "../../");
				
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
		var lineSTGdata = [];
		var lineROGdata = [];
		var lineRECdata = [];
		var lineFAGdata = [];
		$.ajax({
			url		: manager.root + '/sysConfig/getProductLine',
			type	: 'GET',
			data	: '',
			async   : false,
			success: function(listdata){
				console.log(listdata);
				var lineObj = {id : "", name : ""};
				
				for (i = 0; i < listdata.length; i ++){
					if (listdata[i].lineName.toUpperCase().indexOf("STG") != -1){
						lineSTGdata.push(listdata[i]);
					}
					else if (lineObj.name.indexOf("ROG") != -1){
						lineROGdata.push(listdata[i]);
					}
					else if (lineObj.name.indexOf("REC") != -1){
						lineRECdata.push(listdata[i]);
					}
					else {
						lineFAGdata.push(listdata[i]);
					}
					
				}
				ractive.set("lineSTGdata", lineSTGdata);
				ractive.set("lineROGdata", lineROGdata);
				ractive.set("lineRECdata", lineRECdata);
				ractive.set("lineFAGdata", lineFAGdata);
			}
    	});
	}
	
	return {
		init:init
	}
}();
$(document).ready(kpiscrap.init);