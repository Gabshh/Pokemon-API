"use strict";

alert("ta safe :)");

const pesquisarTipos = async () => {
	const url = "https://pokeapi.co/api/v2/type/";
	const response = await fetch(url);
	const data = await response.json();
	const tipo = Object.keys(data.results);
	return tipo;
};

const pesquisarPokemon = async (nome) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${nome}/`;
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
	const idPokemon = document.getElementById("id-pokemon").value;

	const imagens = await pesquisarPokemon(idPokemon);

	const tagImagens = imagens.message.map(criarImg);

	spritesContainer.replaceChildren(...tagImagens);
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

// CRIANDO CARDS

const criarCard = (pokemon) => {
    
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${pokemon.sprite}" alt="Sprite" class="card-image">
        </div>
        <span class="card-descricao">
            ${pokemon.nome}
        </span>
    `
    return card
}

const carregarCardsPokemons = (pokemons) => {
    const container = document.querySelector('.card-container')
    
	const cards = pokemons.map(criarCard)

    container.replaceChildren(...cards)

}

carregarCardsPokemons(pesquisarPokemon(bulbasaur))

document.getElementById("pesquisar").addEventListener("click", carregarImagens())
document.getElementById("pesquisa-tipo").addEventListener("click", carregarTipos())
