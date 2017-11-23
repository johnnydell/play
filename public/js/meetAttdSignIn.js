var meetAttdSignIn = function(){
	function init(){
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {},
			onrender: function(){
				manager.loadProperties(this, "meetAttdSignIn", "../../");
			},
			oncomplete: function(){
			}
		});
		
		ractive.on({
			toSignIn:function(){
				location.href = "meetAttdSignIn.html";
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(meetAttdSignIn.init);