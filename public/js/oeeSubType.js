var oeeSubType = function(){
	
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/setting/oeeSubType.html", function (template) {
	        var ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	/*
	            	$.ajax({
	        			url		: manager.root + '/report/oee/yearlyOeeChart/' + lineName,
	        			type	: 'POST',
	        			data	: '',
	        			success: function(listdata)
	        			{
	        				years = [];
	        				targetTotal = []; 
	        				actualTotal = [];
	        				for(i = 0; i < listdata.length; i ++){
	        					years.push(listdata[i].years);
	        					//target OEE always 85%
	        					targetTotal.push(listdata[i].target_oee_percent);
	        					//calculate actual OEE percentage
	        					actualTotal.push(Math.ceil((listdata[i].actual_oee_total / listdata[i].target_oee_total) * 100));
	        				}
	        				bindChart();
	        				ractive.set("targetTotal", targetTotal);
	        				ractive.set("actualTotal", actualTotal);
	        			}
	            	});
	           		*/
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		/*$('.top .lft .chart').highcharts({
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
	                text: ''
	            },
	            tickPositions: [0, 10, 20, 30,40,50,60,70,80,90,100], // 指定竖轴坐标点的值
	            labels: {
	                formatter: function() {
	                    return this.value + '%';
	                },
	            }	
	        },
	        series: [{
	            type: 'column',
	            name: 'OEE - actual',
	            data: actualTotal,
	            color:'#3C3C4D'
	        }, {
	            type: 'spline',
	            name: 'OEE - target',
	            color:'red',
	            data: targetTotal,
	            marker: {
	                enabled: false
	            }
	        }],
	        credits:{
	            enabled:false
	        }
	    });	*/
	}
	
		
	return {
		init:init
	}
}();