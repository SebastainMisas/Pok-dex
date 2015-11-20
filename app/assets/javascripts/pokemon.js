
//class 
PokemonApp.Pokemon = function (pokemonUri) {
	//def initalize
	this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};

// def idFormUri: helps with the id formating.  
PokemonApp.Pokemon.idFromUri = function (PokemonUri) {
	var uriSegments = PokemonUri.split("/");
	var secondLast = uriSegments.length - 2;
	return uriSegments[secondLast];
};

//def render
PokemonApp.Pokemon.prototype.render = function () {
	$.ajax({
		url: "/api/pokemon/" + this.id,
		success: function (response) {
			console.log(response)
		//stats
			$(".js-pokemon-modal").modal("show");
			$(".js-pkmn-name").text(response.name);
			$(".js-pkmn-number").text("# " + response.pkdx_id);
			$(".js-pkmn-height").text(response.height + ",");
			$(".js-pkmn-weight").text(response.weight);
			$(".js-pkmn-hp").text(response.hp);
			$(".js-pkmn-attack").text(response.attack);
			$(".js-pkmn-defense").text(response.defense);
			$(".js-pkmn-special-a").text(response.sp_atk);
			$(".js-pkmn-special-d").text(response.sp_def);
			$(".js-pkmn-speed").text(response.speed);

		// types
			$(".js-pkmn-types").empty();
			$(".js-pkmn-types").text(response.types.forEach(function (type) {
				$(".js-pkmn-types").append(type.name + ", ");
			}));
			
		//descripton
			var latest_description = response.descriptions[0];

			response.descriptions.forEach(function (descripton) {
				if (descripton.name > latest_description.name) {
					latest_description = descripton;
				}
			});

			$.ajax({
				
				url: latest_description.resource_uri,
				success: function (result) {
					$(".js-pkmn-description").text(result.description)
				},
			});
			 
		//image
			$.ajax({
				url: response.sprites[0].resource_uri,
				success: function (sprites) {
					$(".js-sprites-img").attr("src", "http://pokeapi.co" + sprites.image);
				},
			});

		//evolutions

			response.evolutions.forEach(function (evolution) {
				console.log(evolution);
					$.ajax({
						url: "http://pokeapi.co" + evolution.resource_uri,
						success: function (response) {
							$(".js-evo-name").text(response.name)
							$.ajax({
								url: response.sprites[0].resource_uri,
								success: function (sprites) {
									$(".js-evo-img").attr("src", "http://pokeapi.co" + sprites.image);
								},
							});
						},
				});
			});
		// end of successful request
		},


		error: function() {
			alert("error");
		},
	});
};


$(document).on("ready", function (){
	$(".js-show-pokemon").on("click", function (event){
		var $button = $(event.currentTarget);
		var pokemonUri = $button.data("pokemon-uri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
	$(".js-show-evolutions").on("click", function (event) {
		var $button = $(event.currentTarget);

	})
});