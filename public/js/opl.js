var opl = function(){
	var years = manager.years();
	var months = manager.months;
	var condition = {};
	function init(){
		var opl = [];
		var deletedOPL =[];
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "opl", "../../");
				this.set("years",years);
				this.set("months",months);
				var sys_date = manager.getSystemDate();
				condition.line_id = "9336b6f78e7448e685bad5ba71c2e3f8";
				condition.year = sys_date.split("-")[0];
				condition.month = sys_date.split("-")[1];
				condition.line_name = "FAG2";
				condition.pageSize = 5;//每页多少条
				condition.page = 2;//当前页
				condition.pages = [1,2,3];//总共多少页
				this.set("condition", condition);
				refreshOPL();

				condition.pageSize = 10;//每页多少条
				condition.page = 1;//当前页
				condition.pages = [1,2,3];//总共多少页
				this.set("condition", condition);
				
				var op1 = {
						id:"1",
						checked:false,
						date:"2017-04-02",
						refNo:"BH001",
						personFound:"ZANSANG",
						station:'001',
						description:'sadfs dsaf a 你好！',
						dtFrom:'18:15',
						dtTo:'18:15',
						timing:'3',
						amt:'12',
						rootCause:'sdafdasfdasfdasfdsfdsf',
						immediate:'sdfasfdfexeafe sdfdfe ',
						longTerm:'1111',
						problemSolvingSheet:'Y',
						pss:'',
						responsible:'zhangsan',
						deadline:'2017-04-02',
						status:'N',
						updated:'0'
					};
				opl.push(op1);
				this.set("opl",opl);
			},
			oncomplete: function(){
				$('.cxttr .date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$('.cxttr .deadline').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
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
				
				//getOplData();
				//ractive.update();
			}
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
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
				currentYear = $(e.node).find("option:selected").val();
				//getOplData();
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideMonthSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
				currentMonth = $(e.node).find("option:selected").val();
				getOplData();
			},
			toShowPageSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHidePageSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
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
				if(type == 'select-one'){
					txt = $(e.node).find("option:selected").text();
				} else if(type == 'textarea') {
					txt = $(e.node).val();
					var index = $(e.node).parent().parent().attr("lang");
					var colName = $(e.node).attr("colName");
					if(colName != undefined && colName != ''){
						opl[index][colName] = txt;
					}
				} else {
					txt = $(e.node).val();
				}
				var old_txt = txt;
				txt = txt.length>10?txt.substring(0,10)+"....":txt;
				$(e.node).hide().prev().show().text(txt).attr("title",old_txt);
			},
			addOP:function(){				
				var op = {
						id:"0",
						checked:false,
						date:"",
						refNo:"",
						personFound:"",
						station:'',
						description:'',
						dtFrom:'',
						dtTo:'',
						timing:'',
						amt:'',
						rootCause:'',
						immediate:' sdfdfe ',
						longTerm:'',
						problemSolvingSheet:'N',
						pss:'',
						responsible:'',
						deadline:'',
						status:'N'						
					};
				opl.unshift(op);
				ractive.update("opl");
				//对新增的行进行绑定时间选择事件
				$('.cxttr:last .date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$('.cxttr:last .deadline').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$(".cxttr:last .dtFrom").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
				$(".cxttr:last .dtTo").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
			},
			deleteOP:function(){
			      var i = opl.length-1;
			      while (i >= 0){
			        var temp = opl[i];
			        if(temp.checked){
			            if(temp.id != '0'){
			            	deletedOPL.push(temp);
			            }
			            opl.splice(i,1);	
			        }
				  	i--;
				  }		      
			},
			saveOP:function(){
				console.log("prepare to save");
			},
			test:function(){
				console.log(opl[0]);
				/*console.log(deletedOPL);
				console.log(manager);
				manager.triggerLogin();*/
			},
			disableKeydown:function(){
				return false;
			},
			showPss:function(e){
			    var index = $(e.node).parent().parent().attr("lang");
			    var _$target = $(e.node);
				$(".pss_popup").show();  
    	    	  $.get(manager.root+"/views/tpl/board/addPSS.html", function (data) {
    	    	        var currPss	= opl[index].pss;     
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
		        	        	//window.open('staticpage.html?pageName=pss&oplLinkName=' + currPss);
		        	        	window.location.href='staticpage.html?pageName=pss&oplLinkName=' + currPss;
		        	        },
		        	        close:function () {
		        	            $(".pss_popup").hide().html("");
		        	            opl[index].pss = currPss;
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
	
	//获取OPL信息根据产线和年月和分页参数condition
	function getOPLByParamPagination(){
		$.ajax({
			url: manager.root+"/opl/getOPLByParamPagination",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:condition.line_id,year:condition.year,month:condition.month,page:condition.page,pageSize:condition.pageSize},
			async:false,
			success: function(data) {
				console.log(data.length);
				/*if (data !== "0"){
					for (i = 0; i < data.length; i ++){
						var op = {};
						op.id=data[i].id;
						op.checked=false;
						op.date=data[i].oplDate;
						op.refNo=data[i].refNo;
						op.personFound=data[i].oplFounder.userName;
						op.station=data[i].stationNo;
						op.description=data[i].oplDesc;
						op.dtFrom=data[i].oplStart;
						op.dtTo=data[i].oplEnd;
						op.timing=data[i].oplTiming;
						op.amt=data[i].oplAmount;
						op.rootCause=data[i].oplRootCause;
						op.immediate=data[i].oplImmediate;
						op.longTerm=data[i].oplLongTerm;
						op.problemSolvingSheet=data[i].problemSolve;
						op.pss=data[i].pssLink;
						op.responsible=data[i].oplOwner.userName;
						op.deadline=data[i].oplDeadline;
						op.status=data[i].oplStatus;
						opl.push(op);
					}
				}*/
			}
		});
	}
	
	//刷新OPL
	function refreshOPL(){
		var opls = getOPLByParamPagination();
	}
	
	return {
		init:init
	}
}();
$(document).ready(opl.init);
