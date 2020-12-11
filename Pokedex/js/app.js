const pokedex = document.getElementById("pokedex");
console.log(pokedex);


const getPokemon = (name)	=> {

	const array = [];
	array.push()
	for(let i = 1; i <100; i++){
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		array.push(fetch(url).then((res) => res.json()));
	}
	
	Promise.all(array).then(results => {
		const pokemon = results.map((data) => ({
			name: data.name,
			id: data.id,
			image: data.sprites['front_default'],
			height: data.height,
			weight: data.weight,
			abilities:  data.abilities.map((abilities) => abilities.ability.name).join("/")
		}));
		setPokemon(name,pokemon)
	})
}

const setPokemon = (names,pokemon) => {

	const pokeman = pokemon.find(element => element.name.includes(names));
	localStorage.setItem('Pokemon: '+pokeman.id,pokeman.name+ " - Height: " + pokeman.height+ " - Weight: " + pokeman.weight + " - Abilities: " + pokeman.abilities);

	const pokemonHTMLString = `
	<li class= "card">
		<img class = "card-image" src = "${pokeman.image}"</img>
		<h2 class = "card-title"> ${pokeman.id} - ${pokeman.name} </h2>
		<p class = "card-information"><strong> Height: </strong>${pokeman.height}</p>
		<p class = "card-information"><strong> Weight: </strong>${pokeman.weight}</p>
		<p class = "card-information"><strong> Abilities: </strong>${pokeman.abilities}</p>
	</li>

	`;
	pokedex.innerHTML = pokemonHTMLString;

}

const init = function () {
	const formSearch = document.querySelector("#formSearch");
	formSearch.addEventListener('submit', (e) => {
		e.preventDefault();
		let name = document.querySelector("#searchBox").value;

		name = name.toLowerCase();
		getPokemon(name);
	})
}

init();
