var valorTotalHoras = 0;
var quantAgulha = 1;
var precoAgulha = 3.65;
var valorTotal = 0;
var pecaFinalAltura = 0;
var pecaFinalLargura = 0;
var areaPecaFinal = 0
var ConsumoTotalFio = 0;
var fioescolhido = document.getElementById("selectLinha").value
var valorNovelo = 0;
var numeroNovelosNecessario = 0;
var valorTotalNovelo = 0;
var quantEnchimento = 0
var ehChaveiro = false;

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

// Função para atualizar o total e aplicar o lucro
function atualizarTotal() {
    var precoChaveiro = ehChaveiro ? 1.00 : 0 
    var valores = quantAgulha + valorTotalHoras + valorTotalNovelo + 0.60 + 0.90 + quantEnchimento + precoChaveiro;
    var totalComLucro = valores * 0.2 + valores;
    document.querySelector("#total").textContent = "Total: R$ " + totalComLucro.toFixed(2); // Formate para duas casas decimais
}

function guardaLargura({target}) {
    console.log(target);
}

// Adicione event listeners para acompanhar as alterações nos elementos de entrada
document.getElementById("quantHoras").addEventListener("input", calculaHora);
document.getElementById("quantAgulhas").addEventListener("input", calculaQuantAgulha);
document.getElementById("alturaFinal").addEventListener("input", ({target}) => pecaFinalAltura = target.value)
document.getElementById("larguraFinal").addEventListener("input", ({target}) => pecaFinalLargura = target.value)
document.getElementById("quantEnchimento").addEventListener("input", ({target}) => {
    quantEnchimento = target.value / 10;
    atualizarTotal();
})
document.getElementById("chaveiro").addEventListener("change", () => { ehChaveiro = !ehChaveiro; atualizarTotal()});







// -~-~-~-~-~-~-~-~--~-~-~-~-~--~~-~-

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");


function teste() {
    fioescolhido = document.getElementById("selectLinha").value

    // amostra
    let amostraFioLargura = 0;
    let amostraFioAltura = 0;
    let amostraPeso = 0
    let pesoNovelo = 50

    if (fioescolhido === 'balloonAmigo'){
        amostraFioLargura = 10;
        amostraFioAltura = 5;
        amostraPeso = 4.5;
        pesoNovelo = 50;
        valorNovelo = 7.25;
    } else if (fioescolhido === 'amigurumiPelucia'){
        amostraFioLargura = 10;
        amostraFioAltura = 5;
        amostraPeso = 4;
        pesoNovelo = 85;
        valorNovelo = 10.40;
    }

    // areaAmostra = A * L
    let areaAmostra = amostraFioAltura * amostraFioLargura;

    console.log("area da amostra do fio:", areaAmostra, "cm²");

    

    // let areaPecaFinal = Math.PI * ((pecaFinalLargura / 2) ** 2)
    areaPecaFinal = pecaFinalAltura * pecaFinalLargura
    console.log("area da peça final:", areaPecaFinal, "cm²");

    ConsumoTotalFio = Math.ceil((amostraPeso / areaAmostra) * areaPecaFinal);
    console.log("consumo total:", ConsumoTotalFio);


    numeroNovelosNecessario = ConsumoTotalFio / pesoNovelo
    console.log("novelo no total:", numeroNovelosNecessario);

    valorTotalNovelo = numeroNovelosNecessario * valorNovelo
    console.log("valor novelo: ", valorTotalNovelo);


console.log("enchimento", quantEnchimento);
 
    atualizarTotal()
    document.getElementById("resultado").textContent = "Você irá precisar de " + Math.ceil(numeroNovelosNecessario) +" novelos!"
}