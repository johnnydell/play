var manager = function() {
    var cookieDomain = "";
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    var context = "edashboard"; //上下文
    var origin = location.origin//地址
    var root = origin+"/"+context;
    var params = [];//参数数组
    var years = [];
	var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    if(location.search !=''){
    	var pA = location.search.split('?')[1].split('&');
    	for(i = 0; i < pA.length;i++){
    		params.push({k:pA[i].split('=')[0],v:pA[i].split('=')[1]});    		
    	}
    }
    //TODO 初始化语言环境
	var language = getCookie("language");
	if(language == "undefined" || language == undefined){
		language = "zh";
		setCookie("language", language);
	}
	
	//设置cookie
	function setCookie(key, value) {
		var date = new Date();
		date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
		$.cookie(key,value,{
		    expires:date,   		
		    path:'/',		
		    domain:''
		})
	}
		
	//获取cookie
	function getCookie(objName){
	   return $.cookie(objName);		
	}
	
	//获取当前地址的参数
	function getPV(key){
		for(i = params.length-1; i >= 0; i--){
			if(params[i].k == key){
				return params[i].v;
			}   		
    	}
		return '';
	}
	
	//设定菜单按钮的选定，由具体页面来设定
	function setMenuBar(icon){
	     switch(icon){
	       case 'scr':
	         $(".box .left ul .icon-scr").parent().css("background","#ebeff4");
	       	  break;
	       case 'cd':
	          $(".box .left ul .icon-cd").children(2).css("background","#ebeff4");
	          break;
	       case 'gj':
	          $(".box .left ul .icon-gj").children(3).css("background","#ebeff4");
	       	  break;
	       case 'xf':
	          $(".box .left ul .icon-xf").children(4).css("background","#ebeff4");
	          break;   
	     }
	}
	
	// 国际化共通方法,dir表示当前的位置上级目录级位，../../两级，../一级
	function loadProperties(ractive, name,dir) {
	    jQuery.i18n.properties({// 加载资浏览器语言对应的资源文件
	        name: name, // 资源文件名称
	        path: dir+'i18n/', // 资源文件路径
	        mode: 'map', // 用 Map 的方式使用资源文件中的值
	        language: getCookie("language"),
	        callback: function () {// 加载成功后设置显示内容
	            for (var key in $.i18n.map) {
	                var value = $.i18n.map[key];
	                ractive.set(key, value);
	            }
	        }
	    });
	}
	
	//渲染整体布局
	function renderLayout(){	
	   //渲染left部分
	   $.get(root+"/views/tpl/common/left.html", function (template) {
	        var ractive = new Ractive({
	            el: '.left',
	            data:{root:root},
	            template: template
	        });   
	        
	        ractive.on({	        	
	          toDashboard:function(){
	              location.href = root+"/views/index.html";
	          },
	          toMeetAttendence:function(){
	        	  location.href = root+"/views/board/meetAttd.html";
	          },
	          toSettings:function(){
	              location.href = root+"/views/settings.html";
	          },
	          toOthers:function(){
	              location.href = root+"/views/board/opl.html";
	          },
	          toScreen:function(){
	          	  location.href = root+"/views/scr.html?lineName=FAG5";
	          },
	          toLogin:triggerLogin
	        })
	        
	    });
	    
	   //渲染right-header部分
	   $.get(root+"/views/tpl/common/right-header.html", function (template) {
	        var ractive = new Ractive({
	            el: '.right header',
	            data:{root:root},
	            template: template
	        }); 
	        
	        ractive.on({
	           toggleLeft:function(){
	             $(".left").toggle(900);
	           }
	        })
	    });
	    
	   //渲染right-footer部分
	   $.get(root+"/views/tpl/common/right-footer.html", function (template) {
	        var ractive = new Ractive({
	            el: '.right footer',
	            data:{root:root},
	            template: template
	        });   
	    });   
	}
	
	//触发弹出登录
	function triggerLogin(){	     
    	  $(".login_popup").show(); 
    	  $.get(root+"/views/tpl/common/login.html", function (data) {
  	        var ractive2 = new Ractive({
  	            el: ".login_popup",
  	            template: data,
  	            data:{root:root},
  	            oncomplete: function () {

  	            }
  	        });

  	        ractive2.on("login", function () {
  	          $(".login_popup").hide().html("");
  	        });
  	        
  	        ractive2.on("close", function () {
  	            $(".login_popup").hide().html("");
  	        });
  	    });      	
    }
	
	//根据年月后期的当前年月的具体天数
	function getDaysCnt(_year,_month){
		var year = parseInt(_year);
		var month = parseInt(_month);
		//定义天数；
        var days;
        //当月份为二月时，根据闰年还是非闰年判断天数
        if (month == 2) {
            days = year % 4 == 0 ? 29 : 28;

        } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            days = 31;
        } else {
            //其他月份，天数为：30.
            days = 30;
        }
        return days;
	}
	
	//获取服务系统日期
	function getSystemDate(){
		var date;
		$.ajax({
			url: manager.root + "/common/getCurrDate",
			type: "GET",
			async:false,
			success: function(data) {
				date = data;
			}
		});
		return date;
	}
	
	//获取服务系统时间
	function getSystemDateTime(){
		var date_time;
		$.ajax({
			url: manager.root + "/common/getCurrDateTime",
			type: "GET",
			async:false,
			success: function(data) {
				date_time = data;
			}
		});
		return date_time;
	}
	
	//获取服务器明天的日期
	function getDateByOffset(offset){
		var date;
		$.ajax({
			url: manager.root + "/common/getDateByOffset/"+offset,
			type: "GET",
			async:false,
			success: function(data) {
				date = data;
			}
		});
		return date;
	}
	
	function getSystemTime(){
		var date;
		$.ajax({
			url: manager.root + "/common/getCurrTime",
			type: "GET",
			async:false,
			success: function(data) {
				date = data;
			}
		});
		return date;
	}
	
	//获取系统参数
	function getSystemParameters(){
		var sysParams;
		$.ajax({
			url: manager.root + "/common/getSysParams",
			type: "GET",
			async:false,
			success: function(data) {
				console.log(data);
				sysParams = data;
			}
		});
		return sysParams;
	}
	
	function getCurrentYear(){
		var today = new Date();
		return today.getFullYear();
	}
	
	function getCurrentMonth(){
		var today = new Date();
		return today.getMonth() + 1;
	}
	
	function getYearArrays(_baseYear,_offset){
		var years = [];
		var year = _baseYear;
		if(_baseYear == undefined || _baseYear == null){
			var date = getSystemDate();
			_baseYear = parseInt(date.split("-")[0]);
		} 
		year = parseInt(_baseYear);
		if(_offset != undefined && _offset != null){
			if(parseInt(_offset) >= 0){
				for(i = 0; i <= parseInt(_offset); i ++){
					years.push(year + i);
				}
			} else {
				for(i = parseInt(_offset); i <= 0; i ++){
					years.push(year + i);
				}
			}
		} else {
			for(i = -5; i < 10; i ++){
				years.push(year + i);
			}
		}
		return years;
	}
	
	function isNull(arg1){
		return !arg1 && arg1!==0 && typeof arg1!=="boolean" ? true : false;
	}
	
	function checkFloat(e) { 
		var event = e || window.event;
		var target = event.srcElement || event.target;
	    var re = /^\d+(?=\.{0,1}\d+$|$)/ 
	    if (target.value != "") { 
	        if (!re.test(target.value)) { 
	            jAlert($.i18n.prop("i18n_incorrect_data_format"), $.i18n.prop("i18n_error"));
	        	target.value = ""; 
	        	target.focus();
	        } 
	    } 
	}
	
	function keyupFloat(e){
		var event = e || window.event;
		var target = event.srcElement || event.target;
		target.value = target.value.replace(/[^0-9.]/g,'');
	}
	
	function keyupInt(e){
		var event = e || window.event;
		var target = event.srcElement || event.target;
		target.value = target.value.replace(/[^0-9]/g,'');
	}
	
	function percentNumFormat(obj) { 
		
	    var re = /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
	    if (obj != "") { 
	        if (!re.test(obj)) { 
	            return false;
	        } 
	        else
	        	return true;
	    } 
	}
	
	function onlyAcceptNumAndPoint(obj){
		obj.value = obj.value.replace(/[^\d.]/g, "");//清除“数字”和“.”以外的字符
	}
	
	function formatNumberAsUS(num, precision, separator) {
	    var parts;
	    // 判断是否为数字
	    if (!isNaN(parseFloat(num)) && isFinite(num)) {
	        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
	        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
	        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
	        // 的值变成了 12312312.123456713
	        num = Number(num);
	        // 处理小数点位数
	        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
	        // 分离数字的小数部分和整数部分
	        parts = num.split('.');
	        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
	        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

	        return parts.join('.');
	    }
	    return NaN;
	}

	return {
		init: renderLayout,
		loadProperties:loadProperties,
		root:root,
		currentYear:getCurrentYear,
		years:getYearArrays,
		currentMonth:getCurrentMonth,
		months:months,
		getDaysCnt:getDaysCnt,
		getPV:getPV,
		setMenuBar:setMenuBar,
		getSystemDate:getSystemDate,
		getSystemTime:getSystemTime,
		getSystemDateTime:getSystemDateTime,
		getSystemParams:getSystemParameters,
		getDateByOffset:getDateByOffset,
		isNull:isNull,
		checkFloat:checkFloat,
		keyupFloat:keyupFloat,
		keyupInt:keyupInt,
		onlyAcceptNumAndPoint:onlyAcceptNumAndPoint,
		percentNumFormat:percentNumFormat,
		formatNumberAsUS:formatNumberAsUS,
		setLanguage:function(language){
			setCookie("language", language);
		},
		getLanguage:function(){
			return getCookie("language");
		},
		getLoginUserInfo:function(){
			var str = getCookie("user_info");
			if(str == undefined){
				return {
					user_id:"0",
					user_name:""
				}
			}
			return $.parseJSON(str);
		},
		block: function() {
        	$.blockUI({
                message: '<div style="font-size: 14px;font-weight: bold;color: #f60;height: 40px;width: 250px;line-height: 40px;text-align: center;margin: 0 auto;"><img alt="" src="' + root + '/images/loading.gif"></div>',
                css: {
                    border: 'none',
                    padding: '2px',
                    top: "50%",
                    left: "40%",
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#333',
                    opacity: 0.3,
                    cursor:'default'
                }
            });
        },
        unblock: function() {
        	$.unblockUI();
        },
        triggerLogin:triggerLogin
 }

}();

$(document).ready(manager.init);
