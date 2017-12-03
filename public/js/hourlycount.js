var hourlycount = function(){
	function init(){
		var hourlycounts_g1 = [
			{hourid:"7-8",productHour:"8",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"8-9",productHour:"9",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"9-10",productHour:"10",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"10-11",productHour:"11",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"11-12",productHour:"12",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"12-13",productHour:"13",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"13-14",productHour:"14",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"14-15",productHour:"15",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
			
		];
		var hourlycounts_sub1 = {group1_plan:"", group1_actual:""};
		var hourlycounts_g2 = [
			{hourid:"15-16",productHour:"16",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"16-17",productHour:"17",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"17-18",productHour:"18",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"18-19",productHour:"19",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
		];
		var hourlycounts_sub2 = {group2_plan:"", group2_actual:""};
		var hourlycounts_g3 = [
			{hourid:"19-20",productHour:"20",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"20-21",productHour:"21",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"21-22",productHour:"22",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"22-23",productHour:"23",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
		];
		var hourlycounts_sub3 = {group3_plan:"", group3_actual:""};
		var hourlycounts_g4 = [
			{hourid:"23-00",productHour:"0",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"00-1",productHour:"1",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"1-2",productHour:"2",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},		
			{hourid:"2-3",productHour:"3",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"3-4",productHour:"4",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"4-5",productHour:"5",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"5-6",productHour:"6",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""},
			{hourid:"6-7",productHour:"7",lineName:"",productTypeName1:"",productCycle1:"",productTypeName2:"",productCycle2:"",planCount:"",planCount:"",actualCount:"",actualCount:"",productHourCount:"",
				scrapCount:"",reworkCount:"",qualityLoss:"",breakdownCount:"",adjustmentCount:"",technicalLoss:"",planSetupCount:"",unplanSetupCount:"",exchgToolCount:"",changeoverLoss:"",
				lackPersonnelCount:"",lackMaterialCount:"", testReleaseThreePartsCount:"",exchgMaterialCount:"",unplanSampleCount:"",newOperatorCount:"",unplanTpmCount:"",othersCount:"",
				orgnizationLoss:"",performanceCount:"", undefinedCount:"",remark:""}
		];
		var hourlycounts_sub4 = {group4_plan:"", group4_actual:""};
		
		var hours = [
			{h:0,v:"23-00"},
			{h:1,v:"00-1"},
			{h:2,v:"1-2"},
			{h:3,v:"2-3"},
			{h:4,v:"3-4"},
			{h:5,v:"4-5"},
			{h:6,v:"5-6"},
			{h:7,v:"6-7"},
			{h:8,v:"7-8"},
			{h:9,v:"8-9"},
			{h:10,v:"9-10"},
			{h:11,v:"10-11"},
			{h:12,v:"11-12"},
			{h:13,v:"12-13"},
			{h:14,v:"13-14"},
			{h:15,v:"14-15"},
			{h:16,v:"15-16"},
			{h:17,v:"16-17"},
			{h:18,v:"17-18"},
			{h:19,v:"18-19"},
			{h:20,v:"19-20"},
			{h:21,v:"20-21"},
			{h:22,v:"21-22"},
			{h:23,v:"22-23"}
		];
		
		
		
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root, 
				hourlyCountV1:hourlycounts_g1,
				hourlyCountV2:hourlycounts_g2,
				hourlyCountV3:hourlycounts_g3,
				hourlyCountV4:hourlycounts_g4,
				hourlyCountsTotal1:hourlycounts_sub1,
				hourlyCountsTotal2:hourlycounts_sub2,
				hourlyCountsTotal3:hourlycounts_sub3,
				hourlyCountsTotal4:hourlycounts_sub4},
			
			onrender: function(){
				manager.loadProperties(this, "hourlycount", "../../");
			},
			oncomplete: function(){
				$.ajax({
					url		: manager.root + '/views/board/hourlycount/FAG',
					type	: 'post',
					data	: '',
					success: function(json)
					{
						console.log(json);
						
						
					}
				});
			}
		});
		
		ractive.on({
			
			
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(hourlycount.init);