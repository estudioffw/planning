$.ajax({
	type:'GET',
	url:'/svcParceiros/Parceiros/0/32',
	contentType:'application/json; charset=utf-8',
	dataType:'json'
}).done(function(response){
	
	var parceiros = '';
	var count = '';

	$.each(response, function(p, parceiro){
		count++;

		if(count%4 == 0){
			parceiros+='<li class="last"><a href="'+parceiro.Link+'" title="'+parceiro.Titulo+'"><img src="images/parceiros/'+parceiro.Id+'.jpg?w=180&h=80&c=3" width="180" alt="'+parceiro.Titulo+'"></a></li>';
		} else {
			parceiros+='<li><a href="'+parceiro.Link+'" title="'+parceiro.Titulo+'"><img src="images/parceiros/'+parceiro.Id+'.jpg?w=180&h=80&c=3" width="180" alt="'+parceiro.Titulo+'"></a></li>';
		}

	});

	$('#lista-parceiros').html(parceiros);

});