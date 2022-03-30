"use strict";

alert("ta safe :)");

const pesquisarTipos = async () => {
	const url = "https://pokeapi.co/api/v2/type/";
	const response = await fetch(url);
	const data = await response.json();
	const tipo = Object.keys(data.results);
	return tipo;
};

const pesquisarPokemon = async (pokemon) => {
	const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`;
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

document.getElementById("pesquisar").addEventListener("click", carregarImagens());
document.getElementById("pesquisa-tipo").addEventListener("click", carregarTipos());
