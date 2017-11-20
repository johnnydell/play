var manager = function() {
    
    
    var cookieDomain = "";
    
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
	   $.get("tpl/common/left.html", function (template) {
	        var ractive = new Ractive({
	            el: '.left',
	            template: template
	        });   
	        
	        ractive.on({
	          toDashboard:function(){
	              location.href = "index.html";
	          },
	          toSettings:function(){
	              location.href = "settings.html";
	          },
	          toOthers:function(){
	              location.href = "others.html";
	          }
	        })
	        
	    });
	    
	   //渲染right-header部分
	   $.get("tpl/common/right-header.html", function (template) {
	        var ractive = new Ractive({
	            el: '.right header',
	            template: template
	        }); 
	        
	        ractive.on({
	           toggleLeft:function(){
	             $(".left").toggle(1000);
	           }
	        })
	    });
	    
	   //渲染right-footer部分
	   $.get("tpl/common/right-footer.html", function (template) {
	        var ractive = new Ractive({
	            el: '.right footer',
	            template: template
	        });   
	    });
	    
	   //渲染container-title部分
	  // $.get("tpl/common/container-title.html", function (template) {
	   	 	//var path = location.pathname;
//	        var dirArr = path.split('/');
//	        var dir = dirArr[dirArr.length-1].split('.')[0];
//	        var sec_nav_title = '工厂信息展示屏';
//	        switch(dir){
//				case 'moe2':
//				  sec_nav_title = 'MOE2 晨会区';
//				  break;
//				case 'fag2':
//				  sec_nav_title = 'FAG2 SMC展示';
//				  break;
//				case 'moe2-kpi':
//				  sec_nav_title = 'FAG2 SMC展示';
//				  break;
//				case 'moe2-scl':
//				  sec_nav_title = 'MOE2 生产力展示';
//				  break;
//				case 'moe2-scl2':
//				  sec_nav_title = 'FAG2 生产力展示';
//				  break;
//			}
	      //  var ractive = new Ractive({
	    //        el: '.container .title',
	   //         template: template
	    //    });   
	   // });	    
	}

    function test2(){
       console.log("test2");
    }

	return {
		init: function() {
			//初始化公共部分逻辑或者模板
			renderLayout();
		},
		loadProperties:loadProperties,
		test:function(){
		  console.log("test");
		},
		test2:test2
 
 }

}();

$(document).ready(manager.init);