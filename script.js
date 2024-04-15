// Obtener el elemento contenedor de los Pokémon del documento HTML
const contenedorPokemon = document.getElementById('Contenedor-pokemons');

// Número total de Pokémon que queremos obtener
const cantidadPokemon = 300;

// Colores para los diferentes tipos de Pokémon
const colores = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

// Tipos principales de Pokémon
const tiposPrincipales = Object.keys(colores);

// Obtener todos los Pokémon
async function obtenerPokemones() {
    try {
        for (let id = 1; id <= cantidadPokemon; id++) {
            await obtenerPokemon(id);
        }
    } catch(error) {
        console.error('Ocurrió un error al obtener los Pokémon:', error);
    }
}

// Obtener datos de un Pokémon específico
async function obtenerPokemon(id) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener el Pokémon');
        }
        const datosPokemon = await respuesta.json();

        // Obtener la descripción del Pokémon
        const descripcion = await obtenerDescripcionPokemon(id);

        // Crear la carta de Pokémon con la descripción
        crearCartaPokemon(datosPokemon, descripcion);
    } catch(error) {
        console.error(`Ocurrió un error al obtener el Pokémon con ID ${id}:`, error);
    }
}

// Función para obtener la descripción del Pokémon
async function obtenerDescripcionPokemon(id) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la especie del Pokémon');
        }
        const datosEspecie = await respuesta.json();

        // Encontrar la descripción en español
        const descripcion = datosEspecie.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;
        return descripcion;
    } catch(error) {
        console.error(`Ocurrió un error al obtener la descripción del Pokémon con ID ${id}:`, error);
    }
}

// Crear una carta de Pokémon y mostrarla en la página
function crearCartaPokemon(pokemon) {
    const cartaPokemon = document.createElement('div');
    cartaPokemon.classList.add('pokemon');
    
    const nombre = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const tipo = pokemon.types[0].type.name;
    const color = colores[tipo];

    cartaPokemon.style.backgroundColor = color;

    const contenidoHTML = `
        <div class="contenedor-imagen">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${nombre}">
        </div>
        <div class="informacion">
            <span class="numero">#${id}</span>
            <h3 class="nombre">${nombre}</h3>
            <small class="tipo">Tipo: <span>${tipo}</span></small>
        </div>
    `;

    cartaPokemon.innerHTML = contenidoHTML;

    contenedorPokemon.appendChild(cartaPokemon);
}

// Obtener todos los Pokémon al cargar la página
obtenerPokemones();