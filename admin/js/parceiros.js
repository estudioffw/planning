$.ajax({
	type:'GET',
	url:'/svcParceiros/Parceiros/0/20',
	contentType:'application/json; charset=utf-8',
	dataType:'json',
	async: true
}).done(function(response){

	var parceiros = '';
	
	$.each(response, function(p, parceiro){

		parceiros+='<li>';
		parceiros+='	<div class="box-image"><img src="../images/parceiros/'+parceiro.Id+'.jpg?w=180&h=80&c=3" alt="'+parceiro.Titulo+'" width="180"></div>';
		parceiros+='	<div class="box-info">';
		parceiros+='		<h2>'+parceiro.Titulo+'</h2>';
		parceiros+='		<a href="'+parceiro.Link+'" target="_blank">'+parceiro.Link+'</a>';
		parceiros+='	</div>';
		parceiros+='	<div class="box-actions">';
		// parceiros+='		<a href="adicionar-parceiro.html?id='+parceiro.Id+'" class="btn-editar" data-id="'+parceiro.Id+'"><i class="fa fa-pencil"></i></a>';
		parceiros+='		<a href="#" class="btn-excluir" data-id="'+parceiro.Id+'"><i class="fa fa-close"></i></a>';
		parceiros+='	</div>';
		parceiros+='</li>';

	});

	$('#lista-info').html(parceiros);

	$('.btn-excluir').click(function(e){
		e.preventDefault();

		console.log(id);

		var id = $(this).attr('data-id');

		$.ajax({
			type:'DELETE',
			url:'/ADM_Parceiros/Parceiro/'+id,
			contentType:'application/json; charset=utf-8',
			dataType:'json'
		}).done(function(response){
			if(response == true){
				alert('Parceiro excluido com sucesso');
				location.reload();
			} else {
				alert('Algo deu errado. Tente novamente!');
			}
		});
	});

});