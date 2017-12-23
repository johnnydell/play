var oeeChart1 = function(){
	var yearNo = []; 
	var targetTotal = []; 
	var actualTotal = [];
	function init(lineName){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board/oeeChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	/**/
	            	$.ajax({
	        			url		: manager.root + '/report/oee/yearlyOeeChart/' + lineName,
	        			type	: 'POST',
	        			data	: '',
	        			success: function(listdata)
	        			{
	        				yearNo = [];
	        				targetTotal = []; 
	        				actualTotal = [];
	        				for(i = 0; i < listdata.length; i ++){
	        					yearNo.push(listdata[i].yearno);
	        					//target OEE always 85%
	        					targetTotal.push(85);
	        					//calculate actual OEE percentage
	        					actualTotal.push(Math.ceil((listdata[i].actual_total / listdata[i].target_total) * 100));
	        				}
	        				bindChart();
	        				ractive.set("targetTotal", targetTotal);
	        				ractive.set("actualTotal", actualTotal);
	        			}
	            	});
	           		
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .lft .chart').highcharts({
		    title: {
	            text: ''
	        },
	        legend: {
	            enabled: false
	        },
	        xAxis: {
	            categories: yearNo
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
	    });	
	}
	
		
	return {
		init:init
	}
}();