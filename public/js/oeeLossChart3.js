var oeeChart3 = function(){
	function init(){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/board/oeeChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.bt .chart').highcharts({
		    title: {
		        text: ''
		    },
		    legend: {
		        enabled: false
		    },
		    xAxis: {
		        categories: ['1', '2', '3', '4', '5','6','7','8','9','10',
		                     '11', '12', '13', '14', '15','16','17','18','19','20',
		                     '21', '22', '23', '24', '25','26','27','28','29','30','31']
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
		        type: 'line',
		        name: 'OEE - actual',
		        data: [{
		            y: 10,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        }, {
		            y: 60,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 50,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 70,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 30,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        },{
		            y: 10,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        }, {
		            y: 60,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 50,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 70,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 30,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        },{
		            y: 10,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        }, {
		            y: 60,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 50,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 70,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 30,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        },{
		            y: 10,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        }, {
		            y: 60,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 50,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 70,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 30,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        },{
		            y: 10,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        }, {
		            y: 60,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 50,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 70,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 30,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        },{
		            y: 10,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        }, {
		            y: 60,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 50,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 70,
		            marker: {
		                symbol: 'url('+manager.root+'/images/greenx.png)'
		            }
		        }, {
		            y: 30,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        },{
		            y: 10,
		            marker: {
		                symbol: 'url('+manager.root+'/images/redx.png)'
		            }
		        }],
		        color:'#3C3C4D'
		    }, {
		        type: 'spline',
		        name: 'OEE - target',
		        color:'red',
		        data: [40, 40, 40, 40, 40,40, 40, 40, 40, 40,40, 40, 40,
		               40, 40, 40, 40, 40,40, 40, 40, 40, 40,40, 40, 40,
		               40, 40, 40, 40, 40],
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