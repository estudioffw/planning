var slug = $('body').attr('data-id');


$.ajax({
	type:'GET',
	url:'/svcBlog/Texto/'+slug,
	contentType:'application/json; charset=utf-8',
	dataType:'json'
}).done(function(artigo){

	conteudo='';

	conteudo+='<header><h2>'+artigo.Titulo+'</h2><p>Publicado em: '+artigo.DataHora.split(' ')[0]+'</p></header>';
	conteudo+='<figure><img src="images/blog/'+artigo.Id+'.jpg?w=680&h=300&c=2" alt="'+artigo.Titulo+'"><figcaption>'+artigo.Titulo+'</figcaption></figure>';
	conteudo+='<p>'+artigo.Conteudo+'</p>';

	$('#conteudo').html(conteudo);

});