var oeeLossChart6 = function(){

	var ttloss = [];	
	function init(){
	   //渲染chart6部分   
	   $.get(manager.root+"/views/tpl/board/oeeLossChart6.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	bindTable(this);
	            }
	        }); 
	    });
	}	
	
	function bindTable(rct){
		var l1 = {type:'C',color:'#CCFFFF',desc:'计划换型损失',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l2 = {type:'C',color:'#CCFFFF',desc:'非计划换型损失',months:[278,116,213,124,0,0,0,0,0,0,0,0]};
		var l3 = {type:'C',color:'#CCFFFF',desc:'电极刀片工具更换',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		
		var l4 = {type:'O',color:'#993300',desc:'O1缺人',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l5 = {type:'O',color:'#993300',desc:'O2缺料',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l6 = {type:'O',color:'#993300',desc:'O3首末中间检查和放行',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l7 = {type:'O',color:'#993300',desc:'O4更换原材料',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l8 = {type:'O',color:'#993300',desc:'O5非计划TPM损失',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l9 = {type:'O',color:'#993300',desc:'O6非计划样品',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l10 = {type:'O',color:'#993300',desc:'O7新员工培训',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		var l11 = {type:'O',color:'#993300',desc:'O8其他损失',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
									
		var l12 = {type:'T',color:'#3366FF',desc:'设备停机损失',months:[922,495,790,215,0,0,0,0,0,0,0,0]};	
		var l13 = {type:'T',color:'#3366FF',desc:'调试损失',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		
		var l14 = {type:'P',color:'#C0C0C0',desc:'绩效损失',months:[922,495,790,215,0,0,0,0,0,0,0,0]};	
		var l15 = {type:'P',color:'#C0C0C0',desc:'未定义损失',months:[922,495,790,215,0,0,0,0,0,0,0,0]};
		
		
		var l16 = {type:'Q',color:'#FAFA00',desc:'返工',months:[922,495,790,215,0,0,0,0,0,0,0,0]};	
		var l17 = {type:'Q',color:'#FAFA00',desc:'报废',months:[922,495,790,215,0,0,0,0,0,0,0,0]};	
		
		ttloss.push(l1,l2,l3,l4,l5,l6,l7,l8,l9,l11,l12,l13,l14,l15,l16,l17);
		rct.set("ttloss",ttloss)		
	}
		
	return {
		init:init
	}
}();