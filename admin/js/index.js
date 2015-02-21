$.ajax({
	type:'GET',
	url:'/ADM/EstouLogado',
	contentType:'application/json; charset=utf-8',
	dataType:'json'
}).done(function(response){
	if(response == true){
		window.location = "/admin/parceiros.html";
	}
});

$('#enviaLogin').click(function(e){
	e.preventDefault();

	var json = new Object();

	json.Email = $('#login').val();
	json.Senha = $('#senha').val();

	$.ajax({
		type:'POST',
		url:'/ADM/Login',
		contentType:'application/json; charset=utf-8',
		dataType:'json',
		data: JSON.stringify(json),
		success:function(response){
			if(response == true){
				window.location = "/admin/parceiros.html";
			} else {
				alert('Algo deu errado, confira o e-mail e a senha e tente novamente.');
			}
		}
	});

});