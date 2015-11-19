// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = function (pokemonUri) {
	// 							// api/v1/19
	this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};


PokemonApp.Pokemon.prototype.render = function () {
	console.log("Rendering pokemon: #" + this.id);
	$.ajax({
		url: "/api/pokemon/" + this.id,
		success: function (responce) {
			$(".js-pkmn-name").text(responce.name);
			$(".js-pkmn-number").text("# " + responce.pkdx_id);
			$(".js-pkmn-height").text(responce.height);
			$(".js-pkmn-weight").text(responce.weight);
			$(".js-pokemon-modal").modal("show");
		},
		error: function() {
			alert("You fucked up!");
		},
	});
};

PokemonApp.Pokemon.idFromUri = function (PokemonUri) {
	var uriSegments = PokemonUri.split("/");
	var secondLast = uriSegments.length - 2;
	return uriSegments[secondLast];
};


$(document).on("ready", function (){
	$(".js-show-pokemon").on("click", function (event){
		var $button = $(event.currentTarget);
		var pokemonUri = $button.data("pokemon-uri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
});