$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var gameId = urlParams.get('id');

    if (gameId) {
        $.getJSON("../data/games.json", function(data) {
            var gameData = data.find(function(game) {
                return game.id == gameId;
            });

            if (gameData) {
                var gameDetail = `<div class="game-header">` +
                    `<img src="${gameData.image}" alt="${gameData.title}">` +
                    `<div>` +
                    `<h2>${gameData.title}</h2>` +
                    `<p class="game-platforms">Plataformas: ${gameData.console}</p>` +
                    `<p class="game-genre">Género: ${gameData.genre}</p>` +
                    `<p class="price-tag">$${gameData.price.toFixed(2)}</p>` +
                    '<button class="add-to-cart"> <i class="fas fa-plus"></i>  Añadir al carrito</button>' +
                    `<p class="game-description">${gameData.description}</p>` +
                    `</div>` +
                    `</div>` +
                    `<div class="game-content">` +
                    `</div>`;

                $(".game-detail").append(gameDetail);
            }
        });
    }
});
