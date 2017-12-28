var opl = function(){
	var years = manager.years();
	var months = manager.months;
	var condition = {};
	var opl = [];
	var sys_date = manager.getSystemDate();
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "opl", "../../");
				manager.loadProperties(this, "common", "../../");
				this.set("years",years);
				this.set("months",months);
				condition.line_id = "9336b6f78e7448e685bad5ba71c2e3f8";
				condition.year = sys_date.split("-")[0];
				condition.month = sys_date.split("-")[1];
				condition.line_name = "FAG2";
				condition.pageSize = 5;//每页多少条
				condition.page = 1;//当前页
				condition.pages = [];//总共多少页
				refreshOPL(this);
			},
			oncomplete: function(){}
		});
		
		ractive.on({
			checkAll:function(e){
				$(opl).each(function(i,n){
					n.checked = $(e.node).is(':checked');
				});				
				ractive.update("opl");
			},
			toShowYearSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideYearSelect:function(e){
				$(e.node).hide().prev().show();
				condition.page = 1;//当前页
				refreshOPL(ractive);
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideMonthSelect:function(e){
				$(e.node).hide().prev().show();
				condition.page = 1;//当前页
				refreshOPL(ractive);
			},
			toShowPageSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHidePageSelect:function(e){
				$(e.node).hide().prev().show();
				refreshOPL(ractive);
			},
			toShowColumnEditor:function(e){
				var event = e.original || window.event;
				event.stopPropagation();
				$(e.node).children(0).hide().next().show().focus();
			},
			stopPropagation: function(e){
				var event = e.original || window.event;
				event.stopPropagation();
			},
			toHideColumnEditor:function(e){
			    var type = e.node.type;
				var txt;
				var enable_txt_set = true;
				var index = $(e.node).parent().parent().attr("lang");
				if(type == 'select-one'){
					txt = $(e.node).find("option:selected").text();
					var colName = $(e.node).attr("colName");
					if(colName != undefined && colName == 'status'){
						opl[index]["status_img"] = $(e.node).find("option:selected").val().toLowerCase();
						enable_txt_set = false;
					}
				} else if(type == 'textarea') {
					txt = $(e.node).val();
					var colName = $(e.node).attr("colName");
					if(colName != undefined && colName != ''){
						opl[index][colName] = txt;
					}
				} else {
					txt = $(e.node).val();
				}
				var old_txt = txt;
				txt = txt.length>10?txt.substring(0,10)+"....":txt;
				if(enable_txt_set){
					$(e.node).hide().prev().show().text(txt).attr("title",old_txt);
				} else {
					$(e.node).hide().prev().show();
				}
				opl[index].updated = "1";
				ractive.update("opl");
			},
			addOP:function(){	
				var op = {
						id:"0",
						checked:false,
						date:condition.year+'-'+condition.month+'-01',
						refNo:"",
						founder:"",
						station:'temp',
						description:'',
						dtFrom:'10:00',
						dtTo:'10:30',
						timing:'5',
						amt:'5',
						rootCause:'',
						immediate:' sdfdfe ',
						longTerm:'',
						problemSolvingSheet:'N',
						pssLink:'',
						responsible:'',
						deadline:condition.year+'-'+condition.month+'-01',
						status:'N',
						status_img:'n',
						updated:'0'
				};
				opl.unshift(op);
				ractive.update("opl");
				//对新增的行进行绑定时间选择事件
				$('.cxttr:first .date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:condition.year+'/'+condition.month+'/01',
					maxDate:condition.year+'/'+condition.month+'/31'
				});
				$('.cxttr:first .deadline').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:condition.year+'/'+condition.month+'/01',
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$(".cxttr:first .dtFrom").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
				$(".cxttr:first .dtTo").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
			},
			deleteOP:function(){
				var deletedOPL =[];
				var deleteCnt = 0;
				$(opl).each(function(i,n){
					if(n.checked){
						if(n.id != '0'){
							deletedOPL.push(n);
						}
						deleteCnt++;
					}
				})
				
				if(deleteCnt > 0){
					if(deletedOPL.length > 0){
						$.ajax({
							url: manager.root + "/opl/deleteOPL",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({deletedOPL:deletedOPL}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								var i = opl.length-1;
								while (i >= 0){
								  var temp = opl[i];
								  if(temp.checked){
									  opl.splice(i,1);	
								  }
								  i--;
								}	
								ractive.set("opl",opl);		
								jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
							},
							error:function(){
								jAlert($.i18n.prop("i18n_delete_error"), $.i18n.prop("i18n_error"));
							},
							complete: function() {
								manager.unblock();
							}
						});						
					} else {
						var i = opl.length-1;
						while (i >= 0){
						  var temp = opl[i];
						  if(temp.checked){
							  opl.splice(i,1);	
						  }
						  i--;
						}	
						ractive.set("opl",opl);		
						jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
					}
				} else {
					jAlert($.i18n.prop("i18n_select_to_delete"), $.i18n.prop("i18n_error"));
				}        
			},
			saveOP:function(){
				var error = false;
				//判断opl详细有没为空的
				$(opl).each(function(i,n){
					if(n.date == '' || n.refNo == '' || n.founder == '' || 
							n.station == '' || n.dtFrom == '' || n.dtTo == '' ||
							n.timing == '' || n.amt == '' || n.immediate == '' || n.responsible == '' || n.deadline == ''){	
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
				})
				
				if(!error){
					//整理出需要新增和更新的
					var addOPL = [];
					var updateOPL = [];
					$(opl).each(function(i,n){
						if(n.id == '0'){
							addOPL.push(n);
						} else if(n.updated == "1"){
							updateOPL.push(n);
						}
					})
					
					if(addOPL.length > 0 || updateOPL.length > 0){
						$.ajax({
							url: manager.root + "/opl/saveOPL",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({condition:condition,addOPL:addOPL,updateOPL:updateOPL}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshOPL(ractive);	
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});		
					}
				}
			},
			test:function(){
				console.log(opl[0]);
				ractive.update("opl");
			},
			disableKeydown:function(){
				return false;
			},
			showPss:function(e){
			    var index = $(e.node).parent().parent().attr("lang");
			    var _$target = $(e.node);
			    opl[index].updated = "1";
				ractive.update("opl");
				$(".pss_popup").show();  
    	    	  $.get(manager.root+"/views/tpl/board/addPSS.html", function (data) {
    	    	        var currPss	= opl[index].pssLink;     
	        	        var ractive2 = new Ractive({
	        	            el: ".pss_popup",
	        	            template: data,
	        	            data:{root:manager.root},
	        	            oncomplete: function () {
	        	                var _ractive = this;
	        	                _ractive.set("currPss",currPss);
	        	                
	        	            	var $list = $('#thelist'),
							        $btn = $('#ctlBtn'),
							        state = 'pending',
							        uploader;
							    
							    uploader = WebUploader.create({							
							        // 不压缩image
							        resize: false,							
							        // swf文件路径
							        swf: manager.root + '/js/lib/webuploader-0.1.5/Uploader.swf',							
							        // 文件接收服务端。
							        server: manager.root + '/opl/addPSS',
							        // 选择文件的按钮。可选。
							        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
							        pick: '#picker'//,
							       // accept: {
									//	title: 'excel',
									//	extensions: 'xls,xlsx',
								//	mimeTypes: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
									//}
							    });
							
							    // 当有文件添加进来的时候
							    uploader.on( 'fileQueued', function( file ) {
							     	$list.html('');
							        $list.append( '<div id="' + file.id + '" class="item">' +
							            '<h4 class="info">' + file.name + '</h4>' +
							            '<p class="state">等待上传...</p>' +
							        '</div>' );
							    });
							
							    // 文件上传过程中创建进度条实时显示。
							    uploader.on( 'uploadProgress', function( file, percentage ) {
							        var $li = $( '#'+file.id ),
							            $percent = $li.find('.progress .progress-bar');
							
							        // 避免重复创建
							        if ( !$percent.length ) {
							            $percent = $('<div class="progress progress-striped active">' +
							              '<div class="progress-bar" role="progressbar" style="width: 0%">' +
							              '</div>' +
							            '</div>').appendTo( $li ).find('.progress-bar');
							        }
							        $li.find('p.state').text('上传中');
							
							        $percent.css( 'width', percentage * 100 + '%' );
							    });
							
							    uploader.on( 'uploadSuccess', function( file,resp ) {
							        $( '#'+file.id ).find('p.state').text('已上传');
							        if(resp.result === 'OK'){
							          currPss = resp.newFileName;
							          _ractive.set("currPss",currPss);
							        }
							    });
							
							    uploader.on( 'uploadError', function( file ) {
							        $( '#'+file.id ).find('p.state').text('上传出错');
							    });
							
							    uploader.on( 'uploadComplete', function( file ) {
							        $( '#'+file.id ).find('.progress').fadeOut();
							    });
							
							    uploader.on( 'all', function( type ) {
							        if ( type === 'startUpload' ) {
							            state = 'uploading';
							        } else if ( type === 'stopUpload' ) {
							            state = 'paused';
							        } else if ( type === 'uploadFinished' ) {
							            state = 'done';
							        }
							
							        if ( state === 'uploading' ) {
							            $btn.text('暂停上传');
							        } else {
							            $btn.text('开始上传');
							        }
							    });
							
							    $btn.on( 'click', function() {
							        if ( state === 'uploading' ) {
							            uploader.stop();
							        } else {
							            uploader.upload();
							        }
							    });        	            	   
	        	            }
	        	        });
	        	        	        	        
	        	        ractive2.on({
	        	        	gotoView:function () {
		        	        	console.log("currPss = " + currPss);
		        	        	window.location.href='staticpage.html?pageName=pss&oplLinkName=' + currPss;
		        	        },
		        	        close:function () {
		        	            $(".pss_popup").hide().html("");
		        	            opl[index].pssLink = currPss;
		        	            //ractive.update("opl");
		        	            if(currPss != ''){
		        	            	var txt = currPss.length>10?currPss.substring(0,10)+"....":currPss;
		        	           	    _$target.parent().children(0).html(txt);
		        	            }
		        	        }
	        	        })
	        	    });   
			}
		})
	}
	
	//绑定日期控件事件
	function bindDatepicker(){
		$('.cxttr .date').datetimepicker({
			yearOffset:0,
			timepicker:false,
			format:'Y-m-d',
			minDate:condition.year+'/'+condition.month+'/01',
			maxDate:condition.year+'/'+condition.month+'/31'
		});
		$('.cxttr .deadline').datetimepicker({
			yearOffset:0,
			timepicker:false,
			format:'Y-m-d',
			minDate:condition.year+'/'+condition.month+'/01',
			maxDate:'2030/02/28' // and tommorow is maximum date calendar
		});
		$(".cxttr .dtFrom").datetimepicker({
			datepicker:false,
			format:'H:i',
			step:5
		});
		$(".cxttr .dtTo").datetimepicker({
			datepicker:false,
			format:'H:i',
			step:5
		});
	}
	
	//获取OPL信息根据产线和年月和分页参数condition
	function getOPLByParamPagination(){
		var ret;
		$.ajax({
			url: manager.root+"/opl/getOPLByParamPagination",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:condition.line_id,year:condition.year,month:condition.month,page:condition.page,pageSize:condition.pageSize},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});
		return ret;
	}
	
	//刷新OPL
	function refreshOPL(_ractive){
		var ret = getOPLByParamPagination();
		var line = ret.line;
		var data = ret.data;
		var pageCnt = (ret.pageCnt == 0 ? 1:ret.pageCnt);
		opl = [];
		condition.line_name = line.lineName;
		var pages = [];
		for(i = 1;i <= pageCnt;i++){
			pages.push(i);
		}
		condition.pages = pages;
		if(data.length > 0){
			$(data).each(function(i,n){
				var det = {};
				det.id = n.id;
				det.checked = false;
				det.date = n.date;
				det.refNo = n.refNo;
				det.founder = n.founder;
				det.station = n.station;
				det.description = n.description;
				det.dtFrom = n.start;
				det.dtTo = n.end;
				det.timing = n.timing;
				det.amt = n.amount;
				det.rootCause = n.rootCause;
				det.immediate = n.immediate;
				det.longTerm = n.longTerm;
				det.problemSolvingSheet = n.problemSolve;
				det.pssLink = n.pssLink;
				det.responsible = n.owner;
				det.deadline = n.deadline;
				det.status = n.status;
				det.status_img = n.status.toLowerCase();
				det.updated = "0";
				opl.push(det);
			})			
		}
		_ractive.set("condition", condition);
		_ractive.set("opl",opl);
		bindDatepicker();
	}
	
	return {
		init:init
	}
}();
$(document).ready(opl.init);
