var uri = $.url().param('id');

if(uri != null){
	
	$.ajax({
		type:'GET',
		url:'/ADM_Parceiros/Parceiro/'+uri,
		contentType:'application/json; charset=utf-8',
		dataType:'json'
	}).done(function(r){
		
		$('#input-imagem').append('<img src="../images/parceiros/'+r.Id+'.jpg?w=180&h=80&c=3">');
		$('#nome').val(r.Titulo);
		$('#link').val(r.Link);
		$('#id').val(r.Id);

	});

	$("#imagem").uploadify({
		'uploader'		: 'js/uploadify/uploadify.swf',
		'script'		: '/parceiros.upload',
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
				$('#input-imagem').html('<img src="../images/parceiros/'+response+'.jpg" width="100">');
				console.log(event, queueID, fileObj, response, data);
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
			$('#imagem').uploadifySettings('scriptData', { 'modulo': 'parceiros'});
		}
	});

	$('#enviaForm').click(function(e){

			e.preventDefault();

			var json = new Object();

			json.Token = $('#id').val();
			json.Titulo = $('#nome').val();
			json.Link = $('#link').val();
			json.Id = $('#id').val();
			json.Status = 'true';

			console.log(json);

			$.ajax({
				type:'PUT',
				url:'/ADM_Parceiros/Parceiro',
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
		'script'		: '/parceiros.upload',
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
				$('#input-imagem').html('<img src="../images/parceiros/'+response+'.jpg" width="100">');
				console.log(event, queueID, fileObj, response, data);
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
			$('#imagem').uploadifySettings('scriptData', { 'modulo': 'parceiros'});
		}
	});

	$('#enviaForm').click(function(e){

		e.preventDefault();

		var json = new Object();

		json.Token = $('#token').val();
		json.Titulo = $('#nome').val();
		json.Link = $('#link').val();

		console.log(json);

		$.ajax({
			type:'POST',
			url:'/ADM_Parceiros/Parceiro',
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