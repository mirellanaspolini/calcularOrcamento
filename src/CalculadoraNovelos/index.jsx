import React, { useEffect, useState } from "react";

const CalculadoraNovelos = ({ valorTotalNovelo }) => {
    const [linha, setLinha] = useState();
    const [amostra, setAmostra] = useState({});
    const [tamanhoPecaFinal, setTamanhoPecaFinal] = useState({
        alturaFinal: 0,
        larguraFinal: 0,
    });
    let numeroNovelosNecessario = 0;

    useEffect(() => {
        if (linha === "balloonAmigo") {
            setAmostra({
                amostraFioLargura: 10,
                amostraFioAltura: 5,
                amostraPeso: 4.5,
                pesoNovelo: 50,
                valorNovelo: 7.25,
            });
        } else if (linha === "amigurumiPelucia") {
            setAmostra({
                amostraFioLargura: 10,
                amostraFioAltura: 5,
                amostraPeso: 4,
                pesoNovelo: 85,
                valorNovelo: 10.4,
            });
        } else if (linha === "amigurumiPeluciaDuplo") {
            setAmostra({
                amostraFioLargura: 10,
                amostraFioAltura: 5,
                amostraPeso: 8,
                pesoNovelo: 85,
                valorNovelo: 10.4,
                // carreiras 5, 12 pontos
            });
        }
    }, [linha]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let areaAmostra = amostra.amostraFioAltura * amostra.amostraFioLargura;

        let areaPecaFinal =
            tamanhoPecaFinal.alturaFinal * tamanhoPecaFinal.larguraFinal;
        let consumoTotalFio = Math.ceil(
            (amostra.amostraPeso / areaAmostra) * areaPecaFinal
        );

        numeroNovelosNecessario = consumoTotalFio / amostra.pesoNovelo;

        valorTotalNovelo.setTotalValorNovelo(
            numeroNovelosNecessario >= 1
                ? numeroNovelosNecessario * amostra.valorNovelo * 3
                : numeroNovelosNecessario * amostra.valorNovelo
        );

        console.log("valor:: ",valorTotalNovelo.valorTotalNovelo);
        console.log("numero novelos:: ", Math.ceil(numeroNovelosNecessario));
    };

    return (
        <div>
            <h2>Calculadora de Novelos</h2>

            <form action="" onSubmit={handleSubmit}>
                <div className="gridTamanho">
                    <fieldset>
                        <label htmlFor="alturaFinal">Altura:</label>
                        <input
                            type="number"
                            id="alturaFinal"
                            onChange={({ target }) => {
                                setTamanhoPecaFinal((anterior) => ({
                                    ...anterior,
                                    alturaFinal: target.value,
                                }));
                            }}
                        />                
                    </fieldset>
                    <fieldset>
                        <label htmlFor="larguraFinal">Largura:</label>
                        <input
                            type="number"
                            id="larguraFinal"
                            onChange={({ target }) => {
                                setTamanhoPecaFinal((anterior) => ({
                                    ...anterior,
                                    larguraFinal: target.value,
                                }));
                            }}
                        />

                    </fieldset>
                </div>
                <fieldset>
                    <label>Escolha a linha:</label>
                    <select
                        id="selectLinha"
                        onChange={({ target }) => {
                            setLinha(target.value);
                        }}
                        >
                        <option selected disabled>
                            Selecione
                        </option>
                        <option value="balloonAmigo">Balloon Amigo</option>
                        <option value="amigurumiPelucia">Amigurumi Pelúcia</option>
                        <option value="amigurumiPeluciaDuplo">Amigurumi Pelúcia Duplo</option>
                    </select>
                </fieldset>
                <button id="btnSubmit" type="submit">
                    Calcular
                </button>
            </form>
        </div>
    );
};

export default CalculadoraNovelos;
