var oeeLossSubType = function(){
	var oeeLosses;
	var technicalLoss = {id:"", name:""};
	var changeoverLoss = {};
	var qualityLoss;
	var orgnizationLoss;
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
	        				oeeLosses = listdata;
	        				console.log(listdata);
	        				//ractive.set("losses", oeeLosses['质量损失']);
	        				technicalLoss.id = listdata["技术损失"];
	        				changeoverLoss = listdata["换型损失"];
	        				qualityLoss = listdata["质量损失"];
	        				orgnizationLoss = listdata["组织损失"];
	        			}
	            	});
	            	/**/
	            }
	        }); 
	        
	        ractive.on({
	        	switchToQuality: function(e){
	        		$('.qualityLoss').show();
	        		$('.chgoverLoss').hide();
	        		$('.techLoss').hide();
	        		$('.orgLoss').hide();
	        	},
	        	switchToChgOver: function(e){
	        		$('.qualityLoss').hide();
	        		$('.chgoverLoss').show();
	        		$('.techLoss').hide();
	        		$('.orgLoss').hide();
	        	},
	        	switchToTech : function(e){
	        		$('.qualityLoss').hide();
	        		$('.chgoverLoss').hide();
	        		$('.techLoss').show();
	        		$('.orgLoss').hide();
	        	},
	        	switchToOrg : function(e){
	        		$('.qualityLoss').hide();
	        		$('.chgoverLoss').hide();
	        		$('.techLoss').hide();
	        		$('.orgLoss').show();
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