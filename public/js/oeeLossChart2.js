var oeeLossChart2 = function(){
	var lack_personnel_loss_total;
	var lack_material_loss_total;
	var test_release_three_parts_loss_total;
	var exchg_material_loss_total;
	var unplan_tpm_loss_total;
	var unplan_sample_loss_total;
	var new_operator_loss_total;
	var others_loss_total;
	
	function init(lineName, curYear){
	   //渲染chart2部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart2.html", function (template) {
	        var ractive = new Ractive({
	             el: '.cxt .top .lft .oloss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	$.ajax({
	        			url		: manager.root + '/report/oeeloss/monthlyOrgnizationLossChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				lack_personnel_loss_total 			= listdata.lack_personnel_loss_total;
	        				lack_material_loss_total 			= listdata.lack_material_loss_total;
	        				test_release_three_parts_loss_total = listdata.test_release_three_parts_loss_total;
	        				exchg_material_loss_total 			= listdata.exchg_material_loss_total;
	        				unplan_tpm_loss_total 				= listdata.unplan_tpm_loss_total;
	        				unplan_sample_loss_total 			= listdata.unplan_sample_loss_total;
	        				new_operator_loss_total 			= listdata.new_operator_loss_total;
	        				others_loss_total 					= listdata.others_loss_total;
	        				//plot to chart
	        				bindChart();
	        			}
	            	});
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .lft .oloss .chart').highcharts({
			chart: {
	            type: 'bar'
	        },
	        title: {
	            text: '组织损失'
	        },
	        xAxis: {
	            categories: ['Jan','Feb','Mar','Apr','May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	            reversed: false,
	            labels: {
	                formatter: function() {
	                    var ret = this.value;
	                    switch(ret){
	                        case 'Feb':
	                        	ret = '';
	                        	break;
	                        case 'Apr':
	                        	ret = '';
	                        	break;
	                        case 'Jun':
	                        	ret = '';
	                        	break;
	                        case 'Aug':
	                        	ret = '';
	                        	break;
	                        case 'Oct':
	                        	ret = '';
	                        	break;
	                        case 'Dec':
	                        	ret = '';
	                        	break;
	                    }
	                    return ret;
	                },
	            }
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            min: 0,
	            
	        },
	        legend: {
	        	layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            floating: false,
	            symbolRadius: 0
	        },
	        plotOptions: {
	            series: {
	                stacking: 'normal'
	            }
	        },
	        series: [{
	            name: '其他损失',
	            data: others_loss_total,
	            color:'#4A7DBC'
	        },{
	            name: '新员工培训',
	            data: new_operator_loss_total,
	            color:'#132F52'
	        },{
	            name: '非计划样品',
	            data: unplan_sample_loss_total,
	            color:'#95B1DF'
	        },{
	            name: '非计划TPM损失',
	            data: unplan_tpm_loss_total,
	            color:'#7030A0'
	        },{
	            name: '更换原材料',
	            data: exchg_material_loss_total,
	            color:'#C0C0C0'
	        },{
	            name: '首末中间检查和放行',
	            data: test_release_three_parts_loss_total,
	            color:'#929292'
	        }, {
	            name: '缺料',
	            data: lack_material_loss_total,
	            color:'#AA0000'
	        }, {
	            name: '缺人',
	            data: lack_personnel_loss_total,
	            color:'#7D9FC9'
	        }],
	        credits:{
	            enabled:false
	        }
	    });	
	}	
		
	return {
		init:init
	}
}();