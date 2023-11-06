import React, { useEffect, useRef, useState } from "react";
import CampoTexto from "../CampoTexto";

const CalculadoraNovelos = ({ valorTotalNovelo }) => {
    const [amostra, setAmostra] = useState({});
    const [tamanhoPecaFinal, setTamanhoPecaFinal] = useState({
        alturaFinal: 0,
        larguraFinal: 0,
    });
    let numeroNovelosNecessario = 0;
    const printaQuantNovelo = useRef();

    const printaNumeroNovelos = () => {
        printaQuantNovelo.current.textContent = `Você precisará de ${Math.ceil(
            numeroNovelosNecessario
        )} novelo(s)`;
    };

    useEffect(() => {
        printaNumeroNovelos();
    }, [numeroNovelosNecessario]);

    const listaLinhasInicial = [
        {
            nome: "balloonAmigo",
            amostra: {
                amostraFioLargura: 10,
                amostraFioAltura: 5,
                amostraPeso: 4.5,
                pesoNovelo: 50,
                valorNovelo: 7.25,
            },
        },
        {
            nome: "amigurumiPelucia",
            amostra: {
                amostraFioLargura: 10,
                amostraFioAltura: 5,
                amostraPeso: 4,
                pesoNovelo: 85,
                valorNovelo: 10.4,
            },
        },
        {
            nome: "amigurumiPeluciaDuplo",
            amostra: {
                amostraFioLargura: 10,
                amostraFioAltura: 5,
                amostraPeso: 8,
                pesoNovelo: 85,
                valorNovelo: 10.4,
                // carreiras 5, 12 pontos
            },
        },
    ];

    const [listaLinhas, setListaLinhas] = useState(listaLinhasInicial);

    const escolheLinha = (e) => {
        listaLinhas
            .filter((lista) => lista.nome === e.target.value)
            .map((linha) => setAmostra(linha.amostra));
    };

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
        printaNumeroNovelos();
    };

    return (
        <div>
            <h2>Calculadora de Novelos</h2>

            <form action="" onSubmit={handleSubmit}>
                <div className="gridTamanho">
                    <CampoTexto
                        id="alturaFinal"
                        label="Altura"
                        onChange={({ target }) =>
                            setTamanhoPecaFinal((anterior) => ({
                                ...anterior,
                                alturaFinal: target.value,
                            }))
                        }
                    />
                    <CampoTexto
                        id="larguraFinal"
                        label="Largura"
                        onChange={({ target }) =>
                            setTamanhoPecaFinal((anterior) => ({
                                ...anterior,
                                larguraFinal: target.value,
                            }))
                        }
                    />
                </div>
                <fieldset>
                    <label>Escolha a linha:</label>
                    <select
                        id="selectLinha"
                        onChange={(e) => escolheLinha(e)}
                        required
                    >
                        <option selected disabled value="">
                            Selecione
                        </option>
                        <option value="balloonAmigo">Balloon Amigo</option>
                        <option value="amigurumiPelucia">
                            Amigurumi Pelúcia
                        </option>
                        <option value="amigurumiPeluciaDuplo">
                            Amigurumi Pelúcia Duplo
                        </option>
                    </select>
                </fieldset>
                <button id="btnSubmit" type="submit">
                    Calcular
                </button>
                <p ref={printaQuantNovelo}>e</p>
            </form>
        </div>
    );
};

export default CalculadoraNovelos;
