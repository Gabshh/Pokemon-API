"use strict";

const carregarPokemon = async () => {
	const url = `https://pokeapi.co/api/v2/pokemon/`;
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

const pesquisarTipos = async () => {
	const url = "https://pokeapi.co/api/v2/type/";
	const response = await fetch(url);
	const data = await response.json();
	
	return Object.keys(data.results);
	
};

const carregarTipos = async () => {
	const lista = document.getElementById("pesquisa-tipo");
	const tipos = await pesquisarTipos();

	lista.innerHTML = `
                        <option>
                            ${tipos.join("</option><option>")}
                        </option>
                      `;
};

const pesquisarPokemon = async (nome) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${nome}/`;
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

const pesquisarSpritePokemon = async (idPokemon) => {
	const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

const criarImg = (imagem) => {
	const img = document.createElement("img");
	img.src = imagem;
	return img;
};

const carregarImagens = async () => {
	const spritesContainer = document.getElementById("sprites-container");
	const pesquisaId = document.getElementById("pesquisa-id").value;

	const imagens = await pesquisarSpritePokemon(pesquisaId);

	const tagImagens = imagens.map(criarImg);

	spritesContainer.replaceChildren(...tagImagens);
};

////////////////////////// CRIAÇÃO DOS CARDS ///////////////////////////////////

const criarCard = (pokemon) => {
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${sprite}" alt="Sprite" class="card-image">
        </div>
        <span class="card-nome">
            ${nome}
        </span>
    `;
    return card;
}

const carregarCardsPokemons = (pokemons) => {
    const container = document.querySelector('.card-container');
    
	const cards = pokemons.map(criarCard);

    container.replaceChildren(...cards);

}

carregarCardsPokemons(pesquisarPokemon());

document.getElementById("pesquisar").addEventListener("click", carregarImagens());
document.getElementById("pesquisa-tipo").addEventListener("click", carregarTipos());
