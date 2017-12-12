var manager = function() {
    
    
    var cookieDomain = "";
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    var context = "edashboard"; //上下文
    var origin = location.origin//地址
    var root = origin+"/"+context;
    var params = [];//参数数组
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
	}
	setCookie("language", language);
	
	//设置cookie
	function setCookie(key, value) {
		var date = new Date();
		date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
		document.cookie = key + "=" + escape(value) + "; path=/; domain = " + cookieDomain + "; expires=" + date.toGMTString();
	}
		
	//获取cookie
	function getCookie(objName){
		var arrStr = document.cookie.split("; ");
		for(var i = 0;i < arrStr.length;i ++){
			var temp = arrStr[i].split("=");
			if(temp[0] == objName){
				return unescape(temp[1]);
			}
		}
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
	          	  location.href = root+"/views/scr.html";
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
  	            console.log("login");
  	          $(".login_popup").hide().html("");
  	        });
  	        
  	        ractive2.on("close", function () {
  	            $(".login_popup").hide().html("");
  	        });
  	    });      	
    }

	return {
		init: renderLayout,
		loadProperties:loadProperties,
		root:root,
		getPV:getPV,
		setMenuBar:setMenuBar,
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