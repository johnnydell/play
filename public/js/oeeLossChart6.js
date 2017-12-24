var oeeLossChart6 = function(){
	var allTypeLoss = {};
	var ttloss = [];	
	function init(lineName, curYear){
	   //渲染chart6部分   
	   $.get(manager.root+"/views/tpl/board/oeeLossChart6.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	$.ajax({
	        			url		: manager.root + '/report/oeeloss/monthlyAllLossChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				//QualityLoss
	        				allTypeLoss.scrap_loss_total 					= listdata.scrap_loss_total;
	        				allTypeLoss.rework_loss_total 					= listdata.rework_loss_total;
	        				//TechnicalLoss
	        				allTypeLoss.breakdown_loss_total 				= listdata.breakdown_loss_total;
	        				allTypeLoss.adjustment_loss_total 				= listdata.adjustment_loss_total;
	        				//ChangeoverLoss
	        				allTypeLoss.plan_setup_loss_total 				= listdata.plan_setup_loss_total;
	        				allTypeLoss.unplan_setup_loss_total 			= listdata.unplan_setup_loss_total;
	        				allTypeLoss.exchg_tool_loss_total 				= listdata.exchg_tool_loss_total;
	        				//OrgnizationLoss
	        				allTypeLoss.lack_personnel_loss_total 			= listdata.lack_personnel_loss_total;
	        				allTypeLoss.lack_material_loss_total 			= listdata.lack_material_loss_total;
	        				allTypeLoss.test_release_three_parts_loss_total = listdata.test_release_three_parts_loss_total;
	        				allTypeLoss.exchg_material_loss_total 			= listdata.exchg_material_loss_total;
	        				allTypeLoss.unplan_tpm_loss_total 				= listdata.unplan_tpm_loss_total;
	        				allTypeLoss.unplan_sample_loss_total 			= listdata.unplan_sample_loss_total;
	        				allTypeLoss.new_operator_loss_total 			= listdata.new_operator_loss_total;
	        				allTypeLoss.others_loss_total 					= listdata.others_loss_total;
	        				//PerformanceLoss
	        				allTypeLoss.performance_loss_total 				= listdata.performance_loss_total;
	        				allTypeLoss.undefined_loss_total 				= listdata.undefined_loss_total;
	        				
	        				//plot to table
	        				var l1 = {type:'C',color:'#CCFFFF',desc:'计划换型损失',		months:allTypeLoss.plan_setup_loss_total};
	        				var l2 = {type:'C',color:'#CCFFFF',desc:'非计划换型损失',		months:allTypeLoss.unplan_setup_loss_total};
	        				var l3 = {type:'C',color:'#CCFFFF',desc:'电极刀片工具更换',	months:allTypeLoss.exchg_tool_loss_total};
	        				
	        				var l4 = {type:'O',color:'#993300',desc:'O1缺人',			months:allTypeLoss.lack_personnel_loss_total};
	        				var l5 = {type:'O',color:'#993300',desc:'O2缺料',			months:allTypeLoss.lack_material_loss_total};
	        				var l6 = {type:'O',color:'#993300',desc:'O3首末中间检查和放行',months:allTypeLoss.test_release_three_parts_loss_total};
	        				var l7 = {type:'O',color:'#993300',desc:'O4更换原材料',		months:allTypeLoss.exchg_material_loss_total};
	        				var l8 = {type:'O',color:'#993300',desc:'O5非计划TPM损失',	months:allTypeLoss.unplan_tpm_loss_total};
	        				var l9 = {type:'O',color:'#993300',desc:'O6非计划样品',		months:allTypeLoss.unplan_sample_loss_total};
	        				var l10 = {type:'O',color:'#993300',desc:'O7新员工培训',		months:allTypeLoss.new_operator_loss_total};
	        				var l11 = {type:'O',color:'#993300',desc:'O8其他损失',		months:allTypeLoss.others_loss_total};
	        											
	        				var l12 = {type:'T',color:'#3366FF',desc:'设备停机损失',		months:allTypeLoss.breakdown_loss_total};	
	        				var l13 = {type:'T',color:'#3366FF',desc:'调试损失',			months:allTypeLoss.adjustment_loss_total};
	        				
	        				var l14 = {type:'P',color:'#C0C0C0',desc:'绩效损失',			months:allTypeLoss.performance_loss_total};	
	        				var l15 = {type:'P',color:'#C0C0C0',desc:'未定义损失',		months:allTypeLoss.undefined_loss_total};
	        				
	        				
	        				var l16 = {type:'Q',color:'#FAFA00',desc:'返工',				months:allTypeLoss.scrap_loss_total};	
	        				var l17 = {type:'Q',color:'#FAFA00',desc:'报废',				months:allTypeLoss.rework_loss_total};	
	        				
	        				ttloss.push(l1,l2,l3,l4,l5,l6,l7,l8,l9,l11,l12,l13,l14,l15,l16,l17);
	        				ractive.set("ttloss",ttloss);		
	        			}
	            	});
	            	
	            }
	        }); 
	    });
	}	
	
	/*function bindTable(rct){
		var l1 = {type:'C',color:'#CCFFFF',desc:'计划换型损失',		months:allTypeLoss.plan_setup_loss_total};
		var l2 = {type:'C',color:'#CCFFFF',desc:'非计划换型损失',		months:allTypeLoss.unplan_setup_loss_total};
		var l3 = {type:'C',color:'#CCFFFF',desc:'电极刀片工具更换',	months:allTypeLoss.exchg_tool_loss_total};
		
		var l4 = {type:'O',color:'#993300',desc:'O1缺人',			months:allTypeLoss.lack_personnel_loss_total};
		var l5 = {type:'O',color:'#993300',desc:'O2缺料',			months:allTypeLoss.lack_material_loss_total};
		var l6 = {type:'O',color:'#993300',desc:'O3首末中间检查和放行',months:allTypeLoss.test_release_three_parts_loss_total};
		var l7 = {type:'O',color:'#993300',desc:'O4更换原材料',		months:allTypeLoss.exchg_material_loss_total};
		var l8 = {type:'O',color:'#993300',desc:'O5非计划TPM损失',	months:allTypeLoss.unplan_tpm_loss_total};
		var l9 = {type:'O',color:'#993300',desc:'O6非计划样品',		months:allTypeLoss.unplan_sample_loss_total};
		var l10 = {type:'O',color:'#993300',desc:'O7新员工培训',		months:allTypeLoss.new_operator_loss_total};
		var l11 = {type:'O',color:'#993300',desc:'O8其他损失',		months:allTypeLoss.others_loss_total};
									
		var l12 = {type:'T',color:'#3366FF',desc:'设备停机损失',		months:allTypeLoss.breakdown_loss_total};	
		var l13 = {type:'T',color:'#3366FF',desc:'调试损失',			months:allTypeLoss.adjustment_loss_total};
		
		var l14 = {type:'P',color:'#C0C0C0',desc:'绩效损失',			months:allTypeLoss.performance_loss_total};	
		var l15 = {type:'P',color:'#C0C0C0',desc:'未定义损失',		months:allTypeLoss.undefined_loss_total};
		
		
		var l16 = {type:'Q',color:'#FAFA00',desc:'返工',				months:allTypeLoss.scrap_loss_total};	
		var l17 = {type:'Q',color:'#FAFA00',desc:'报废',				months:allTypeLoss.rework_loss_total};	
		
		ttloss.push(l1,l2,l3,l4,l5,l6,l7,l8,l9,l11,l12,l13,l14,l15,l16,l17);
		rct.set("ttloss",ttloss);		
	}*/
		
	return {
		init:init
	}
}();