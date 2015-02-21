var latMap = -23.3114;
var longMap = -51.157587;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize(lat, lng) {

	directionsDisplay = new google.maps.DirectionsRenderer();
	
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 16,
        scrollwheel: false,
        disableDefaultUI: true,
    };
    $('#mapa').attr('lat', lat);
    $('#mapa').attr('lng', lng);

    var map = new google.maps.Map(document.getElementById("mapa"),
        mapOptions);

    var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    map: map,
        icon: 'static/img/ico-visita.png'
	});

	var styles = [
        {
            stylers: [
                { hue: "#1B4A74" },
                { saturation: -50 }
            ]
        }
    ];
    
    map.setOptions({styles: styles});
    
    directionsDisplay.setMap(map);

}

initialize(latMap, longMap);

$("#buscar").click(function(event){
	event.preventDefault();
	
	var enderecoPartida = $("#como-chegar").val();
	var enderecoChegada = '-23.3114, -51.157587';
	
	var request = {
		origin: enderecoPartida,
		destination: enderecoChegada,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
});


$('#form-contato').click(function(e){
	$('#box-proposta').hide();
	$('#box-contato').show();
	$('#form-proposta').removeClass('selected');
	$(this).addClass('selected');
});

$('#form-proposta').click(function(e){
	$('#box-contato').hide();
	$('#box-proposta').show();
	$('#form-contato').removeClass('selected');
	$(this).addClass('selected');
});

var uri = $.url().param('tipo');

if(uri == 'proposta'){
	$('#box-contato').hide();
	$('#box-proposta').show();
	$('#form-contato').removeClass('selected');
	$('#form-proposta').addClass('selected');
};

$('#telefone').mask('(99) 9999-9999');
$('#telefone-proposta').mask('(99) 9999-9999');
$('#condominio').mask('R$ 999,99');

$('#enviaContato').click(function(e){
	e.preventDefault();

	var json = new Object();

	json.Assunto = $('#assunto').val();
	json.Email = $('#email').val();
	json.Mensagem = $('#mensagem').val();
	json.Nome = $('#nome').val();
	json.Telefone = $('#telefone').val();

	$.ajax({
		type:'POST',
		url:'/svcContato/Geral',
		contentType:'application/json; charset=utf-8',
		dataType:'json',
		data:JSON.stringify(json),
		success: function(response){
			if(response == true){
				alert('Mensagem enviada com sucesso. Em breve, entraremos em contato.');
				location.reload();
			} else {
				alert('Algo deu errado. Confira os campos e tente novamente.');
			}
		}
	});

});

$('#enviaProposta').click(function(e){
	e.preventDefault();

	var json = new Object();

	json.NomeSolicitante = $('nome-solicitante').val();
	json.Cargo = $('cargo').val();
	json.Email = $('email-proposta').val();
	json.Telefone = $('telefone-proposta').val();
	json.Endereco = $('endereco').val();
	json.Bairro = $('bairro').val();
	json.NomeCondominio = $('nome-condominio').val();
	json.Unidades = $('unidades').val();
	json.Andares = $('andares').val();
	json.Elevadores = $('elevadores').val();
	json.Funcionarios = $('funcionarios').val();
	json.ValorCondominio = $('condominio').val();

	$.ajax({
		type:'POST',
		url:'/svcContato/Proposta',
		contentType:'application/json; charset=utf-8',
		dataType:'json',
		data:JSON.stringify(json),
		success: function(response){
			if(response == true){
				alert('Proposta enviada com sucesso. Em breve, entraremos em contato.');
				location.reload();
			} else {
				alert('Algo deu errado. Confira os campos e tente novamente.');
			}
		}
	});

});