var productivityChart1 = function(){
	var years = []; 
	var targetTotalList = []; 
	var actualTotalList = [];
	function init(lineName, curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/productivityChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "productivity", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},
	            oncomplete: function(){
	            	/**/
	            	$.ajax({
	        			url		: manager.root + '/report/productivity/yearlyProductivityChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			success: function(listdata)
	        			{
	        				years = [];
	        				targetTotalList = []; 
	        				actualTotalList = [];
	        				for(i = 0; i < listdata.length; i ++){
	        					years.push(listdata[i].years);
	        					
	        					//var oee_percent = (listdata[i].target_oee_percent * 1).toFixed(1);
	        					targetTotalList.push(11.0);
	        					//calculate actual OEE percentage
	        					var manhourTotal_1 = listdata[i].man_hour_total_1;
	        					var manhourTotal_2 = listdata[i].man_hour_total_2;
	        					var manhourTotal_3 = listdata[i].man_hour_total_3;
	        					var actualTotal = listdata[i].actual_total;
	        					if ( manager.isNull(actualTotal) ||  parseInt(actualTotal) == 0 )
	        						actualTotalList.push(0);
	        					else{
	        						var manhourTotal = ( manager.isNull(manhourTotal_1) ? 0 : parseInt(manhourTotal_1) ) 
	        											+ ( manager.isNull(manhourTotal_2) ? 0 : parseInt(manhourTotal_2) )
	        											+ ( manager.isNull(manhourTotal_3) ? 0 : parseInt(manhourTotal_3) );
	        						actualTotalList.push( parseFloat( ( manhourTotal  / actualTotal * 1 ).toFixed(2) ) );
	        					}
	        				}
	        				bindChart();
	        				ractive.set("targetTotal", targetTotalList);
	        				ractive.set("actualTotal", actualTotalList);
	        			}
	            	});
	           		
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .lft .chart .chart').highcharts({
			 title: {
	            text: ''
	        },
	        legend: {
	            enabled: false
	        },
	        xAxis: {
	            categories: years
	        },
	        yAxis: {
	            title: {
	                text: $.i18n.map['i18n_productivity_yearly'],
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            tickPositions: [0, 2,  4,  6,  8,  10, 12], // 指定竖轴坐标点的值
	            labels: {
	                formatter: function() {
	                    return (this.value * 1).toFixed(2);
	                },
	            }	
	        },
	        plotOptions: {
	            series: {
	                stacking: 'normal'
	            }
	        },
	        series: [ {
	            type: 'column',
	            name: $.i18n.map['i18n_actual'],
	            data: actualTotalList,
	            color:'#3C3C4D'
	        },{
	            type: 'spline',
	            name: $.i18n.map['i18n_target'],
	            color:'red',
	            data: targetTotalList,
	            marker: {
	                enabled: false
	            }
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