var object;
var id = 1;

$('#banner li').hide();
$('#banner1').fadeIn();

function atualizaBanner(){

	object = eval('banner'+id);

	$('#banner li').fadeOut(1000);
	$(object).fadeIn(1000);
}

function atualizaIcone(){
	$('#lista-areas li').removeClass('current');
	$('#lista-areas li').eq(id-1).addClass('current');
}

setInterval(function(){
	if(id <= 3){
		id = id+1;
	} else {
		id = 1;
	}
	atualizaBanner();
	atualizaIcone();
}, 7000);


$('#lista-areas li a').click(function(e){
	e.preventDefault();
	return false;
});


// PARCEIROS
$.ajax({
	type:'GET',
	url:'/svcParceiros/Parceiros/0/4',
	contentType:'application/json; charset=utf-8',
	dataType:'json'
}).done(function(response){
	
	var parceiros = '';
	var count = '';

	$.each(response, function(p, parceiro){
		count++;

		if(count == 4){
			parceiros+='<li class="last"><a href="'+parceiro.Link+'" title="'+parceiro.Titulo+'"><img src="images/parceiros/'+parceiro.Id+'.jpg?w=180&h=80&c=3" width="180" alt="'+parceiro.Titulo+'"></a></li>';
		} else {
			parceiros+='<li><a href="'+parceiro.Link+'" title="'+parceiro.Titulo+'"><img src="images/parceiros/'+parceiro.Id+'.jpg?w=180&h=80&c=3" width="180" alt="'+parceiro.Titulo+'"></a></li>';
		}

	});

	$('#lista-parceiros').html(parceiros);

});

// BLOG
$.ajax({
	type:'GET',
	url:'/svcBlog/Textos/0/2',
	contentType:'application/json; charset=utf-8',
	dataType:'json'
}).done(function(response){

	var posts='';


	$.each(response, function(b, blog){

		var texto = blog.Conteudo.substring(0,200)+'...';

		posts+='<li>';
		posts+='	<div class="box-image">';
		posts+='		<img src="images/blog/'+blog.Id+'.jpg?w=180&h=180&c=2" alt="'+blog.Titulo+'">';
		posts+='	</div>';
		posts+='	<div class="box-texto">';
		posts+='		<h3>'+blog.Titulo+'</h3>';
		posts+='		<p>'+texto+'</p>';
		posts+='		<a href="blog/'+blog.Slug+'">Continuar lendo »</a>';
		posts+='	</div>';
		posts+='	<br class="clear">';
		posts+='</li>';

	});

	$('#posts').html(posts);

});


