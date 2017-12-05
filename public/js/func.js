var func = function(){
	
	var funcs = [];
	var deletedFunc =[];
	
	function getFuncList(ractive){
		$.ajax({
			url: manager.root + "/func/getList",
			type: "GET",
			dataType: "json",
			beforeSend: function() {
				manager.block();
			},
			success: function(data) {
				funcs = data;
				$.each(funcs,function(i,n){
					n.checked = false;
				});
				ractive.set("funcs",funcs);
			},
			complete: function() {
				manager.unblock();
			}
		});
	}
	
	function init(){	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "func", "../../");
				getFuncList(this);
			},
			oncomplete: function(){
				
			}
		});
		
		ractive.on({
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
			addFunc:function(){				
				var func = {
						id:"0",
						moduleName:"",
						funcKey:"",
						funcName:"",
						active:'1',
						checked:false
				};
				funcs.push(func);
				ractive.update("funcs");
			},
			deleteFunc:function(){
			      var i = funcs.length-1;
			      while (i >= 0){
			        var temp = funcs[i];
			        if(temp.checked){
			            if(temp.id != '0'){
			            	deletedFunc.push(temp);
			            }
			            funcs.splice(i,1);	
			        }
				  	i--;
				  }		      
			},
			saveFunc:function(){
				$.each(funcs,function(i,n){
					if(n.moduleName == '' || n.funcKey == '' || n.funcName == ''){	
						jAlert('please fullfill your fields to commit', 'ERROR');						
						return false;
					}
				})
				
				
			},
			test:function(){
				
			}			
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(func.init);