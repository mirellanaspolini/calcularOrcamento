import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CampoTexto from "../CampoTexto";
import Modal from "../Modal";

const CalculadoraNovelos = ({ valorTotalNovelo }) => {
    const [amostra, setAmostra] = useState({});
    const [novelo, setNovelo] = useState({});
    const [tamanhoPecaFinal, setTamanhoPecaFinal] = useState({
        altura: 0,
        largura: 0,
    });
    let numeroNovelosNecessario = 0;
    const printaQuantNovelo = useRef();

    const printaNumeroNovelos = () => {
        printaQuantNovelo.current.textContent = `Você precisará de ${
            isNaN(numeroNovelosNecessario)
                ? "0"
                : Math.ceil(numeroNovelosNecessario)
        } novelo(s)`;
    };

    useEffect(() => {
        printaNumeroNovelos();
    }, [numeroNovelosNecessario]);

    const listaLinhasInicial = [
        {
            id: uuidv4(),
            linha: "Balloon Amigo",
            palavraChave: "balloonAmigo",
            amostra: {
                largura: 10,
                altura: 5,
                peso: 4.5,
            },
            noveloInfo: {
                pesoNovelo: 50,
                valorNovelo: 7.25,
            },
        },
        {
            id: uuidv4(),
            linha: "Amigurumi Pelúcia",
            palavraChave: "amigurumiPelucia",
            amostra: {
                largura: 10,
                altura: 5,
                peso: 4,
            },
            noveloInfo: {
                pesoNovelo: 85,
                valorNovelo: 10.4,
            },
        },
        {
            id: uuidv4(),
            linha: "Amigurumi Pelúcia duplo",
            palavraChave: "amigurumiPeluciaDuplo",
            amostra: {
                largura: 10,
                altura: 5,
                peso: 8,
                // carreiras 5, 12 pontos
            },
            noveloInfo: {
                pesoNovelo: 85,
                valorNovelo: 10.4,
            },
        },
    ];

    const linhasArmazenadasLS = localStorage.getItem("linhas");
    const linhasIniciais = linhasArmazenadasLS
        ? JSON.parse(linhasArmazenadasLS)
        : listaLinhasInicial;

    console.log(linhasIniciais);

    const [listaLinhas, setListaLinhas] = useState(linhasIniciais);

    useEffect(() => {
        localStorage.setItem("linhas", JSON.stringify(listaLinhas));
    }, [listaLinhas]);

    const escolheLinha = (e) => {
        listaLinhas
            .filter((linha) => linha.palavraChave === e.target.value)
            .map(({ noveloInfo, amostra }) => {
                setAmostra(amostra);
                setNovelo(noveloInfo);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let areaAmostra = amostra.altura * amostra.largura;
        let areaPecaFinal = tamanhoPecaFinal.altura * tamanhoPecaFinal.largura;
        let consumoTotalFio = Math.ceil(
            (amostra.peso / areaAmostra) * areaPecaFinal
        );

        numeroNovelosNecessario = consumoTotalFio / novelo.pesoNovelo;

        valorTotalNovelo.setTotalValorNovelo(
            numeroNovelosNecessario >= 1
                ? numeroNovelosNecessario * novelo.valorNovelo * 3
                : numeroNovelosNecessario * novelo.valorNovelo
        );
        printaNumeroNovelos();
    };

    const [isOpen, setIsOpen] = useState(false);

    const abreModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <h2>Calculadora de Novelos</h2>

            <form>
                <div className="gridTamanho">
                    <CampoTexto
                        tipo="text"
                        id="txtAltura"
                        label="Altura (cm)"
                        onChange={({ target }) =>
                            setTamanhoPecaFinal((anterior) => ({
                                ...anterior,
                                altura: target.value,
                            }))
                        }
                    />
                    <CampoTexto
                        id="txtLargura"
                        label="Largura (cm)"
                        onChange={({ target }) =>
                            setTamanhoPecaFinal((anterior) => ({
                                ...anterior,
                                largura: target.value,
                            }))
                        }
                    />
                </div>
                <fieldset>
                    <label htmlFor="selectLinha">Escolha a linha:</label>
                    <select
                        id="selectLinha"
                        onChange={(e) => escolheLinha(e)}
                        required
                    >
                        <option selected disabled value="">
                            Selecione
                        </option>
                        {listaLinhas.map(({ id, palavraChave, linha }) => (
                            <option key={id} value={palavraChave}>
                                {linha}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        className="btnSecundario"
                        title="Cadastrar uma linha"
                        onClick={abreModal}
                    >
                        +
                    </button>
                </fieldset>
                <button id="btnSubmit" type="submit" onClick={handleSubmit}>
                    Calcular
                </button>
                <p ref={printaQuantNovelo}>e</p>
            </form>
            <Modal isOpen={isOpen} lista={{ listaLinhas, setListaLinhas }} />
        </div>
    );
};

export default CalculadoraNovelos;
