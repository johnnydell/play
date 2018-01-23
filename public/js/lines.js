var lines = function(){	
	var ractive = null;
	var recList = [];
	var rogList = [];
	var stgList = [];
	var fagList = [];
	function init(){
		ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "lines", "../");
			},
			oncomplete: function(){
				manager.setMenuBar("sy");
				formList();
				ractive.set("recList",recList);
				ractive.set("rogList",rogList);
				ractive.set("stgList",stgList);
				ractive.set("fagList",fagList);
			}
		});
		
		ractive.on({
		   kpiplEvt:function(){
		     location.href = "kpi.html";
		   },
		   gotoBoards:function(e){
			   window.location.href=manager.root+"/views/boards.html?lineName="+e.context.line_name+"&lineId="+e.context.line_id;
		   }
		})
	}
	
	function formList(){
		var lineData = initLineData();
		$.each(lineData,function(i,n){
			var fag_type = n.lineName.toLowerCase().indexOf("fag");
			var rec_type = n.lineName.toLowerCase().indexOf("rec");
			var rog_type = n.lineName.toLowerCase().indexOf("rog");
			var stg_type = n.lineName.toLowerCase().indexOf("stg");
			if(fag_type != -1){
				if(fagList.length == 4){
					fagList.push({line_id:0,line_name:''});
				}
				fagList.push({line_id:n.id,line_name:n.lineName});
			}
			
			if(rec_type != -1){
				if(recList.length == 4){
					recList.push({line_id:0,line_name:''});
				}
				recList.push({line_id:n.id,line_name:n.lineName});
			}
			
			if(rog_type != -1){
				if(rogList.length == 4){
					rogList.push({line_id:0,line_name:''});
				}
				rogList.push({line_id:n.id,line_name:n.lineName});
			}
			
			if(stg_type != -1){
				if(stgList.length == 4){
					stgList.push({line_id:0,line_name:''});
				}
				stgList.push({line_id:n.id,line_name:n.lineName});
			}
		})
	}
	
	//取得默认结构数据
	function initLineData(){
		var ret;
		$.ajax({
			url		: manager.root + '/sysConfig/getProductLine',
			type	: 'GET',
			data	: '',
			async   : false,
			success: function(listdata){
				ret = listdata;
			}
    	});
		return ret;
	}
	
	return {
		init:init
	}
}();
$(document).ready(lines.init);
