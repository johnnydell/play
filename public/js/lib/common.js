var common = function(){
	
	//取得所有的投诉类型
	function getComplainType(){		
		var ret;
		$.ajax({
			url: manager.root + "/complain/getComplainType",
			type: "GET",
			async:false,
			dataType:"json",
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	}
	
	//取得所有有效的lines
	function getAllLines(){
		var ret;
		$.ajax({
			url: manager.root + "/line/getActiveList",
			type: "GET",
			async:false,
			dataType:"json",
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});
		return ret;
	}
	
	return {
		getComplainType:getComplainType,
		getAllLines:getAllLines
	}
}();
$(document).ready(common.init);