
PokemonApp.Pokemon = function (pokemonUri) {
	this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};


PokemonApp.Pokemon.prototype.render = function () {
	console.log("Rendering pokemon: #" + this.id);
	$.ajax({
		url: "/api/pokemon/" + this.id,
		success: function (responce) {
			console.log(responce);
			$(".js-pkmn-name").text(responce.name);
			$(".js-pkmn-number").text("# " + responce.pkdx_id);
			$(".js-pkmn-height").text(responce.height);
			$(".js-pkmn-weight").text(responce.weight);
			$(".js-pkmn-types").empty();
			$(".js-pkmn-types").text(responce.types.forEach(function (type) {
				$(".js-pkmn-types").append(type.name + ", ");

			}));
			$(".js-pkmn-hp").text(responce.hp);
			$(".js-pkmn-attack").text(responce.attack);
			$(".js-pkmn-defense").text(responce.defense);
			$(".js-pkmn-special-a").text(responce.sp_atk);
			$(".js-pkmn-special-d").text(responce.sp_def);
			$(".js-pkmn-speed").text(responce.speed);
			
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