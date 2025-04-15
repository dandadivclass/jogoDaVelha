const jogadorAtual = document.querySelector(".jogador-atual");
const anuncioTexto = document.querySelector('.anuncio');
const iniciarNovoJogo = document.querySelector('.reiniciar');

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
  
    const indicesUltimaJogada = botaoSelecionado
      .map((itemXO, i) => [itemXO, i])
      .filter((itemXO) => itemXO[0] === ultimaJogada)
      .map((itemXO) => itemXO[1]);
  
    for (const posicao of posicoesGanhar) {
      if (posicao.every((indice) => indicesUltimaJogada.includes(indice))) {
        anuncioTexto.innerHTML = `O JOGADOR "${ultimaJogada}" GANHOU!`;

        // Desabilitando os botões para evitar mais jogadas
        document.querySelectorAll(".botoes-jogo button").forEach(item => {
          item.removeEventListener("click", novaJogada);
        });
        return;
      }
    }
  
    if (botaoSelecionado.filter((itemXO) => itemXO).length === 9) {
      anuncioTexto.innerHTML = "DEU EMPATE!";
      return;
    }
  }

iniciarNovoJogo.addEventListener('click', function() {
    iniciarJogo()
    anuncioTexto.innerHTML = ''
})