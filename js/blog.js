var total;
var paginas;
var atual = 0;

$.ajax({
	type:'GET',
	url:'/svcBlog/Textos',
	contentType:'application/json; charset=utf-8',
	dataType:'json'
}).done(function(r){

	total = r;

	if((total/10)>parseInt(total/10)){
		paginas = parseInt(total/10)+1;
	} else {
		paginas = parseInt(total/10);
	}

	var paginacao = '';
	for(i=1;i<=paginas;i++){
		paginacao+='<li><a href="javascript:;" data-pag="'+i+'">'+i+'</a></li>';
	}
	$('#navigation').html(paginacao);

	$('#navigation li:first a').addClass('atual');

	$('#navigation li a').click(function(){
		$('#navigation li a').removeClass('atual');
		$(this).addClass('atual');
		atual = $(this).attr('data-pag')-1;
		console.log(atual);
		montablog();
	});

});

// BLOG

function montablog(){
	$.ajax({
		type:'GET',
		url:'/svcBlog/Textos/'+atual+'/10',
		contentType:'application/json; charset=utf-8',
		dataType:'json'
	}).done(function(response){

		var posts='';


		$.each(response, function(b, blog){

			var texto = blog.Conteudo.substring(0,400)+'...';

			posts+='<li>';
			posts+='	<div class="post-img">';
			posts+='		<img src="images/blog/'+blog.Id+'.jpg?w=480&h=200&c=2" alt="'+blog.Titulo+'">';
			posts+='	</div>';
			posts+='	<div class="post-content">';
			posts+='		<h3>'+blog.Titulo+'</h3>';
			posts+='		<p>'+texto+'</p>';
			posts+='		<a href="blog/'+blog.Slug+'">Continuar lendo »</a>';
			posts+='	</div>';
			posts+='	<br class="clear">';
			posts+='</li>';

		});

		$('#posts').html(posts);

	});
}

montablog();

