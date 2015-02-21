$.ajax({
	type:'GET',
	url:'/ADM_Parceiros/Parceiros/0/20',
	contentType:'application/json; charset=utf-8',
	dataType:'json',
	async: true
}).done(function(response){
	console.log(response);
});