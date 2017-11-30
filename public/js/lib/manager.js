var manager = function() {
    
    
    var cookieDomain = "";
    
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
	          toSettings:function(){
	              location.href = root+"/views/settings.html";
	          },
	          toOthers:function(){
	              location.href = root+"/views/board/opl.html";
	          },
	          toLogin:function(){	     
      	    	  $(".popup").show();  
      	    	  $.get(root+"/views/tpl/common/login.html", function (data) {
	        	        var ractive2 = new Ractive({
	        	            el: ".popup",
	        	            template: data,
	        	            data:{root:root},
	        	            oncomplete: function () {

	        	            }
	        	        });

	        	        ractive2.on("login", function () {
	        	            console.log("login");
	        	        });
	        	        
	        	        ractive2.on("close", function () {
	        	            $(".popup").hide().html("");
	        	        });
	        	    });      	
	          }
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

	return {
		init: renderLayout,
		loadProperties:loadProperties,
		root:root,
		getPV:getPV
 }

}();

$(document).ready(manager.init);