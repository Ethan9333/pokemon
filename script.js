const container = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search-input');
let allPokemon = [];

async function fetchPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();

    
    allPokemon = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return await res.json();
      })
    );

    renderCards(allPokemon);
  } catch (error) {
    container.innerHTML = '<p>Error loading Pokémon data.</p>';
  }
}

function renderCards(pokemonList) {
  container.innerHTML = pokemonList
    .map(
      (p) => `
    <div class="card">
      <img src="${p.sprites.front_default}" alt="${p.name}" />
      <h3>#${p.id} ${p.name}</h3>
    </div>
  `
    )
    .join('');
}


searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = allPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm)
  );
  renderCards(filtered);
});

fetchPokemon();