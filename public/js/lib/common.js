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
	
	//取得所有产品类型
	function getAllProductType(){
		var ret;
		$.ajax({
			url: manager.root + "/productType/getAllList",
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
	
	//取得有效的角色列表
	function getRolesList(){
		var ret;
		$.ajax({
			url: manager.root + "/role/getList",
			type: "GET",
			async:false,
			dataType: "json",
			contentType: "application/json", 
			success: function(data) {
				ret = data;
			}
		});
		return ret;		
	}
	
	return {
		getComplainType:getComplainType,
		getAllLines:getAllLines,
		getAllProductType:getAllProductType,
		getRolesList:getRolesList
	}
}();
$(document).ready(common.init);