var hourlycount = function(){
	
	var hourlycounts_base, hourlycounts_g1, hourlycounts_g2, hourlycounts_g3, hourlycounts_g4, hourlycounts = [], hourlycounts_sub_total = [];
	var hourlycounts_sub1, hourlycounts_sub2, hourlycounts_sub3, hourlycounts_sub4;
	var lineName =  manager.getPV("lineName");;
	
	var dateTodayStr = null;
	
	var ractive = null;
	function init(){
		//set today into date selector
		var date_today = new Date();
		dateTodayStr = $.datepicker.formatDate("yy-mm-dd",date_today);
		
		//active Ractive 
		ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {
				root		: manager.root,
				lineName 	: lineName,
				dateToday	: dateTodayStr,
				format		: function(num){
					if ( null == num || num == 0 || num == '' ) 
						return '';
					else
						return num;
				}
			},
			
			onrender: function(){
				manager.loadProperties(this, "hourlycount", "../../");
			},
			oncomplete: function(){
				//active date picker control
				$("#lblDateShow").datepicker({
				      changeMonth: true,
				      changeYear: true,
				      dateFormat: 'yy-mm-dd',
				      
				      //refresh hourly count data table
				      onClose:function(dateText, inst){
				    	  console.log("selected date:" + dateText);
				    	  dateTodayStr = dateText;
				    	  queryHourlyCount(lineName, dateText);
				    	  
				      }
				 });
				
				//initial hourly count data
				queryHourlyCount(lineName, dateTodayStr);
			}
		});
		
		ractive.on({
			toShowColumnEditor:function(e){
				$(e.node).children(0).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				$(e.node).hide().prev().show().text($(e.node).val());
			},
			toHideColumnEditorWithCalculationForPlan:function(e){
				var val = parseInt($(e.node).val());
				var current_index = e.index;
				var val1 = null;
				var sub_total_g1 = 0;
				var sub_total_g2 = 0;
				var sub_total_g3 = 0;
				var sub_total_g4 = 0;
				var sub_total = 0;
				$(".attendeeTr").each(function(index){
					val1 = $($(this).children(0)[5]).children(0).text();
					val1 = isNull(val1) ? 0 :  (isNaN(val1) ? 0 : parseInt(val1));
					//calculate 7:00 AM ~ 3:00 PM
					if (index < 8 ){
						sub_total_g1 += val1;
					}
					//calculate 7:00 AM ~ 7:00 PM
					if (index < 12 ){
						sub_total_g2 += val1;
					}
					
					//calculate 3:00 PM ~ 11:00 PM
					if (7 < index && index < 16 ){
						sub_total_g3 += val1;
					}
					
					//calculate 3:00 PM ~ 11:00 PM
					if (15 < index && index < 24 ){
						sub_total_g4 += val1;
					}
					sub_total += val1;
					if (val1 !== 0){
						hourlycounts[index].planTotalCount = sub_total;
					}
						
			    });
				//set current plan label value
				$(e.node).hide().prev().show().text(val);
				//set current plan total value
				//$(e.node).parent().next().text(sub_total);
				
				hourlycounts_sub_total[0].group_plan = sub_total_g1;
				hourlycounts_sub_total[1].group_plan = sub_total_g2;
				hourlycounts_sub_total[2].group_plan = sub_total_g3;
				hourlycounts_sub_total[3].group_plan = sub_total_g4;
				ractive.update();
			},
			toHideColumnEditorWithCalculationForActual:function(e){
				var val = parseInt($(e.node).val());
				var current_index = e.index;
				var val1 = null;
				var sub_total_g1 = 0;
				var sub_total_g2 = 0;
				var sub_total_g3 = 0;
				var sub_total_g4 = 0;
				var sub_total = 0;
				$(".attendeeTr").each(function(index){
					val1 = $($(this).children(0)[7]).children(0).text();
					val1 = isNull(val1) ? 0 :  (isNaN(val1) ? 0 : parseInt(val1));
					//calculate 7:00 AM ~ 3:00 PM
					if (index < 8 ){
						sub_total_g1 += val1;
					}
					//calculate 7:00 AM ~ 7:00 PM
					if (index < 12 ){
						sub_total_g2 += val1;
					}
					
					//calculate 3:00 PM ~ 11:00 PM
					if (7 < index && index < 16 ){
						sub_total_g3 += val1;
					}
					
					//calculate 3:00 PM ~ 11:00 PM
					if (15 < index && index < 24 ){
						sub_total_g4 += val1;
					}
					sub_total += val1;
					if (val1 !== 0){
						hourlycounts[index].actualTotalCount = sub_total;
					}
						
			    });
				//set current plan label value
				$(e.node).hide().prev().show().text(val);
				//set current plan total value
				//$(e.node).parent().next().text(sub_total);
				
				hourlycounts_sub_total[0].group_actual = sub_total_g1;
				hourlycounts_sub_total[1].group_actual = sub_total_g2;
				hourlycounts_sub_total[2].group_actual = sub_total_g3;
				hourlycounts_sub_total[3].group_actual = sub_total_g4;
				
				//calculate hourly count percent
				if ( val !== 0 ){
					$(e.node).parent().next().next().children(0).show().val(val);
					var hourlyCountWidth = parseInt($(e.node).parent().next().next().css("width"));
					var perc = val / 240;
					var realWidth = Math.ceil(hourlyCountWidth * perc);
					$(e.node).parent().next().next().children(0).css("width", realWidth);
					if (perc < 0.6){
						$(e.node).parent().next().next().children(0).css("background-color", "red");
					}
					else if (perc > 0.6 && perc < 0.8){
						$(e.node).parent().next().next().children(0).css("background-color", "yellow");
					}
					else{
						$(e.node).parent().next().next().children(0).css("background-color", "green");
					}
				}
				else{
					$(e.node).parent().next().next().children(0).hide();
				}
				
				
				ractive.update();
			},
			toValidateEditorOnlyNum:function(e){
				var val = $(e.node).val();
				$(e.node).val(val.replace(/\D/g, ''));
			},
			saveHourlyCount:function(){
				console.log("lineName = " + lineName + ",dateStr = " + dateTodayStr);
				var params = {
						lineName 		: lineName,
						dateStr  		: dateTodayStr,
						baseInfo		: hourlycounts_base,
						dataGroup		: hourlycounts
				};
				$.ajax({
					url		: manager.root + '/views/board/hourlycount/saveResult',
					type	: 'post',
					data	: JSON.stringify(params),
					contentType: "application/json", 
					success: function(ret)
					{
						console.log(ret);
					}
				})
			
			}
		})
	}
	
	/*Initial all of data*/
	function initDataTemplate(){
		hourlycounts = [];
		hourlycounts_base = {teamLeaderSign1:"", teamLeaderSign2:"", teamLeaderSign3:"", groupLeaderSign:""};
		for (i = 8; i < 24; i ++){
			hourlycounts_item = {hourid: ((i - 1) + "-" + i),productHour: i,lineName:"",productTypeName1:"",productCycle1:0,productTypeName2:"",productCycle2:0,planCount:0,planTotalCount:0,actualCount:0,actualTotalCount:0,productHourCount:0,
					scrapCount:0,reworkCount:0,qualityLoss:0,breakdownCount:0,adjustmentCount:0,technicalLoss:0,planSetupCount:0,unplanSetupCount:0,exchgToolCount:0,changeoverLoss:0,
					lackPersonnelCount:0,lackMaterialCount:0, testReleaseThreePartsCount:0,exchgMaterialCount:0,unplanSampleCount:0,newOperatorCount:0,unplanTpmCount:0,othersCount:0,
					orgnizationLoss:0,performanceCount:0, undefinedCount:0,remark:""};
			hourlycounts.push(hourlycounts_item);
		}
		hourlycounts_item = {hourid: "23-00",productHour:0,lineName:"",productTypeName1:"",productCycle1:0,productTypeName2:"",productCycle2:0,planCount:0,planTotalCount:0,actualCount:0,actualTotalCount:0,productHourCount:0,
				scrapCount:0,reworkCount:0,qualityLoss:0,breakdownCount:0,adjustmentCount:0,technicalLoss:0,planSetupCount:0,unplanSetupCount:0,exchgToolCount:0,changeoverLoss:0,
				lackPersonnelCount:0,lackMaterialCount:0, testReleaseThreePartsCount:0,exchgMaterialCount:0,unplanSampleCount:0,newOperatorCount:0,unplanTpmCount:0,othersCount:0,
				orgnizationLoss:0,performanceCount:0, undefinedCount:0,remark:""};
		hourlycounts.push(hourlycounts_item);
		for (i = 1; i < 8; i ++){
			hourlycounts_item = {hourid: ((i - 1) + "-" + i),productHour:i,lineName:"",productTypeName1:"",productCycle1:0,productTypeName2:"",productCycle2:0,planCount:0,planTotalCount:0,actualCount:0,actualTotalCount:0,productHourCount:0,
					scrapCount:0,reworkCount:0,qualityLoss:0,breakdownCount:0,adjustmentCount:0,technicalLoss:0,planSetupCount:0,unplanSetupCount:0,exchgToolCount:0,changeoverLoss:0,
					lackPersonnelCount:0,lackMaterialCount:0, testReleaseThreePartsCount:0,exchgMaterialCount:0,unplanSampleCount:0,newOperatorCount:0,unplanTpmCount:0,othersCount:0,
					orgnizationLoss:0,performanceCount:0, undefinedCount:0,remark:""};
			hourlycounts.push(hourlycounts_item);
		}
		
		for (i = 0; i < 4; i ++){
			hourlycounts_sub = {group_plan:0, group_actual:0};
			hourlycounts_sub_total.push(hourlycounts_sub);
		}
		
	}
	
	function queryHourlyCount(lineName, productDateStr){
		//need to clear all of data
		initDataTemplate();
		//query data by line name and date
		$.ajax({
			url		: manager.root + '/views/board/hourlycount/' + lineName + "/" + productDateStr,
			type	: 'post',
			data	: '',
			success: function(listdata)
			{
				
				//prepare hourly count base data
				if (listdata.length > 0){
					hourlycounts_base.teamLeaderSign1 = listdata[0].hourlyCountBase.teamLeaderSign1;
					hourlycounts_base.teamLeaderSign2 = listdata[0].hourlyCountBase.teamLeaderSign2;
					hourlycounts_base.teamLeaderSign3 = listdata[0].hourlyCountBase.teamLeaderSign3;
					hourlycounts_base.groupLeaderSign = listdata[0].hourlyCountBase.groupLeaderSign;
				}
				var planTotalCount = 0;
				var actualTotalCount = 0;
				//set properties into page
				for(i = 0; i < listdata.length; i++){
					hourlycounts[i].productTypeName1 		= isNull(listdata[i].productType1) ? "" : listdata[i].productType1.productTypeName;
					hourlycounts[i].productCycle1 			= isNull(listdata[i].productCycle1 ) ? 0 : parseInt(listdata[i].productCycle1);
					hourlycounts[i].productTypeName2 		= isNull(listdata[i].productType2) ? "" : listdata[i].productType2.productTypeName;
					hourlycounts[i].productCycle2 			= isNull(listdata[i].productCycle2 ) ? 0 : parseInt(listdata[i].productCycle2);
					hourlycounts[i].planCount 				= isNull(listdata[i].planCount) ? 0 : parseInt(listdata[i].planCount);
					hourlycounts[i].actualCount 			= isNull(listdata[i].actualCount) ? 0 : parseInt(listdata[i].actualCount);
					hourlycounts[i].productHourCount 		= isNull(listdata[i].productHourCount) ? 0 : parseInt(listdata[i].productHourCount);
					hourlycounts[i].scrapCount 				= isNull(listdata[i].scrapCount) ? 0 : parseInt(listdata[i].scrapCount);
					hourlycounts[i].reworkCount 			= isNull(listdata[i].reworkCount) ? 0 : parseInt(listdata[i].reworkCount);
					hourlycounts[i].qualityLoss 			= isNull(listdata[i].qualityLoss) ? 0 : parseInt(listdata[i].qualityLoss);
					hourlycounts[i].breakdownCount 			= isNull(listdata[i].breakdownCount) ? 0 : parseInt(listdata[i].breakdownCount);
					hourlycounts[i].adjustmentCount 		= isNull(listdata[i].adjustmentCount) ? 0 : parseInt(listdata[i].adjustmentCount);
					hourlycounts[i].technicalLoss 			= isNull(listdata[i].technicalLoss) ? 0 : parseInt(listdata[i].technicalLoss);
					hourlycounts[i].planSetupCount 			= isNull(listdata[i].planSetupCount) ? 0 : parseInt(listdata[i].planSetupCount);
					hourlycounts[i].unplanSetupCount 		= isNull(listdata[i].unplanSetupCount) ? 0 : parseInt(listdata[i].unplanSetupCount);
					hourlycounts[i].exchgToolCount 			= isNull(listdata[i].exchgToolCount) ? 0 : parseInt(listdata[i].exchgToolCount);
					hourlycounts[i].changeoverLoss 			= isNull(listdata[i].changeoverLoss) ? 0 : parseInt(listdata[i].changeoverLoss);
					hourlycounts[i].lackPersonnelCount 		= isNull(listdata[i].lackPersonnelCount) ? 0 : parseInt(listdata[i].lackPersonnelCount);
					hourlycounts[i].lackMaterialCount 		= isNull(listdata[i].lackMaterialCount) ? 0 : parseInt(listdata[i].lackMaterialCount);
					hourlycounts[i].testReleaseThreePartsCount = isNull(listdata[i].testReleaseThreePartsCount) ? 0 : parseInt(listdata[i].testReleaseThreePartsCount);
					hourlycounts[i].exchgMaterialCount 		= isNull(listdata[i].exchgMaterialCount) ? 0 : parseInt(listdata[i].exchgMaterialCount);
					hourlycounts[i].unplanSampleCount 		= isNull(listdata[i].unplanSampleCount) ? 0 : parseInt(listdata[i].unplanSampleCount);
					hourlycounts[i].newOperatorCount 		= isNull(listdata[i].newOperatorCount) ? 0 : parseInt(listdata[i].newOperatorCount);
					hourlycounts[i].othersCount 			= isNull(listdata[i].othersCount) ? 0 : parseInt(listdata[i].othersCount);
					hourlycounts[i].orgnizationLoss 		= isNull(listdata[i].orgnizationLoss) ? 0 : parseInt(listdata[i].orgnizationLoss);
					hourlycounts[i].unplanTpmCount 			= isNull(listdata[i].unplanTpmCount) ? 0 : parseInt(listdata[i].unplanTpmCount);
					hourlycounts[i].performanceCount 		= isNull(listdata[i].performanceCount) ? 0 : parseInt(listdata[i].performanceCount);
					hourlycounts[i].undefinedCount 			= isNull(listdata[i].undefinedCount) ? 0 : parseInt(listdata[i].undefinedCount);
					hourlycounts[i].remark 					= isNull(listdata[i].remark) ? "" : listdata[i].remark;
					
					planTotalCount 							+= hourlycounts[i].planCount;
					actualTotalCount 						+= hourlycounts[i].actualCount;
					hourlycounts[i].planTotalCount			= planTotalCount;
					hourlycounts[i].actualTotalCount		= actualTotalCount;
					
					//calculate sub total count for group 1
					if (i < 8){
						hourlycounts_sub_total[0].group_plan += hourlycounts[i].planCount;
						hourlycounts_sub_total[0].group_actual += hourlycounts[i].actualCount;
					}
					
					//calculate sub total count for group 2
					if (i < 12){
						hourlycounts_sub_total[1].group_plan += hourlycounts[i].planCount;
						hourlycounts_sub_total[1].group_actual += hourlycounts[i].actualCount;
					}
					
					//calculate sub total count for group 3
					if (7 < i && i < 16){
						hourlycounts_sub_total[2].group_plan += hourlycounts[i].planCount;
						hourlycounts_sub_total[2].group_actual += hourlycounts[i].actualCount;
					}
					//calculate sub total count for group 4
					if (15 < i && i < 24){
						hourlycounts_sub_total[3].group_plan += hourlycounts[i].planCount;
						hourlycounts_sub_total[3].group_actual += hourlycounts[i].actualCount;
					}
					
				}
				ractive.set("hourlyCountV0", hourlycounts_base);
				ractive.set("hourlyCountV1", hourlycounts);
				ractive.set("hourlyCountsTotal", hourlycounts_sub_total);
				//ractive.update();
			}
		
		});
	}
	
	function isNull(arg1)
	{
	 return !arg1 && arg1!==0 && typeof arg1!=="boolean" ? true : false;
	}
	
	return {
		init:init
	}
}();
$(document).ready(hourlycount.init);