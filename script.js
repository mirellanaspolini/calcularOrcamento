let valorTotalHoras = 0;
let valorTotal = 0;

// informações sobre agulha
let quantAgulha = 0;
const precoAgulha = 3.65;

// informações sobre a peça final
let pecaFinalAltura = 0;
let pecaFinalLargura = 0;
let areaPecaFinal = 0;

// informações sobre o fio
let ConsumoTotalFio = 0;
let fioescolhido = document.getElementById("selectLinha").value;
let valorNovelo = 0;
let numeroNovelosNecessario = 0;
let valorTotalNovelo = 0;

let quantEnchimento = 0;
let valorAdicional = 0;

// Função para calcular o valor das horas
function calculaHora() {
    valorTotalHoras = document.getElementById("quantHoras").value * 8;
    atualizarTotal();
}

// Função para calcular o valor das agulhas
function calculaQuantAgulha() {
    quantAgulha = document.getElementById("quantAgulhas").value * precoAgulha;
    atualizarTotal();
}

function calculaValorAdicional({ target }) {
    valorAdicional = target.checked
        ? valorAdicional + Number(target.dataset.preco)
        : valorAdicional - Number(target.dataset.preco);
}

// Função para atualizar o total e aplicar o lucro
function atualizarTotal() {
    let valores =
        quantAgulha +
        valorTotalHoras +
        valorTotalNovelo +
        quantEnchimento +
        valorAdicional;
    let totalComLucro = valores * 0.2 + valores;
    document.querySelector("#total").textContent =
        "Total: R$ " + totalComLucro.toFixed(2); // Formate para duas casas decimais
}

// Adicione event listeners para acompanhar as alterações nos elementos de entrada
document.getElementById("quantHoras").addEventListener("input", calculaHora);
document
    .getElementById("quantAgulhas")
    .addEventListener("input", calculaQuantAgulha);
document
    .getElementById("alturaFinal")
    .addEventListener(
        "input",
        ({ target }) => (pecaFinalAltura = target.value)
    );
document
    .getElementById("larguraFinal")
    .addEventListener(
        "input",
        ({ target }) => (pecaFinalLargura = target.value)
    );
document
    .getElementById("quantEnchimento")
    .addEventListener("input", ({ target }) => {
        quantEnchimento = target.value / 10;
        atualizarTotal();
    });

const listaCheckbox = document.querySelectorAll('input[type="checkbox"]');

for (let i = 0; i < listaCheckbox.length; i++) {
    listaCheckbox[i].addEventListener("input", calculaValorAdicional);
}

// -~-~-~-~-~-~-~-~--~-~-~-~-~--~~-~-

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

function teste() {
    // amostra
    let amostraFioLargura = 0;
    let amostraFioAltura = 0;
    let amostraPeso = 0;
    let pesoNovelo = 50;

    if (fioescolhido === "balloonAmigo") {
        amostraFioLargura = 10;
        amostraFioAltura = 5;
        amostraPeso = 4.5;
        pesoNovelo = 50;
        valorNovelo = 7.25;
    } else if (fioescolhido === "amigurumiPelucia") {
        amostraFioLargura = 10;
        amostraFioAltura = 5;
        amostraPeso = 4;
        pesoNovelo = 85;
        valorNovelo = 10.4;
    }

    let areaAmostra = amostraFioAltura * amostraFioLargura;

    areaPecaFinal = pecaFinalAltura * pecaFinalLargura;
    ConsumoTotalFio = Math.ceil((amostraPeso / areaAmostra) * areaPecaFinal);
    numeroNovelosNecessario = ConsumoTotalFio / pesoNovelo;
    valorTotalNovelo = numeroNovelosNecessario * valorNovelo;
    atualizarTotal();

    console.log("area da amostra do fio:", areaAmostra, "cm²");
    console.log("area da peça final:", areaPecaFinal, "cm²");
    console.log("consumo total:", ConsumoTotalFio);
    console.log("novelo no total:", numeroNovelosNecessario);
    console.log("valor novelo: ", valorTotalNovelo);
    console.log("enchimento", quantEnchimento);

    document.getElementById("resultado").textContent =
        "Você irá precisar de " +
        Math.ceil(numeroNovelosNecessario) +
        " novelos!";
}
