console.log("Memory game!");
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};
const pokedex = document.getElementById("pokedex");
//fetching pokemon's name, image, type and id from pokeapi
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        let pokemonSimple;
        // récupère tous les pokemons et en choisi aléatoirement 8
        function getRandomItem(set) {
            let items = Array.from(set);
            let arrayPokemonRandom = [];
            for (let index = 0; index < 8; index++) {
                let itemRandom;
                itemRandom = items[Math.floor(Math.random() * items.length)];
                arrayPokemonRandom.push(itemRandom);
            }
            return arrayPokemonRandom;
        }
        pokemonSimple = getRandomItem(results);

        // double le tableau
        let pokemonsDouble = [...pokemonSimple, ...pokemonSimple];
        console.log("pokemonsDouble:", pokemonsDouble);

        displayPokemon(pokemonsDouble);
    });
};
// Affichage
const displayPokemon = (pokemon) => {
    pokemon.sort((_) => Math.random() - 0.5);
    const pokemonHTML = pokemon
        .map((pokemon) => {
            const type = pokemon.types[0]?.type?.name;
            const color = colors[type] || "#F5F5F5";
            return `
          <article class="card" onclick="clickCard(event)" data-pokename="${pokemon.name}" style="background-color:${color};">
            <div class="front ">
            </div>
            <div class="back" style="background-color:${color};">
            <img class="card-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}"  />
            <h2 class="card-title"> ${pokemon.name}</h2>
            </div>
        </article>
    `;
        })
        .join("");
    pokedex.innerHTML = pokemonHTML;
};

fetchPokemon();
