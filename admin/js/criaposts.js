var uri = $.url().param('id');

if(uri != null){
	
	$.ajax({
		type:'GET',
		url:'/ADM_Blog/Texto/'+uri,
		contentType:'application/json; charset=utf-8',
		dataType:'json'
	}).done(function(r){

		var data = r.DataHora.split(' ')[0];
		
		$('#input-imagem').append('<img src="../images/blog/'+r.Id+'.jpg?w=180&h=80&c=3">');
		$('#token').val(r.Id);
		$('#titulo').val(r.Titulo);
		$('#texto').val(r.Conteudo);
		$('#data').val(data);
		$('#id').val(r.Id);

	});

	$("#imagem").uploadify({
		'uploader'		: 'js/uploadify/uploadify.swf',
		'script'		: '/blog.upload',
		'cancelImg'		: 'js/uploadify/cancel.png',
		'width'			: '120',
		'height'		: '30',
		'wmode'			: 'transparent',
		'fileDataName'	: 'imagem',
		'fileExt'		: '*.jpg',
		'fileDesc'		: 'Imagens',
		'auto'			: true,
		'multi'			: false,
		'removeComplete': false,
		'buttonText'	: 'Arquivo',
		'onComplete'	: function (event, queueID, fileObj, response, data) {
			if (response != "") {
				$('#token').val(response);
				$('#input-imagem').html('<img src="../images/blog/'+response+'.jpg" width="100">');
				return true;
			}
		},
		'onError': function (event, queueID, fileObj, errorObj) {
			if (errorObj != "") {
				alert('Erro: '+errorObj.info);
				if (errorObj.info == 552) {
					alert('Você precisa entrar com sua conta de fã para enviar uma foto.');
				} else if (errorObj.info == 553) {
					alert('Envie apenas arquivos .jpg');
				}
				$('#imagem').uploadifyClearQueue();
				return true;
			}
		},
		'onSelect': function (event, queueID, fileObj) {
			$('#imagem').uploadifySettings('scriptData', { 'modulo': 'blog'});
		}
	});

	$('#data').mask('99/99/9999');

	$('#enviaForm').click(function(e){

		e.preventDefault();

		var json = new Object();

		json.Token = $('#id').val();
		json.Titulo = $('#titulo').val();
		json.DataHora = $('#data').val()+' 23:59';
		json.Conteudo = $('#texto').val();
		json.Id = $('#id').val();
		json.Status = 'true';

		$.ajax({
			type:'PUT',
			url:'/ADM_Blog/Texto',
			contentType:'application/json; charset=utf-8',
			dataType:'json',
			data:JSON.stringify(json),
			success: function(response){
				if(response == true){
					alert('Registro incluído com sucesso.');
					location.reload();
				} else {
					alert('Algo deu errado. Preencha todos os campos e tente novamente.');
				}
			}
		});

	});

} else {

	$("#imagem").uploadify({
		'uploader'		: 'js/uploadify/uploadify.swf',
		'script'		: '/blog.upload',
		'cancelImg'		: 'js/uploadify/cancel.png',
		'width'			: '120',
		'height'		: '30',
		'wmode'			: 'transparent',
		'fileDataName'	: 'imagem',
		'fileExt'		: '*.jpg',
		'fileDesc'		: 'Imagens',
		'auto'			: true,
		'multi'			: false,
		'removeComplete': false,
		'buttonText'	: 'Arquivo',
		'onComplete'	: function (event, queueID, fileObj, response, data) {
			if (response != "") {
				$('#token').val(response);
				$('#input-imagem').html('<img src="../images/blog/'+response+'.jpg" width="100">');
				return true;
			}
		},
		'onError': function (event, queueID, fileObj, errorObj) {
			if (errorObj != "") {
				alert('Erro: '+errorObj.info);
				if (errorObj.info == 552) {
					alert('Você precisa entrar com sua conta de fã para enviar uma foto.');
				} else if (errorObj.info == 553) {
					alert('Envie apenas arquivos .jpg');
				}
				$('#imagem').uploadifyClearQueue();
				return true;
			}
		},
		'onSelect': function (event, queueID, fileObj) {
			$('#imagem').uploadifySettings('scriptData', { 'modulo': 'blog'});
		}
	});

	$('#data').mask('99/99/9999');

	$('#enviaForm').click(function(e){

		e.preventDefault();

		var json = new Object();

		json.Token = $('#token').val();
		json.Titulo = $('#titulo').val();
		json.DataHora = $('#data').val()+' 23:59';
		json.Conteudo = $('#texto').val();

		$.ajax({
			type:'POST',
			url:'/ADM_Blog/Texto',
			contentType:'application/json; charset=utf-8',
			dataType:'json',
			data:JSON.stringify(json),
			success: function(response){
				if(response == true){
					alert('Registro incluído com sucesso.');
					location.reload();
				} else {
					alert('Algo deu errado. Preencha todos os campos e tente novamente.');
				}
			}
		});

	});

}