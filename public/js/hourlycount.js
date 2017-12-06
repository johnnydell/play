var hourlycount = function(){
	
	var hourlycounts_base, hourlycounts_g1, hourlycounts_g2, hourlycounts_g3, hourlycounts_g4;
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
			data: {root:manager.root,
				lineName : lineName,
//				hourlyCountV0:hourlycounts_base,
//				hourlyCountV1:hourlycounts_g1,
//				hourlyCountV2:hourlycounts_g2,
//				hourlyCountV3:hourlycounts_g3,
//				hourlyCountV4:hourlycounts_g4,
//				hourlyCountsTotal1:hourlycounts_sub1,
//				hourlyCountsTotal2:hourlycounts_sub2,
//				hourlyCountsTotal3:hourlycounts_sub3,
//				hourlyCountsTotal4:hourlycounts_sub4,
				dateToday:dateTodayStr},
			
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
			saveHourlyCount:function(){
				console.log("lineName = " + lineName + ",dateStr = " + dateTodayStr);
				var params = {
						lineName 		: lineName,
						dateStr  		: dateTodayStr,
						baseInfo		: hourlycounts_base,
						dateGroup1		: hourlycounts_g1,
						dateGroup2		: hourlycounts_g2,
						dateGroup3		: hourlycounts_g3,
						dateGroup4		: hourlycounts_g4
				};
				$.ajax({
					url		: manager.root + '/views/board/hourlycount/saveResult',
					type	: 'post',
					data	: params,
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
		hourlycounts_base = {teamLeaderSign1:"", teamLeaderSign2:"", teamLeaderSign3:"", groupLeaderSign:""};
		hourlycounts_g1 = [
			{hourid:"7-8",productHour:"8",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"8-9",productHour:"9",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"9-10",productHour:"10",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"10-11",productHour:"11",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"11-12",productHour:"12",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"12-13",productHour:"13",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"13-14",productHour:"14",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"14-15",productHour:"15",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
			
		];
		hourlycounts_sub1 = {group1_plan:"", group1_actual:""};
		hourlycounts_g2 = [
			{hourid:"15-16",productHour:"16",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"16-17",productHour:"17",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"17-18",productHour:"18",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"18-19",productHour:"19",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
		];
		hourlycounts_sub2 = {group2_plan:"", group2_actual:""};
		hourlycounts_g3 = [
			{hourid:"19-20",productHour:"20",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"20-21",productHour:"21",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"21-22",productHour:"22",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"22-23",productHour:"23",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
		];
		hourlycounts_sub3 = {group3_plan:"", group3_actual:""};
		hourlycounts_g4 = [
			{hourid:"23-00",productHour:"0",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"00-1",productHour:"1",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"1-2",productHour:"2",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"2-3",productHour:"3",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"3-4",productHour:"4",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"4-5",productHour:"5",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"5-6",productHour:"6",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"6-7",productHour:"7",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
		];
		hourlycounts_sub4 = {group4_plan:"", group4_actual:""};
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
				for(i = 0; i < listdata.length; i++){
					//check if this item belong to hourlycounts_g1
					for (j = 0; j < hourlycounts_g1.length; j ++){
						if (listdata[i].productHour == hourlycounts_g1[j].productHour){
							hourlycounts_g1[j].productTypeName1 = listdata[i].productType1 == null ? "" : listdata[i].productType1.productTypeName;
							hourlycounts_g1[j].productCycle1 	= listdata[i].productCycle1 == "null" ? "" : listdata[i].productCycle1;
							hourlycounts_g1[j].productTypeName2 = listdata[i].productType2 == null ? "" : listdata[i].productType2.productTypeName;
							hourlycounts_g1[j].productCycle2 	= listdata[i].productCycle2 == "null" ? "" : listdata[i].productCycle2;
							hourlycounts_g1[j].planCount 		= listdata[i].planCount== "null" ? "" : listdata[i].planCount;
							hourlycounts_g1[j].actualCount 		= listdata[i].actualCount== "null" ? "" : listdata[i].actualCount;
							hourlycounts_g1[j].productHourCount = listdata[i].productHourCount== "null" ? "" : listdata[i].productHourCount;
							hourlycounts_g1[j].scrapCount 		= listdata[i].scrapCount== "null" ? "" : listdata[i].scrapCount;
							hourlycounts_g1[j].reworkCount 		= listdata[i].reworkCount== "null" ? "" : listdata[i].reworkCount;
							hourlycounts_g1[j].qualityLoss 		= listdata[i].qualityLoss== "null" ? "" : listdata[i].qualityLoss;
							hourlycounts_g1[j].breakdownCount 	= listdata[i].breakdownCount== "null" ? "" : listdata[i].breakdownCount;
							hourlycounts_g1[j].adjustmentCount 	= listdata[i].adjustmentCount== "null" ? "" : listdata[i].adjustmentCount;
							hourlycounts_g1[j].technicalLoss 	= listdata[i].technicalLoss== "null" ? "" : listdata[i].technicalLoss;
							hourlycounts_g1[j].planSetupCount 	= listdata[i].planSetupCount== "null" ? "" : listdata[i].planSetupCount;
							hourlycounts_g1[j].unplanSetupCount = listdata[i].unplanSetupCount== "null" ? "" : listdata[i].unplanSetupCount;
							hourlycounts_g1[j].exchgToolCount 	= listdata[i].exchgToolCount== "null" ? "" : listdata[i].exchgToolCount;
							hourlycounts_g1[j].changeoverLoss 	= listdata[i].changeoverLoss== "null" ? "" : listdata[i].changeoverLoss;
							hourlycounts_g1[j].lackPersonnelCount = listdata[i].lackPersonnelCount== "null" ? "" : listdata[i].lackPersonnelCount;
							hourlycounts_g1[j].lackMaterialCount = listdata[i].lackMaterialCount== "null" ? "" : listdata[i].lackMaterialCount;
							hourlycounts_g1[j].testReleaseThreePartsCount = listdata[i].testReleaseThreePartsCount== "null" ? "" : listdata[i].testReleaseThreePartsCount;
							hourlycounts_g1[j].exchgMaterialCount = listdata[i].exchgMaterialCount== "null" ? "" : listdata[i].exchgMaterialCount;
							hourlycounts_g1[j].unplanSampleCount = listdata[i].unplanSampleCount== "null" ? "" : listdata[i].unplanSampleCount;
							hourlycounts_g1[j].newOperatorCount = listdata[i].newOperatorCount== "null" ? "" : listdata[i].newOperatorCount;
							hourlycounts_g1[j].othersCount 		= listdata[i].othersCount== "null" ? "" : listdata[i].othersCount;
							hourlycounts_g1[j].orgnizationLoss 	= listdata[i].orgnizationLoss== "null" ? "" : listdata[i].orgnizationLoss;
							hourlycounts_g1[j].unplanTpmCount 	= listdata[i].unplanTpmCount== "null" ? "" : listdata[i].unplanTpmCount;
							hourlycounts_g1[j].performanceCount = listdata[i].performanceCount== "null" ? "" : listdata[i].performanceCount;
							hourlycounts_g1[j].undefinedCount 	= listdata[i].undefinedCount== "null" ? "" : listdata[i].undefinedCount;
							hourlycounts_g1[j].remark 			= listdata[i].remark== "null" ? "" : listdata[i].remark;
							
							//calculate sub total 
							hourlycounts_sub1.group1_plan 		+= (listdata[i].planCount == "" ? 0 : listdata[i].planCount);
							hourlycounts_sub1.group1_actual 	+= (listdata[i].actualCount == "" ? 0 : listdata[i].actualCount);
						}
					}
					
					//check if this item belong to hourlycounts_g2
					for (j = 0; j < hourlycounts_g2.length; j ++){
						if (listdata[i].productHour == hourlycounts_g2[j].productHour){
							hourlycounts_g2[j].productTypeName1 = listdata[i].productType1 == null ? "" : listdata[i].productType1.productTypeName;
							hourlycounts_g2[j].productCycle1 	= listdata[i].productCycle1 == "null" ? "" : listdata[i].productCycle1;
							hourlycounts_g2[j].productTypeName2 = listdata[i].productType2 == null ? "" : listdata[i].productType2.productTypeName;
							hourlycounts_g2[j].productCycle2 	= listdata[i].productCycle2 == "null" ? "" : listdata[i].productCycle2;
							hourlycounts_g2[j].planCount 		= listdata[i].planCount== "null" ? "" : listdata[i].planCount;
							hourlycounts_g2[j].actualCount 		= listdata[i].actualCount== "null" ? "" : listdata[i].actualCount;
							hourlycounts_g2[j].productHourCount = listdata[i].productHourCount== "null" ? "" : listdata[i].productHourCount;
							hourlycounts_g2[j].scrapCount 		= listdata[i].scrapCount== "null" ? "" : listdata[i].scrapCount;
							hourlycounts_g2[j].reworkCount 		= listdata[i].reworkCount== "null" ? "" : listdata[i].reworkCount;
							hourlycounts_g2[j].qualityLoss 		= listdata[i].qualityLoss== "null" ? "" : listdata[i].qualityLoss;
							hourlycounts_g2[j].breakdownCount 	= listdata[i].breakdownCount== "null" ? "" : listdata[i].breakdownCount;
							hourlycounts_g2[j].adjustmentCount 	= listdata[i].adjustmentCount== "null" ? "" : listdata[i].adjustmentCount;
							hourlycounts_g2[j].technicalLoss 	= listdata[i].technicalLoss== "null" ? "" : listdata[i].technicalLoss;
							hourlycounts_g2[j].planSetupCount 	= listdata[i].planSetupCount== "null" ? "" : listdata[i].planSetupCount;
							hourlycounts_g2[j].unplanSetupCount = listdata[i].unplanSetupCount== "null" ? "" : listdata[i].unplanSetupCount;
							hourlycounts_g2[j].exchgToolCount 	= listdata[i].exchgToolCount== "null" ? "" : listdata[i].exchgToolCount;
							hourlycounts_g2[j].changeoverLoss 	= listdata[i].changeoverLoss== "null" ? "" : listdata[i].changeoverLoss;
							hourlycounts_g2[j].lackPersonnelCount = listdata[i].lackPersonnelCount== "null" ? "" : listdata[i].lackPersonnelCount;
							hourlycounts_g2[j].lackMaterialCount = listdata[i].lackMaterialCount== "null" ? "" : listdata[i].lackMaterialCount;
							hourlycounts_g2[j].testReleaseThreePartsCount = listdata[i].testReleaseThreePartsCount== "null" ? "" : listdata[i].testReleaseThreePartsCount;
							hourlycounts_g2[j].exchgMaterialCount = listdata[i].exchgMaterialCount== "null" ? "" : listdata[i].exchgMaterialCount;
							hourlycounts_g2[j].unplanSampleCount = listdata[i].unplanSampleCount== "null" ? "" : listdata[i].unplanSampleCount;
							hourlycounts_g2[j].newOperatorCount = listdata[i].newOperatorCount== "null" ? "" : listdata[i].newOperatorCount;
							hourlycounts_g2[j].othersCount 		= listdata[i].othersCount== "null" ? "" : listdata[i].othersCount;
							hourlycounts_g2[j].orgnizationLoss 	= listdata[i].orgnizationLoss== "null" ? "" : listdata[i].orgnizationLoss;
							hourlycounts_g2[j].unplanTpmCount 	= listdata[i].unplanTpmCount== "null" ? "" : listdata[i].unplanTpmCount;
							hourlycounts_g2[j].performanceCount = listdata[i].performanceCount== "null" ? "" : listdata[i].performanceCount;
							hourlycounts_g2[j].undefinedCount 	= listdata[i].undefinedCount== "null" ? "" : listdata[i].undefinedCount;
							hourlycounts_g2[j].remark 			= listdata[i].remark== "null" ? "" : listdata[i].remark;
							
							//calculate sub total 
							hourlycounts_sub2.group2_plan 		+= (listdata[i].planCount == "" ? 0 : listdata[i].planCount);
							hourlycounts_sub2.group2_actual 	+= (listdata[i].actualCount == "" ? 0 : listdata[i].actualCount);
						}
					}
					var temp_group2_plan = hourlycounts_sub2.group2_plan;
					var temp_group2_actual = hourlycounts_sub2.group2_actual;
					//add group1 sub total count
					//hourlycounts_sub2.group2_plan 	+= hourlycounts_sub1.group1_plan;
					//hourlycounts_sub2.group2_actual += hourlycounts_sub1.group1_actual;
					
					//check if this item belong to hourlycounts_g3
					for (j = 0; j < hourlycounts_g3.length; j ++){
						if (listdata[i].productHour == hourlycounts_g3[j].productHour){
							hourlycounts_g3[j].productTypeName1 = listdata[i].productType1 == null ? "" : listdata[i].productType1.productTypeName;
							hourlycounts_g3[j].productCycle1 	= listdata[i].productCycle1 == "null" ? "" : listdata[i].productCycle1;
							hourlycounts_g3[j].productTypeName2 = listdata[i].productType2 == null ? "" : listdata[i].productType2.productTypeName;
							hourlycounts_g3[j].productCycle2 	= listdata[i].productCycle2 == "null" ? "" : listdata[i].productCycle2;
							hourlycounts_g3[j].planCount 		= listdata[i].planCount== "null" ? "" : listdata[i].planCount;
							hourlycounts_g3[j].actualCount 		= listdata[i].actualCount== "null" ? "" : listdata[i].actualCount;
							hourlycounts_g3[j].productHourCount = listdata[i].productHourCount== "null" ? "" : listdata[i].productHourCount;
							hourlycounts_g3[j].scrapCount 		= listdata[i].scrapCount== "null" ? "" : listdata[i].scrapCount;
							hourlycounts_g3[j].reworkCount 		= listdata[i].reworkCount== "null" ? "" : listdata[i].reworkCount;
							hourlycounts_g3[j].qualityLoss 		= listdata[i].qualityLoss== "null" ? "" : listdata[i].qualityLoss;
							hourlycounts_g3[j].breakdownCount 	= listdata[i].breakdownCount== "null" ? "" : listdata[i].breakdownCount;
							hourlycounts_g3[j].adjustmentCount 	= listdata[i].adjustmentCount== "null" ? "" : listdata[i].adjustmentCount;
							hourlycounts_g3[j].technicalLoss 	= listdata[i].technicalLoss== "null" ? "" : listdata[i].technicalLoss;
							hourlycounts_g3[j].planSetupCount 	= listdata[i].planSetupCount== "null" ? "" : listdata[i].planSetupCount;
							hourlycounts_g3[j].unplanSetupCount = listdata[i].unplanSetupCount== "null" ? "" : listdata[i].unplanSetupCount;
							hourlycounts_g3[j].exchgToolCount 	= listdata[i].exchgToolCount== "null" ? "" : listdata[i].exchgToolCount;
							hourlycounts_g3[j].changeoverLoss 	= listdata[i].changeoverLoss== "null" ? "" : listdata[i].changeoverLoss;
							hourlycounts_g3[j].lackPersonnelCount = listdata[i].lackPersonnelCount== "null" ? "" : listdata[i].lackPersonnelCount;
							hourlycounts_g3[j].lackMaterialCount = listdata[i].lackMaterialCount== "null" ? "" : listdata[i].lackMaterialCount;
							hourlycounts_g3[j].testReleaseThreePartsCount = listdata[i].testReleaseThreePartsCount== "null" ? "" : listdata[i].testReleaseThreePartsCount;
							hourlycounts_g3[j].exchgMaterialCount = listdata[i].exchgMaterialCount== "null" ? "" : listdata[i].exchgMaterialCount;
							hourlycounts_g3[j].unplanSampleCount = listdata[i].unplanSampleCount== "null" ? "" : listdata[i].unplanSampleCount;
							hourlycounts_g3[j].newOperatorCount = listdata[i].newOperatorCount== "null" ? "" : listdata[i].newOperatorCount;
							hourlycounts_g3[j].othersCount 		= listdata[i].othersCount== "null" ? "" : listdata[i].othersCount;
							hourlycounts_g3[j].orgnizationLoss 	= listdata[i].orgnizationLoss== "null" ? "" : listdata[i].orgnizationLoss;
							hourlycounts_g3[j].unplanTpmCount 	= listdata[i].unplanTpmCount== "null" ? "" : listdata[i].unplanTpmCount;
							hourlycounts_g3[j].performanceCount = listdata[i].performanceCount== "null" ? "" : listdata[i].performanceCount;
							hourlycounts_g3[j].undefinedCount 	= listdata[i].undefinedCount== "null" ? "" : listdata[i].undefinedCount;
							hourlycounts_g3[j].remark 			= listdata[i].remark== "null" ? "" : listdata[i].remark;
							
							//calculate sub total 
							hourlycounts_sub3.group3_plan 		+= (listdata[i].planCount == "" ? 0 : listdata[i].planCount);
							hourlycounts_sub3.group3_actual 	+= (listdata[i].actualCount == "" ? 0 : listdata[i].actualCount);
						}
					}
					
					//add group2 sub total count
					hourlycounts_sub3.group3_plan 	+= temp_group2_plan;
					hourlycounts_sub3.group3_actual += temp_group2_actual;
					
					//check if this item belong to hourlycounts_g4
					for (j = 0; j < hourlycounts_g4.length; j ++){
						if (listdata[i].productHour == hourlycounts_g4[j].productHour){
							hourlycounts_g4[j].productTypeName1 = listdata[i].productType1 == null ? "" : listdata[i].productType1.productTypeName;
							hourlycounts_g4[j].productCycle1 	= listdata[i].productCycle1 == "null" ? "" : listdata[i].productCycle1;
							hourlycounts_g4[j].productTypeName2 = listdata[i].productType2 == null ? "" : listdata[i].productType2.productTypeName;
							hourlycounts_g4[j].productCycle2 	= listdata[i].productCycle2 == "null" ? "" : listdata[i].productCycle2;
							hourlycounts_g4[j].planCount 		= listdata[i].planCount== "null" ? "" : listdata[i].planCount;
							hourlycounts_g4[j].actualCount 		= listdata[i].actualCount== "null" ? "" : listdata[i].actualCount;
							hourlycounts_g4[j].productHourCount = listdata[i].productHourCount== "null" ? "" : listdata[i].productHourCount;
							hourlycounts_g4[j].scrapCount 		= listdata[i].scrapCount== "null" ? "" : listdata[i].scrapCount;
							hourlycounts_g4[j].reworkCount 		= listdata[i].reworkCount== "null" ? "" : listdata[i].reworkCount;
							hourlycounts_g4[j].qualityLoss 		= listdata[i].qualityLoss== "null" ? "" : listdata[i].qualityLoss;
							hourlycounts_g4[j].breakdownCount 	= listdata[i].breakdownCount== "null" ? "" : listdata[i].breakdownCount;
							hourlycounts_g4[j].adjustmentCount 	= listdata[i].adjustmentCount== "null" ? "" : listdata[i].adjustmentCount;
							hourlycounts_g4[j].technicalLoss 	= listdata[i].technicalLoss== "null" ? "" : listdata[i].technicalLoss;
							hourlycounts_g4[j].planSetupCount 	= listdata[i].planSetupCount== "null" ? "" : listdata[i].planSetupCount;
							hourlycounts_g4[j].unplanSetupCount = listdata[i].unplanSetupCount== "null" ? "" : listdata[i].unplanSetupCount;
							hourlycounts_g4[j].exchgToolCount 	= listdata[i].exchgToolCount== "null" ? "" : listdata[i].exchgToolCount;
							hourlycounts_g4[j].changeoverLoss 	= listdata[i].changeoverLoss== "null" ? "" : listdata[i].changeoverLoss;
							hourlycounts_g4[j].lackPersonnelCount = listdata[i].lackPersonnelCount== "null" ? "" : listdata[i].lackPersonnelCount;
							hourlycounts_g4[j].lackMaterialCount = listdata[i].lackMaterialCount== "null" ? "" : listdata[i].lackMaterialCount;
							hourlycounts_g4[j].testReleaseThreePartsCount = listdata[i].testReleaseThreePartsCount== "null" ? "" : listdata[i].testReleaseThreePartsCount;
							hourlycounts_g4[j].exchgMaterialCount = listdata[i].exchgMaterialCount== "null" ? "" : listdata[i].exchgMaterialCount;
							hourlycounts_g4[j].unplanSampleCount = listdata[i].unplanSampleCount== "null" ? "" : listdata[i].unplanSampleCount;
							hourlycounts_g4[j].newOperatorCount = listdata[i].newOperatorCount== "null" ? "" : listdata[i].newOperatorCount;
							hourlycounts_g4[j].othersCount 		= listdata[i].othersCount== "null" ? "" : listdata[i].othersCount;
							hourlycounts_g4[j].orgnizationLoss 	= listdata[i].orgnizationLoss== "null" ? "" : listdata[i].orgnizationLoss;
							hourlycounts_g4[j].unplanTpmCount 	= listdata[i].unplanTpmCount== "null" ? "" : listdata[i].unplanTpmCount;
							hourlycounts_g4[j].performanceCount = listdata[i].performanceCount== "null" ? "" : listdata[i].performanceCount;
							hourlycounts_g4[j].undefinedCount 	= listdata[i].undefinedCount== "null" ? "" : listdata[i].undefinedCount;
							hourlycounts_g4[j].remark 			= listdata[i].remark== "null" ? "" : listdata[i].remark;
							
							//calculate sub total 
							hourlycounts_sub4.group4_plan 		+= (listdata[i].planCount == "" ? 0 : listdata[i].planCount);
							hourlycounts_sub4.group4_actual 	+= (listdata[i].actualCount == "" ? 0 : listdata[i].actualCount);
						}
					}
				}
				ractive.set("hourlyCountV0", hourlycounts_base);
				ractive.set("hourlyCountV1", hourlycounts_g1);
				ractive.set("hourlyCountV2", hourlycounts_g2);
				ractive.set("hourlyCountV3", hourlycounts_g3);
				ractive.set("hourlyCountV4", hourlycounts_g4);
				ractive.set("hourlyCountsTotal1", hourlycounts_sub1);
				ractive.set("hourlyCountsTotal2", hourlycounts_sub2);
				ractive.set("hourlyCountsTotal3", hourlycounts_sub3);
				ractive.set("hourlyCountsTotal4", hourlycounts_sub4);
				//ractive.update();
			}
		
		});
	}
	
	return {
		init:init
	}
}();
$(document).ready(hourlycount.init);