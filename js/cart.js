$(document).ready(function(){
    var cart = JSON.parse(localStorage.getItem('cart'));

    $.getJSON("../data/games.json", function(data){
        $.each(data, function(key, value){
            if (value.id in cart) {
                var game = `<article class="cart-item" data-id="${value.id}">` +
                           `<a class="cart-item-image" href="../pages/product.html?id=${value.id}"><img src="${value.image}" alt="${value.title}"></a>` +
                           `<a class="cart-item-title" href="../pages/product.html?id=${value.id}"><h2> ${value.title} </h2></a>` +
                           '<p class="cart-item-quantity">Cantidad: <span class="quantity">' + cart[value.id] + '</span></p>' +
                            '<button class="quantity-increase-btn">+</button>' +
                            '<button class="quantity-decrease-btn">-</button>' +
                           '<p class="cart-item-price">$' + (value.price * cart[value.id]).toFixed(2) + '</p>' +
                           '</article>';

                $(".cart-items-section").append(game);
            }
        });

        calculateTotal(cart, data);

        // Vacía el carrito cuando se haga clic en el botón
        $('#clear-cart-btn').click(function() {
            cart = {};
            localStorage.setItem('cart', JSON.stringify(cart));
            $('.cart-item').remove(); // Elimina los elementos del carrito del DOM
            updateSizeCart(cart);
            calculateTotal(cart, data);
        });

        // Incrementa la cantidad de un juego
        $('body').on('click', '.quantity-increase-btn', function() {
            let id = $(this).parent().data('id');
            cart[id]++;
            localStorage.setItem('cart', JSON.stringify(cart));
            $(this).siblings('p.cart-item-quantity').children('.quantity').text(cart[id]);
            $(this).siblings('p.cart-item-price').text('$' + (data[id - 1].price * cart[id]).toFixed(2));
            updateSizeCart(cart);
            calculateTotal(cart, data);
        });

        // Disminuye la cantidad de un juego
        $('body').on('click', '.quantity-decrease-btn', function() {
            let id = $(this).parent().data('id');
            cart[id]--;
            if (cart[id] <= 0) {
                delete cart[id];
                $(this).parent().remove(); // Elimina el elemento del carrito del DOM si su cantidad llega a 0
            } else {
                $(this).siblings('p.cart-item-quantity').children('.quantity').text(cart[id]);
                $(this).siblings('p.cart-item-price').text('$' + (data[id - 1].price * cart[id]).toFixed(2));
            }
            updateSizeCart(cart);
            calculateTotal(cart, data);
        });
    });

    $('#checkout-btn').click(function() {
        $('#paymentModal').modal('show');
    });    
});

function calculateTotal(cart, data) {
    let total = 0;

    $.each(data, function(key, value) {
        if (value.id in cart) {
            total += value.price * cart[value.id];
        }
    });

    $('#cart-total').text(total.toFixed(2));

    if (!total) {
        $('.cart-items-section').html('<center><h2>No tienes ningún juego en tu carrito.</h2></center>');
        $('.subitems').hide();
    }
}


  