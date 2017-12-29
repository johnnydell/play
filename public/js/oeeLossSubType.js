var oeeLossSubType = function(){
	var oeeLosses;
	var oeeSubLosses;
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/setting/oeeLossSubType.html", function (template) {
	        var ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	
	            	$.ajax({
	        			url		: manager.root + '/sysConfig/getOeeLossSubTypes',
	        			type	: 'GET',
	        			data	: '',
	        			success: function(listdata)
	        			{
	        				console.log(listdata);
	        				oeeLosses 			= listdata;
	        				oeeSubLosses 		= oeeLosses[0].subTypes;
	        				
	        				ractive.set("oeeLosses", oeeLosses);
	        				ractive.set("oeeSubLosses", oeeSubLosses);
	        				
	        			}
	            	});
	            	/**/
	            }
	        }); 
	        
	        ractive.on({
	        	switchOtherLoss: function(e){
	        		var idx = $(e.node).val();
	        		console.log(idx);
	        		oeeSubLosses = oeeLosses[idx].subTypes;
	        		ractive.set("oeeSubLosses", oeeSubLosses);
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