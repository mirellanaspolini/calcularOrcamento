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
    };

    return (
        <div>
            <h2>Calculadora de Novelos: </h2>

            <form action="" onSubmit={handleSubmit}>
                <h3>Tamanho final do amigurumi:</h3>

                <label htmlFor="alturaFinal">Altura (cm):</label>
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
                <br />
                <label htmlFor="larguraFinal">Largura (cm):</label>
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

                <h3>Qual linha irá usar? </h3>
                <label htmlFor="selectLinha">Escolha uma opção:</label>
                <select
                    id="selectLinha"
                    onChange={({ target }) => {
                        setLinha(target.value);
                        document.getElementById("btnSubmit").click();
                    }}
                >
                    <option value="" defaultValue disabled>
                        Selecione
                    </option>
                    <option value="balloonAmigo">Balloon Amigo</option>
                    <option value="amigurumiPelucia">Amigurumi Pélucia</option>
                </select>
                <button id="btnSubmit" type="submit">
                    aa
                </button>
            </form>

            <p>Você irá precisar de {numeroNovelosNecessario}</p>
        </div>
    );
};

export default CalculadoraNovelos;
