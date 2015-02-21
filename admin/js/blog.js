$.ajax({
	type:'GET',
	url:'/svcBlog/Textos/0/10',
	contentType:'application/json; charset=utf-8',
	dataType:'json',
	async: true
}).done(function(response){

	var blog = '';
	
	$.each(response, function(p, posts){

		var texto = posts.Conteudo.substring(0,200)+'...';

		blog+='<li>';
		blog+='	<div class="box-image"><img src="../images/blog/'+posts.Id+'.jpg?w=500&h=200&c=2" alt="'+posts.Titulo+'"></div>';
		blog+='	<div class="box-info">';
		blog+='		<h2>'+posts.Titulo+'</h2>';
		blog+='		<a href="'+posts.Conteudo+'" target="_blank">'+texto+'</a>';
		blog+='	</div>';
		blog+='	<div class="box-actions">';
		// blog+='		<a href="adicionar-post.html?id='+posts.Id+'" class="btn-editar" data-id="'+posts.Id+'"><i class="fa fa-pencil"></i></a>';
		blog+='		<a href="#" class="btn-excluir" data-id="'+posts.Id+'"><i class="fa fa-close"></i></a>';
		blog+='	</div>';
		blog+='</li>';


	});

	$('#lista-info').html(blog);

	$('.btn-excluir').click(function(e){
		e.preventDefault();

		console.log(id);

		var id = $(this).attr('data-id');

		$.ajax({
			type:'DELETE',
			url:'/ADM_Blog/Texto/'+id,
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