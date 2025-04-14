const jogadorAtual = document.querySelector(".jogador-atual");

let botaoSelecionado;
let jogador = "X";

let posicoesGanhar = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function iniciarJogo() {
  botaoSelecionado = [];

  jogadorAtual.innerHTML = `É A VEZ DE: ${jogador}`;

  document.querySelectorAll(".botoes-jogo button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", novaJogada);
  });
}

iniciarJogo();

function novaJogada(event) {
  const index = event.target.getAttribute("data-i");
  event.target.innerHTML = jogador;
  event.target.removeEventListener("click", novaJogada);
  botaoSelecionado[index] = jogador;

  setTimeout(() => {
    conferindoEmpate();
  }, [100]);

  jogador = jogador === "X" ? "O" : "X";
  jogadorAtual.innerHTML = `É A VEZ DE: ${jogador}`;
}

function conferindoEmpate() {
  let ultimaJogada = jogador === "X" ? "O" : "X";

  const XO = botaoSelecionado
    .map((itemXO, i) => [itemXO, i])
    .filter((itemXO) => itemXO[0] === ultimaJogada)
    .map((itemXO) => itemXO[1]);

  for (posicao of posicoesGanhar) {
    if (posicao.every((itemXO) => XO.includes(itemXO))) {
      alert("O JOGADOR '" + ultimaJogada + "' GANHOU!");
      iniciarJogo();
      return;
    }
  }

  if (botaoSelecionado.filter((itemXO) => itemXO).length === 9) {
    alert("DEU EMPATE!");
    iniciarJogo();
    return;
  }
}