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
	            text: $.i18n.prop("i18n_oeeLoss_org_loss")
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
	            name: $.i18n.prop("i18n_oeeLoss_other_loss"),
	            data: others_loss_total,
	            color:'#4A7DBC'
	        },{
	            name: $.i18n.prop("i18n_oeeLoss_new_staff_loss"),
	            data: new_operator_loss_total,
	            color:'#132F52'
	        },{
	            name: $.i18n.prop("i18n_oeeLoss_unplaned_sample_loss"),
	            data: unplan_sample_loss_total,
	            color:'#95B1DF'
	        },{
	            name: $.i18n.prop("i18n_oeeLoss_unplaned_tpm_loss"),
	            data: unplan_tpm_loss_total,
	            color:'#7030A0'
	        },{
	            name: $.i18n.prop("i18n_oeeLoss_change_material"),
	            data: exchg_material_loss_total,
	            color:'#C0C0C0'
	        },{
	            name: $.i18n.prop("i18n_oeeLoss_fst_last_check_release"),
	            data: test_release_three_parts_loss_total,
	            color:'#929292'
	        }, {
	            name: $.i18n.prop("i18n_oeeLoss_lack_of_material"),
	            data: lack_material_loss_total,
	            color:'#AA0000'
	        }, {
	            name: $.i18n.prop("i18n_oeeLoss_lack_of_person"),
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