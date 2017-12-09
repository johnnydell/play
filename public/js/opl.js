var opl = function(){
	function init(){
		var opl = [];
		var deletedOPL =[];
		var years = ['2016','2017','2018'];
		var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "opl", "../../");
				this.set("years",years);
				this.set("months",months);
				var op1 = {
						id:"0",
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
						pss:'111.xls',
						responsible:'zhangsan',
						deadline:'2017-04-02',
						status:'N'						
					};
				opl.push(op1);
				var op2 = {
						id:"0",
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
						problemSolvingSheet:'N',
						pss:'',
						responsible:'zhangsan',
						deadline:'2017-04-02',
						status:'N'						
					};
				opl.push(op2);
				var op3 = {
						id:"0",
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
						status:'N'						
					};
				opl.push(op3);
				this.set("opl",opl);
			},
			oncomplete: function(){
				$('.opltr .date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$('.opltr .deadline').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$(".opltr .dtFrom").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
				$(".opltr .dtTo").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
			}
		});
		
		ractive.on({
			toShowYearSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideYearSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideMonthSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
			},
			toShowPageSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHidePageSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
			},
			toShowColumnEditor:function(e){
				$(e.node).children(0).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				if(type == 'select-one'){
					$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
				} else {
					$(e.node).hide().prev().show().text($(e.node).val());
				}
			},
			changePSS:function(e){
				
			},
			addOP:function(){				
				var op = {
						id:"0",
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
						pss:'111.xls',
						responsible:'zhangsan',
						deadline:'2017-04-02',
						status:'N'						
					};
				opl.push(op);
				ractive.update("opl");
				//对新增的行进行绑定时间选择事件
				$('.opltr:last .date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$('.opltr:last .deadline').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:'2000/01/01', // yesterday is minimum date
					maxDate:'2030/02/28' // and tommorow is maximum date calendar
				});
				$(".opltr:last .dtFrom").datetimepicker({
					datepicker:false,
					format:'H:i',
					step:5
				});
				$(".opltr:last .dtTo").datetimepicker({
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
				/*console.log(opl[0].days[3]);
				console.log(deletedOPL);*/
				console.log(manager);
				manager.triggerLogin();
			},
			showPss:function(e){
			    var index = $(e.node).parent().parent().attr("lang");
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
							        server: manager.root + '/addPss/uploadFile',
							
							        // 选择文件的按钮。可选。
							        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
							        pick: '#picker',
							        accept: {
										title: 'excel',
										extensions: 'xls,xlsx',
										mimeTypes: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
									}
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

	        	        ractive2.on("login", function () {
	        	            console.log("login");
	        	        });
	        	        
	        	        ractive2.on("close", function () {
	        	            $(".pss_popup").hide().html("");
	        	            opl[index].pss = currPss;
	        	            ractive.update("opl");
	        	        });
	        	    });   
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(opl.init);