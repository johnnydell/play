var opl = function(){
	function init(){
		var opl = [];
		var deletedOPL =[];
		var years = ['2016','2017','2018'];
		var month = '04';
		var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
		var days = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
		
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "opl", "../../");
				this.set("years",years);
				this.set("months",months);
				this.set("month",month);
				this.set("days",days);
				var op1 = {
						id:"0",
						checked:false,
						date:"2017-04-02",
						refNo:"BH001",
						personFound:"ZANSANG",
						station:'001',
						description:'sadfs dsaf a 你好！',
						dtFrom:'18:15',
						dtTo:'18:15',
						timing:'3',
						amt:'12',
						rootCause:'sdafdasfdasfdasfdsfdsf',
						immediate:'sdfasfdfexeafe sdfdfe ',
						longTerm:'1111',
						problemSolvingSheet:'Y',
						responsible:'zhangsan',
						deadline:'2017-04-02',
						status:'N'						
					};
				opl.push(op1);
				var op2 = {
						id:"0",
						checked:false,
						date:"2017-04-02",
						refNo:"BH001",
						personFound:"ZANSANG",
						station:'001',
						description:'sadfs dsaf a 你好！',
						dtFrom:'18:15',
						dtTo:'18:15',
						timing:'3',
						amt:'12',
						rootCause:'sdafdasfdasfdasfdsfdsf',
						immediate:'sdfasfdfexeafe sdfdfe ',
						longTerm:'1111',
						problemSolvingSheet:'Y',
						responsible:'zhangsan',
						deadline:'2017-04-02',
						status:'N'						
					};
				opl.push(op2);
				this.set("opl",opl);
			},
			oncomplete: function(){
				$('.opltr .date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$('.opltr .deadline').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$(".opltr .dtFrom").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
				$(".opltr .dtTo").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
			}
		});
		
		ractive.on({
			toShowYearSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideYearSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideMonthSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
			},
			toShowPageSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHidePageSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
			},
			toShowColumnEditor:function(e){
				$(e.node).children(0).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				if(type == 'select-one'){
					$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
				} else {
					$(e.node).hide().prev().show().text($(e.node).val());
				}
			},
			addOP:function(){				
				var op = {
						id:"0",
						checked:false,
						date:"2017-04-02",
						refNo:"BH001",
						personFound:"ZANSANG",
						station:'001',
						description:'sadfs dsaf a 你好！',
						dtFrom:'18:15',
						dtTo:'18:15',
						timing:'3',
						amt:'12',
						rootCause:'sdafdasfdasfdasfdsfdsf',
						immediate:'sdfasfdfexeafe sdfdfe ',
						longTerm:'1111',
						problemSolvingSheet:'Y',
						responsible:'zhangsan',
						deadline:'2017-04-02',
						status:'N'						
					};
				opl.push(op);
				ractive.update("opl");
				//对新增的行进行绑定时间选择事件
				$('.opltr:last .date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$('.opltr:last .deadline').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$(".opltr:last .dtFrom").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
				$(".opltr:last .dtTo").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
			},
			deleteOP:function(){
			      var i = opl.length-1;
			      while (i >= 0){
			        var temp = opl[i];
			        if(temp.checked){
			            if(temp.id != '0'){
			            	deletedOPL.push(temp);
			            }
			            opl.splice(i,1);	
			        }
				  	i--;
				  }		      
			},
			saveOP:function(){
				console.log("prepare to save");
			},
			test:function(){
				console.log(opl[0].days[3]);
				console.log(deletedOPL);
			}			
		})
	}
	
	function dynamicBlurWdatePicker(obj){
		$(obj).prev().text($(obj).val());
		//$(obj).unbind( "blur");
		/*$(obj).bind( "blur",function(){
			$(obj).prev().show();
			$(obj).hide();
		});*/
	}
	
	return {
		init:init,
		dynamicBlurWdatePicker:dynamicBlurWdatePicker
	}
}();
$(document).ready(opl.init);