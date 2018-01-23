var oeeLossSubType = function(){
	var oeeLosses = [];
	var oeeSubLosses = [];
	var lossIndex = 0;
	var ractive = null;
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/setting/oeeLossSubType.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "sysconfig", "../../");
					manager.loadProperties(this, "common", "../../");
					initLossData();
					refreshLossSubType(0,this);	
				},
	            oncomplete: function(){
	            	manager.setMenuBar("xtsz");
	            }
	        }); 
	        
	        ractive.on({
	        	switchOtherLoss: function(e){
	        		lossIndex = $(e.node).val();
	        		refreshLossSubType(lossIndex,ractive);
	        	},
	        	addLoss: function(e){
	        		var idx = e.index.idx;
	        		var subSubLoss = {id:"", lossTypeName:"", oeeLossChildType: "", lossTypeCode: "", active: 1};
	        		oeeSubLosses = oeeLosses[lossIndex].subTypes;
	        		oeeSubLosses[idx].subSubTypes.push(subSubLoss);
	        		ractive.set("oeeSubLosses", oeeSubLosses);
	        	},
	        	saveLoss: function(e){
	        		var idx = e.index.idx;
	        		oeeSubLosses = oeeLosses[lossIndex].subTypes;
	        		var params = {
	        				oeeSubLosses 	: oeeSubLosses[idx],
	        				lossId		:	oeeLosses[lossIndex].id
					};
					$.ajax({
						url		: manager.root + '/sysConfig/saveLoss',
						type	: 'post',
						data	: JSON.stringify(params),
						contentType: "application/json", 
						success: function(ret){
							if (ret == '0'){
								jAlert($.i18n.map['i18n_save_error'], $.i18n.map['i18n_error']);	
							}
							else{
								jAlert($.i18n.map['i18n_save_ok'], $.i18n.map['i18n_info']);	
								initLossData();
							}
							
						}
					})
	        	},
	        	toShowColumnEditor:function(e){
					$(e.node).children(0).hide().next().show().focus().select();
				},
				/*hide text, show label*/
				toHideColumnEditor:function(e){
					$(e.node).hide().prev().show();//.text($(e.node).val());
				},
				test:function(){
					console.log(oeeSubLosses);
				}
	        });
	    });
	}
	
	//取得默认结构数据
	function initLossData(){
		$.ajax({
			url		: manager.root + '/sysConfig/getOeeLossSubTypes',
			type	: 'GET',
			data	: '',
			async   : false,
			success: function(listdata){
				oeeLosses = listdata;
			}
    	});
	}
	
	//刷新
	function refreshLossSubType(_lossIndex,_ractive){	
		lossIndex = _lossIndex;
		oeeSubLosses = oeeLosses[lossIndex].subTypes;
		_ractive.set("oeeLosses", oeeLosses);
		_ractive.set("oeeSubLosses", oeeSubLosses);
		var tableWidth = $(".LossDetail").css("width");
		var subLossCount = oeeSubLosses.length;
		var averageWidth = Math.ceil(parseInt(tableWidth) / subLossCount);
		$(".subLossTitle").css("width", averageWidth);
	}
		
	return {
		init:init
	}
}();