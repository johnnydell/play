var hourlycount = function(){
	
	var hourlycounts_base, hourlycounts = [], hourlycounts_sub_total = [];
	var lineName =  manager.getPV("lineName");;
	var lineId = manager.getPV("lineId");
	var dateTodayStr = null;
	var validation = true;
	var ractive = null;
	var limits = permission.load("hourly_count");
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
				limits      : limits,
				lineName 	: lineName,
				dateToday	: dateTodayStr,
				lineId		: lineId,
				format		: function(num){
					if ( null == num || num == 0 || num == '' ) 
						return '';
					else
						return num;
				},
				percentage		: function(num){
					return ( num *100 ).toFixed( 1 ) + ' %';
				},
				pointone		: function(num){
					return ( num *1 ).toFixed( 1 ) ;
				},
				
			},
			
			onrender: function(){
				manager.loadProperties(this, "hourlycount", "../../");
				manager.loadProperties(this, "common", "../../");
			},
			oncomplete: function(){
				manager.setMenuBar("sy");
				//active date picker control
				$("#lblDateShow").datepicker({
				      changeMonth: true,
				      changeYear: true,
				      dateFormat: 'yy-mm-dd',
				      
				      //refresh hourly count data table
				      onClose:function(dateText, inst){
				    	  dateTodayStr = dateText;
				    	  queryHourlyCount(lineName, dateText);
				    	  
				      }
				 });
				
				//initial hourly count data
				queryHourlyCount(lineName, dateTodayStr);
			}
		});
		
		ractive.on({
			gotoOPL:function(e){
				window.location.href = manager.root + "/views/board/opl.html?lineName="+lineName+"&lineId="+lineId;
			},
			/*hide label, show text*/
			toShowColumnEditor:function(e){
				var val = $(e.node).children(0).next().val();
				$(e.node).children(0).hide().next().show().focus().select();
				if (manager.isNull(val) || parseInt(val) == 0 ){
					$(e.node).children(0).next().val("");
				}
			},
			/*hide text, show label*/
			toHideColumnEditor:function(e){
				$(e.node).hide().prev().show().text($(e.node).val());
			},
			toValidateManHour1:function(e){
				if (!manager.isNull($(e.node).val())){
					if (manager.isNull(hourlycounts_base.manHourShift1)){
						validation = false;
						jAlert( $.i18n.map['i18n_hourlycount_manhour_shift_1'] + ' ' + $.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
						return validation;
					}
					else{
						validation = true;
					}
				}
				$(e.node).hide().prev().show();
					
			},
			toValidateManHour2:function(e){
				if (!manager.isNull($(e.node).val())){
					if (manager.isNull(hourlycounts_base.manHourShift2)){
						validation = false;
						jAlert( $.i18n.map['i18n_hourlycount_manhour_shift_2'] + ' ' + $.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
						return validation;
					}
					else{
						validation = true;
					}
				}
				$(e.node).hide().prev().show();
			},
			toValidateManHour3:function(e){
				if (!manager.isNull($(e.node).val())){
					if (manager.isNull(hourlycounts_base.manHourShift3)){
						validation = false;
						jAlert( $.i18n.map['i18n_hourlycount_manhour_shift_3'] + ' ' + $.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
						return validation;
					}
					else{
						validation = true;
					}
				}
				$(e.node).hide().prev().show();
			},
			/*used for team leader signature*/
			toShowLogin:function(e){
				cellIndex = e.node.cellIndex;
				manager.triggerLogin();
				switch(cellIndex){
				case 2:
				default:
					hourlycounts_base.teamLeaderSign1 = "Leader1";
					break;
				case 4:
					hourlycounts_base.teamLeaderSign2 = "Leader2";
					break;
				case 6:
					hourlycounts_base.teamLeaderSign3 = "Leader3";
					break;
				case 8:
					hourlycounts_base.groupLeaderSign = "Leader4";
					break;
				}
				ractive.update();
			},
			/*Calculate plan count, plan total count*/
			toHideColumnEditorWithCalculationForPlan:function(e){
				var val = isNull($(e.node).val()) ? "" : parseInt($(e.node).val());
				//set current plan label value
				$(e.node).hide().prev().show().text(val);
			},
			/*calculate actual count, actual total count, hourly count*/
			toHideColumnEditorWithCalculationForActual:function(e){
				var val = isNull($(e.node).val()) ? "" : parseInt($(e.node).val());
				//set current plan label value
				$(e.node).hide().prev().show().text(val);
				
				calculateActualTotal();
				ractive.update();
			},
			/*popup remarks window*/
			toShowRemark:function(e){
				
				var cellIndex = e.node.cellIndex;
				var rowIndex = e.index.index;
				var lossName = "";
				var lossChildName = "";
				switch(cellIndex){
				case 10:
				default:
					lossName = "Q1";
					break;
				case 11:
					lossName = "Q2";
					break;
				case 13:
					lossName = "T1";
					break;
				case 14:
					lossName = "T2";
					break;
				case 16:
					lossName = "C1";
					break;
				case 17:
					lossName = "C2";
					break;
				case 18:
					lossName = "C3";
					break;
				case 20:
					lossName = "O1";
					break;
				case 21:
					lossName = "O2";
					break;
				case 22:
					lossName = "O3";
					break;
				case 23:
					lossName = "O4";
					break;
				case 24:
					lossName = "O5";
					break;
				case 25:
					lossName = "O6";
					break;
				case 26:
					lossName = "O7";
					break;
				case 27:
					lossName = "O8";
					break;
				}
				
				//get remark content
				var lossCount, lossReason;
				var remarks = $(e.node).parent().children().last().prev().text();
				if (!isNull(remarks)){
					remark = remarks.split(";");
					for(i = 0; i < remark.length; i ++){
						lossNameStr = remark[i].split("-")[0];
						lossChildName = remark[i].split("-")[1];
						lossCount 	= remark[i].split("-")[2];
						lossReason 	= remark[i].split("-")[3];
						if (lossName == lossNameStr)
							break;
					}
				}
				/**/
				var lossInfo = {lossNameV: lossName, lossChildNameList:[], lossChildName:lossChildName, lossCountV : lossCount,lossReasonV:lossReason };
				$(".hourly_popup").show();  
  	    	  	$.get(manager.root+"/views/tpl/board/hourlypopup.html", function (data) {
  	    	  			
	        	        var ractive2 = new Ractive({
	        	            el: ".hourly_popup",
	        	            template: data,
	        	            data:{
	        	            	root		: manager.root,
	        	            	lossInfoObj : lossInfo
	        	            	},
        	            	onrender: function(){
        	    				manager.loadProperties(this, "hourlycount", "../../");
        	    				manager.loadProperties(this, "common", "../../");
        	    			},
	        	            oncomplete: function () {
	        	            	$.ajax({
	        	        			url		: manager.root + '/views/board/hourlycount/oeeLossChildChildName',
	        	        			type	: 'GET',
	        	        			dataType:"json",
	        	        			data:{oeeLossChildName:lossName},
	        	        			contentType: "application/json",
	        	        			success: function(listdata)
	        	        			{
	        	        				lossInfo.lossChildNameList = listdata;
	        	        				
	        	        				ractive2.update();
	        	        			}
	        	            	});
	        	            }
	        	        });
	        	        /*Only allow input number in text*/
	        	        ractive2.on("toValidateEditorOnlyNum",function(e){
	        				var val = $(e.node).val();
	        				$(e.node).val(val.replace(/\D/g, ''));
	        			});
	        	        ractive2.on("save", function () {
	        	        	
	        	        	if (isNull(lossInfo.lossCountV)){
	        	        		jAlert($.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
	        	        		$("#remark_count").css("border", "1px solid red");
	        	        		return false;
	        	        	}else{
	        	        		$("#remark_count").css("border", "1px solid #ccc");
	        	        	}
	        	        	/*if (isNull(lossInfo.lossReasonV)){
	        	        		jAlert($.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
	        	        		$("#remark_reason").css("border", "1px solid red");
	        	        		return false;
	        	        	}else{
	        	        		$("#remark_reason").css("border", "1px solid #ccc");
	        	        	}*/
	        	        		
	        	        	//update remarks
	        	        	if (!isNull(remarks)){
	        	        		//update remarks by current loss name
	        	        		if (remarks.indexOf(lossName) > -1){
	        	        			lossNameIndex = remarks.indexOf(lossName);
	        	        			commaIndex = remarks.indexOf(";", lossNameIndex);
	        	        			remarks = remarks.substr(0, lossNameIndex) + lossName + "-" + lossInfo.lossChildName + "-" + lossInfo.lossCountV + "-" + lossInfo.lossReasonV + ";" + remarks.substr(commaIndex + 1, remarks.length - 1);
	        	        		}
	        	        		//add new loss info into remark
	        	        		else{
	        	        			remarks += lossName + "-" + lossInfo.lossChildName + "-" + lossInfo.lossCountV + "-" + lossInfo.lossReasonV + ";";
	        	        		}
	        	        	}
	        	        	else{
	        	        		remarks += lossName + "-" + lossInfo.lossChildName + "-" + lossInfo.lossCountV + "-" + lossInfo.lossReasonV + ";";
	        	        	}
	        	        	
	        	        	//check product1 and product2 cycle time if null or 0, else not update loss count
	        	        	var baseCycle = 0;
	        	        	if (!isNull(hourlycounts[rowIndex].productCycle1) && hourlycounts[rowIndex].productCycle1 !== 0){
	        	        		baseCycle = hourlycounts[rowIndex].productCycle1;
	        	        	}
	        	        	else if (!isNull(hourlycounts[rowIndex].productCycle2) && hourlycounts[rowIndex].productCycle2 !== 0){
	        	        		baseCycle = hourlycounts[rowIndex].productCycle2;
	        	        	}
	        	        	
	        	        	//set loss counts or minutes for current type
	        	        	switch(cellIndex){
	        				case 10:
	        				default:
	        					hourlycounts[rowIndex].scrapCount = lossInfo.lossCountV;
	        					break;
	        				case 11:
	        					hourlycounts[rowIndex].reworkCount = lossInfo.lossCountV;
	        					break;
	        				case 13:
	        					hourlycounts[rowIndex].breakdownMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].breakdownCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle) ;
	        					}
	        					break;
	        				case 14:
	        					hourlycounts[rowIndex].adjustmentMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].adjustmentCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 16:
	        					hourlycounts[rowIndex].planSetupMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].planSetupCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 17:
	        					hourlycounts[rowIndex].unplanSetupMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].unplanSetupCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 18:
	        					hourlycounts[rowIndex].exchgToolMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].exchgToolCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 20:
	        					hourlycounts[rowIndex].lackPersonnelMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].lackPersonnelCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 21:
	        					hourlycounts[rowIndex].lackMaterialMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].lackMaterialCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 22:
	        					hourlycounts[rowIndex].testReleaseThreePartsMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].testReleaseThreePartsCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 23:
	        					hourlycounts[rowIndex].exchgMaterialMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].exchgMaterialCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 24:
	        					hourlycounts[rowIndex].unplanSampleMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].unplanSampleCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 25:
	        					hourlycounts[rowIndex].newOperatorMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].newOperatorCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 26:
	        					hourlycounts[rowIndex].unplanTpmMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].unplanTpmCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				case 27:
	        					hourlycounts[rowIndex].othersMin = lossInfo.lossCountV;
	        					if (baseCycle !== 0){
	        						hourlycounts[rowIndex].othersCount = Math.ceil( (lossInfo.lossCountV * 60) / baseCycle);
	        					}
	        					break;
	        				}
	        	        	
	        	        	//calculate total loss count for each tyep
	        	        	hourlycounts[rowIndex].qualityLoss = parseInt(hourlycounts[rowIndex].scrapCount) 
	        	        										+ parseInt(hourlycounts[rowIndex].reworkCount);
	        	        	hourlycounts[rowIndex].technicalLoss = parseInt(hourlycounts[rowIndex].breakdownCount) 
	        	        											+ parseInt(hourlycounts[rowIndex].adjustmentCount);
	        	        	hourlycounts[rowIndex].changeoverLoss = parseInt(hourlycounts[rowIndex].planSetupCount) 
	        	        											+ parseInt(hourlycounts[rowIndex].unplanSetupCount)
	        	        											+ parseInt(hourlycounts[rowIndex].exchgToolCount);
	        	        	hourlycounts[rowIndex].orgnizationLoss = parseInt(hourlycounts[rowIndex].lackPersonnelCount) 
	        	        											+ parseInt(hourlycounts[rowIndex].lackMaterialCount) 
	        	        											+ parseInt(hourlycounts[rowIndex].testReleaseThreePartsCount) 
	        	        											+ parseInt(hourlycounts[rowIndex].exchgMaterialCount)
	        	        											+ parseInt(hourlycounts[rowIndex].unplanSampleCount) 
	        	        											+ parseInt(hourlycounts[rowIndex].newOperatorCount)
	        	        											+ parseInt(hourlycounts[rowIndex].unplanTpmCount) 
	        	        											+ parseInt(hourlycounts[rowIndex].othersCount) ;
	        	        	
	        	        	hourlycounts[rowIndex].remark = remarks;
	        	        	$(".hourly_popup").hide().html("");
	        	        	ractive.update();
	        	        });
	        	        
	        	        ractive2.on("close", function () {
	        	            $(".hourly_popup").hide().html("");
	        	        });
	        	 });
			},
			/*Only allow input number in text*/
			toValidateEditorOnlyNum:function(e){
				var val = $(e.node).val();
				$(e.node).val(val.replace(/\D/g, ''));
			},
			/*Save*/
			saveHourlyCount:function(){

				if (!validation){
					jAlert( $.i18n.map['i18n_hourlycount_manhour_shift_1'] + ' ' + $.i18n.map['i18n_hourlycount_manhour_shift_2'] + ' ' + $.i18n.map['i18n_hourlycount_manhour_shift_3'] + ' ' + $.i18n.map['i18n_required'], $.i18n.map['i18n_error']);	
					return;
				}
				else{
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
						beforeSend: function() {
							manager.block();
						},
						success: function(ret)
						{
							if (ret == '1'){
								$("#msgBox").html($.i18n.map['i18n_save_ok']);
							}
							else{
								$("#msgBox").html($.i18n.map['i18n_save_error']);
							}
							
						},
						complete: function() {
							manager.unblock();
						}
					})
				}
			}
		})
	}
	
	/*Initial all of data*/
	function initDataTemplate(){
		hourlycounts = [];
		hourlycounts_base = {
								manHourShift1:"", manHourShift2:"", manHourShift3:"", teamLeaderSign1:"", teamLeaderSign2:"", teamLeaderSign3:"", 
								groupLeaderSign:"", planOplTotalOutput:"", planOutputCount:0, actualOutputCount:0, targetOee: 0, actualOee:0
							};
		for (i = 8; i < 24; i ++){
			hourlycounts_item = {hourid: ((i - 1) + "-" + i),productHour: (i),productHourIndex: (i - 7), lineName:"",productTypeName1:"",productCycle1:0,productTypeName2:"",
					productCycle2:0,planCount:0,planTotalCount:0,actualCount:"",actualTotalCount:"",productHourCount:"",productHourPercent:0,
					scrapCount:0,reworkCount:0,qualityLoss:0,breakdownCount:0,adjustmentCount:0,technicalLoss:0,planSetupCount:0,unplanSetupCount:0,exchgToolCount:0,changeoverLoss:0,
					lackPersonnelCount:0,lackMaterialCount:0, testReleaseThreePartsCount:0,exchgMaterialCount:0,unplanSampleCount:0,newOperatorCount:0,unplanTpmCount:0,othersCount:0,
					breakdownMin:0,adjustmentMin:0,planSetupMin:0,unplanSetupMin:0,exchgToolMin:0,lackPersonnelMin:0,lackMaterialMin:0, testReleaseThreePartsMin:0,
					exchgMaterialMin:0,unplanSampleMin:0,newOperatorMin:0,unplanTpmMin:0,othersMin:0,orgnizationLoss:0,performanceCount:0, undefinedCount:0,remark:"",techDownCode:""};
			hourlycounts.push(hourlycounts_item);
		}
		hourlycounts_item = {hourid: "23-00",productHour:0,productHourIndex: 17, lineName:"",productTypeName1:"",productCycle1:0,productTypeName2:"",productCycle2:0,planCount:0,
				planTotalCount:0,actualCount:"",actualTotalCount:"",productHourCount:"",productHourPercent:0,
				scrapCount:0,reworkCount:0,qualityLoss:0,breakdownCount:0,adjustmentCount:0,technicalLoss:0,planSetupCount:0,unplanSetupCount:0,exchgToolCount:0,changeoverLoss:0,
				lackPersonnelCount:0,lackMaterialCount:0, testReleaseThreePartsCount:0,exchgMaterialCount:0,unplanSampleCount:0,newOperatorCount:0,unplanTpmCount:0,othersCount:0,
				breakdownMin:0,adjustmentMin:0,planSetupMin:0,unplanSetupMin:0,exchgToolMin:0,lackPersonnelMin:0,lackMaterialMin:0, testReleaseThreePartsMin:0,
				exchgMaterialMin:0,unplanSampleMin:0,newOperatorMin:0,unplanTpmMin:0,othersMin:0,orgnizationLoss:0,performanceCount:0, undefinedCount:0,remark:"",techDownCode:""};
		hourlycounts.push(hourlycounts_item);
		for (i = 1; i < 8; i ++){
			hourlycounts_item = {hourid: ((i - 1) + "-" + i),productHour:(i),productHourIndex: (i + 17),lineName:"",productTypeName1:"",productCycle1:0,productTypeName2:"",productCycle2:0,
					planCount:0,planTotalCount:0,actualCount:"",actualTotalCount:"",productHourCount:"",productHourPercent:0,
					scrapCount:0,reworkCount:0,qualityLoss:0,breakdownCount:0,adjustmentCount:0,technicalLoss:0,planSetupCount:0,unplanSetupCount:0,exchgToolCount:0,changeoverLoss:0,
					lackPersonnelCount:0,lackMaterialCount:0, testReleaseThreePartsCount:0,exchgMaterialCount:0,unplanSampleCount:0,newOperatorCount:0,unplanTpmCount:0,othersCount:0,
					breakdownMin:0,adjustmentMin:0,planSetupMin:0,unplanSetupMin:0,exchgToolMin:0,lackPersonnelMin:0,lackMaterialMin:0, testReleaseThreePartsMin:0,
					exchgMaterialMin:0,unplanSampleMin:0,newOperatorMin:0,unplanTpmMin:0,othersMin:0,orgnizationLoss:0,performanceCount:0, undefinedCount:0,remark:"",techDownCode:""};
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
					hourlycounts_base.teamLeaderSign1 	= isNull(listdata[0].hourlyCountBase.teamLeaderSign1) ? "" : listdata[0].hourlyCountBase.teamLeaderSign1;
					hourlycounts_base.teamLeaderSign2 	= isNull(listdata[0].hourlyCountBase.teamLeaderSign2) ? "" : listdata[0].hourlyCountBase.teamLeaderSign2;
					hourlycounts_base.manHourShift1 	= isNull(listdata[0].hourlyCountBase.manHourShift1) ? "" : listdata[0].hourlyCountBase.manHourShift1;
					hourlycounts_base.manHourShift2 	= isNull(listdata[0].hourlyCountBase.manHourShift2) ? "" : listdata[0].hourlyCountBase.manHourShift2;
					//hourlycounts_base.teamLeaderSign3 	= isNull(listdata[0].hourlyCountBase.teamLeaderSign3) ? "" : listdata[0].hourlyCountBase.teamLeaderSign3;
					hourlycounts_base.groupLeaderSign 	= isNull(listdata[0].hourlyCountBase.groupLeaderSign) ? "" : listdata[0].hourlyCountBase.groupLeaderSign;
					hourlycounts_base.planOplTotalOutput = listdata[0].hourlyCountBase.planOplTotalOutput;
					hourlycounts_base.targetOeePercent	= listdata[0].hourlyCountBase.targetOeePercent;
				}
				if (listdata.length > 16){
					hourlycounts_base.teamLeaderSign3 	= isNull(listdata[16].hourlyCountBase.teamLeaderSign3) ? "" : listdata[16].hourlyCountBase.teamLeaderSign3;
					hourlycounts_base.manHourShift3 	= isNull(listdata[16].hourlyCountBase.manHourShift3) ? "" : listdata[16].hourlyCountBase.manHourShift3;
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
					
					hourlycounts[i].breakdownMin 			= isNull(listdata[i].breakdownMin) ? 0 : parseInt(listdata[i].breakdownMin);
					hourlycounts[i].adjustmentMin 			= isNull(listdata[i].adjustmentMin) ? 0 : parseInt(listdata[i].adjustmentMin);
					hourlycounts[i].planSetupMin 			= isNull(listdata[i].planSetupMin) ? 0 : parseInt(listdata[i].planSetupMin);
					hourlycounts[i].unplanSetupMin 			= isNull(listdata[i].unplanSetupMin) ? 0 : parseInt(listdata[i].unplanSetupMin);
					hourlycounts[i].exchgToolMin 			= isNull(listdata[i].exchgToolMin) ? 0 : parseInt(listdata[i].exchgToolMin);
					hourlycounts[i].lackPersonnelMin 		= isNull(listdata[i].lackPersonnelMin) ? 0 : parseInt(listdata[i].lackPersonnelMin);
					hourlycounts[i].lackMaterialMin 		= isNull(listdata[i].lackMaterialMin) ? 0 : parseInt(listdata[i].lackMaterialMin);
					hourlycounts[i].testReleaseThreePartsMin = isNull(listdata[i].testReleaseThreePartsMin) ? 0 : parseInt(listdata[i].testReleaseThreePartsMin);
					hourlycounts[i].exchgMaterialMin 		= isNull(listdata[i].exchgMaterialMin) ? 0 : parseInt(listdata[i].exchgMaterialMin);
					hourlycounts[i].unplanSampleMin 		= isNull(listdata[i].unplanSampleMin) ? 0 : parseInt(listdata[i].unplanSampleMin);
					hourlycounts[i].newOperatorMin 			= isNull(listdata[i].newOperatorMin) ? 0 : parseInt(listdata[i].newOperatorMin);
					hourlycounts[i].othersMin 				= isNull(listdata[i].othersMin) ? 0 : parseInt(listdata[i].othersMin);
					hourlycounts[i].unplanTpmMin 			= isNull(listdata[i].unplanTpmMin) ? 0 : parseInt(listdata[i].unplanTpmMin);
					
					hourlycounts[i].performanceCount 		= isNull(listdata[i].performanceCount) ? 0 : parseInt(listdata[i].performanceCount);
					hourlycounts[i].undefinedCount 			= isNull(listdata[i].undefinedCount) ? 0 : parseInt(listdata[i].undefinedCount);
					hourlycounts[i].remark 					= isNull(listdata[i].remark) ? "" : listdata[i].remark;
					hourlycounts[i].techDownCode 			= isNull(listdata[i].techDownCode) ? "" : listdata[i].techDownCode;
					hourlycounts[i].productHourPercent		= hourlycounts[i].planCount == 0 ? 0 : (hourlycounts[i].actualCount / hourlycounts[i].planCount);
					hourlycounts[i].planTotalCount			= isNull(listdata[i].planTotalCount) ? "" : listdata[i].planTotalCount;
					
					planTotalCount 							+= hourlycounts[i].planCount;
					actualTotalCount 						+= hourlycounts[i].actualCount;
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
				hourlycounts_base.planOutputCount = Math.round( parseInt(planTotalCount) * ((hourlycounts_base.targetOeePercent == undefined ? 0 : hourlycounts_base.targetOeePercent) / 100));
				hourlycounts_base.actualOutputCount = actualTotalCount;
				if (planTotalCount !== 0){
					hourlycounts_base.actualOee = actualTotalCount / planTotalCount;
				}
				
				ractive.set("hourlyCountV0", hourlycounts_base);
				ractive.set("hourlyCountV1", hourlycounts);
				ractive.set("hourlyCountsTotal", hourlycounts_sub_total);
				//ractive.update();
			}
		
		});
	}
	
	function calculateActualTotal(){
		hourlycounts_sub_total[0].group_actual = 0;
		hourlycounts_sub_total[1].group_actual = 0;
		hourlycounts_sub_total[2].group_actual = 0;
		hourlycounts_sub_total[3].group_actual = 0;
		var actualTotalCount = 0, planTotalCount = 0;
		for (i = 0; i < 24; i ++){
			hourlycounts[i].actualCount = manager.isNull(hourlycounts[i].actualCount) ? 0 : hourlycounts[i].actualCount;
			actualTotalCount 					+= parseInt(hourlycounts[i].actualCount);
			planTotalCount 						+= parseInt(hourlycounts[i].planCount);
			hourlycounts[i].actualTotalCount	= actualTotalCount;
			hourlycounts[i].productHourCount	= hourlycounts[i].actualCount;
			
			//calculate progress percent
			hourlycounts[i].productHourPercent = hourlycounts[i].planCount == 0 ? 0  : (hourlycounts[i].actualCount / hourlycounts[i].planCount);
			
			//calculate sub total count for group 1
			if (i < 8){
				hourlycounts_sub_total[0].group_actual += parseInt(hourlycounts[i].actualCount);
			}
			
			//calculate sub total count for group 2
			if (i < 12){
				hourlycounts_sub_total[1].group_actual += parseInt(hourlycounts[i].actualCount);
			}
			
			//calculate sub total count for group 3
			if (7 < i && i < 16){
				hourlycounts_sub_total[2].group_actual += parseInt(hourlycounts[i].actualCount);
			}
			//calculate sub total count for group 4
			if (15 < i && i < 24){
				hourlycounts_sub_total[3].group_actual += parseInt(hourlycounts[i].actualCount);
			}
		}
		
		//calculate actual OEE
		hourlycounts_base.actualOutputCount = actualTotalCount;
		if (planTotalCount !== 0){
			hourlycounts_base.actualOee = hourlycounts_base.actualOutputCount / planTotalCount;
		}
		
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