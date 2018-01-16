var productivity = function(){
	var type = manager.getPV("type");
	type = (type == '' ? 'safety' : type);
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
				uppercase : function(val){
					return val.toUpperCase();
				}
			},
			onrender: function(){
				manager.loadProperties(this, "kpiLines", "../../");
			},
			oncomplete: function(){
				initLineData();
			}
		});
		
		ractive.on({
			gotoKip:function(e){
				var url = "";
				var lineId = e.context.id;
				var lineName = e.context.lineName;
				switch(type){
			       case 'safety':
			    	   url = manager.root+"/views/tpl/kpi/kpiSafetyReport.html?lineName="+lineName + "&lineId=" + lineId;
			       	  break;
			       case 'complain':
			    	  url = manager.root+"/views/kpi/complainRep.html?lineId="+lineId+"&lineName="+lineName;
			          break;
			       case 'scrap':
			    	   url = manager.root+"/views/tpl/kpi/kpiScrapReport.html?lineName="+lineName + "&lineId=" + lineId;
			       	  break;
			       case 'delivery':
			    	   url = manager.root+"/views/tpl/kpi/deliveryReport.html?lineName="+lineName + "&lineId=" + lineId;
			          break; 
			       case 'productivity':
			    	  url = manager.root+"/views/tpl/kpi/productivityReport.html?lineName="+lineName + "&lineId=" + lineId;
			          break; 
			     }
		         window.location.href = url;
		   },
		   gotoKipSummary:function(e){
				var url = "";
				var lineId = e.context.id;
				var lineName = e.context.lineName;
				switch(type){
			       case 'safety':
			    	   url = manager.root+"/views/tpl/kpi/kpiSafetySummaryReport.html";
			       	  break;
			       case 'complain':
			    	  url = manager.root+"/views/kpi/complainRep.html?lineId="+lineId+"&lineName="+lineName + "&lineId=" + lineId;
			          break;
			       case 'scrap':
			    	  url = "";
			       	  break;
			       case 'delivery':
			    	   url = manager.root+"/views/tpl/kpi/deliverySummaryReport.html";
			          break; 
			       case 'productivity':
			    	  url = manager.root+"/views/tpl/kpi/prodSummaryReport.html";
			          break; 
			     }
		         window.location.href = url;
		   },
		});
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
				var lineObj = {id : "", name : ""};
				for (i = 0; i < listdata.length; i ++){
					if (listdata[i].lineName.toUpperCase().indexOf("STG") != -1){
						lineSTGdata.push(listdata[i]);
					}
					else if (listdata[i].lineName.toUpperCase().indexOf("ROG") != -1){
						lineROGdata.push(listdata[i]);
					}
					else if (listdata[i].lineName.toUpperCase().indexOf("REC") != -1){
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
$(document).ready(productivity.init);