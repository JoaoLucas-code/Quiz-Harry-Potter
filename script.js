document.getElementById('quizForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let resultado = {
      harry: 0,
      voldemort: 0,
      dobby: 0,
      cedrico: 0
  };

  const respostas = Array.from(document.querySelectorAll('input[type="radio"]:checked'));

  respostas.forEach(resposta => {
      resultado[resposta.value]++;
  });

  const totalRespostas = respostas.length;
  const porcentagens = {
      harry: (resultado.harry / totalRespostas) * 100,
      voldemort: (resultado.voldemort / totalRespostas) * 100,
      dobby: (resultado.dobby / totalRespostas) * 100,
      cedrico: (resultado.cedrico / totalRespostas) * 100
  };

  localStorage.setItem('porcentagens', JSON.stringify(porcentagens));

  function verificaEmpate(porcentagens) {
      const sortedPorcentagens = Object.entries(porcentagens).sort((a, b) => b[1] - a[1]);
      const maxPercentage = sortedPorcentagens[0][1];
      const empate = sortedPorcentagens.filter(([_, value]) => value === maxPercentage);

      return empate.map(([personagem, _]) => personagem);
  }

  const empate = verificaEmpate(porcentagens);

  const loadingMessage = document.getElementById('loadingMessage');
  loadingMessage.style.display = 'block';

  let segundosRestantes = 5;

  const intervalo = setInterval(() => {
      loadingMessage.textContent = `Aguarde ${segundosRestantes} segundos enquanto o resultado carrega...`;
      segundosRestantes--;

      if (segundosRestantes < 0) {
          clearInterval(intervalo);

          if (empate.length === 2) {
              window.location.href = "empate.html?empate=2";
          } else if (empate.length === 3) {
              window.location.href = "empate.html?empate=3";
          } else {
              window.location.href = `${resultadoMaior(porcentagens)}.html`;
          }
      }
  }, 1000);
});

function resultadoMaior(porcentagens) {
  let maiorPersonagem = 'harry';
  let maiorPorcentagem = porcentagens.harry;

  if (porcentagens.voldemort > maiorPorcentagem) {
      maiorPersonagem = 'voldemort';
      maiorPorcentagem = porcentagens.voldemort;
  }
  if (porcentagens.dobby > maiorPorcentagem) {
      maiorPersonagem = 'dobby';
      maiorPorcentagem = porcentagens.dobby;
  }
  if (porcentagens.cedrico > maiorPorcentagem) {
      maiorPersonagem = 'cedrico';
  }

  return maiorPersonagem;
}
