let cart = JSON.parse(localStorage.getItem('cart')) || {};
$(document).ready(function(){

    updateSizeCart(cart);
    
    $.getJSON("../data/games.json", function(data){
        $.each(data, function(key, value){
            var game = `<article class="game" data-id="${value.id}">` +
                       `<a href="pages/product.html?id=${value.id}">` +
                       '<img src="' + value.image + '" alt="' + value.title + '">' +
                       '<h2>' + value.title + '</h2>' +
                       '</a>' +
                       '<p class="price-tag">$' + value.price.toFixed(2) + '</p>' +
                       '<button class="add-to-cart"> <i class="fas fa-plus"></i>  Añadir al carrito</button>' +
                       '</article>';

            $(".games").append(game);
        });
    });

    $(".game").click(function(event) {
        event.preventDefault();  // Prevents following the link
        let gameId = $(this).data("id");  // Gets the id of the game
        
        $.ajax({
            url: "../data/games.json",
            type: "GET",
            dataType: "json",
            success: function(data) {
                let game = data.find(game => game.id == gameId);
                if (game) {
                    window.location.href = "/pages/product.html?id=" + game.id;  // Redirects to the product page with the id as a parameter
                }
            }
        });
    });

    $('body').on('click', '.add-to-cart', function(){
        console.log('click cart');
        var gameId = $(this).parent().data('id');
    
        // Si el juego ya está en el carrito, incrementamos su cantidad
        if (gameId in cart) {
            cart[gameId]++;
        } else {
            // Si no está en el carrito, lo agregamos con una cantidad de 1
            cart[gameId] = 1;
        }
    
        $('#cart-icon').addClass('shake');
        $('#cart-count').addClass('pulse');
    
        // Después de 500ms, quitar la clase 'shake' y 'pulse'
        setTimeout(function() {
            $('#cart-icon').removeClass('shake');
            $('#cart-count').removeClass('pulse');
        }, 500);

        // Actualizamos el contador de juegos en el carrito
        updateSizeCart(cart);
    
        // Puedes almacenar el estado del carrito en localStorage para que persista
        // incluso si el usuario cierra la página
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    // $('body').on('click', '.add-to-cart', function() {
    //     // Agregar los productos al carrito como antes...
    
    //     // Agregar la clase 'shake' al ícono del carrito y 'pulse' al badge
        
    // });
    
});

function updateSizeCart(cart) {
    var totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    $('#cart-count').text(totalItems);
}