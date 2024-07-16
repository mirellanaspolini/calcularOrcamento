import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CampoTexto from "../CampoTexto";
import MensagemErro from "../MensagemErro";
import Modal from "../Modal";
import "./style.css";

const CalculadoraNovelos = ({ setTotalValorNovelo }) => {
    const [amostra, setAmostra] = useState({});
    const [novelo, setNovelo] = useState({});
    const [tamanhoPecaFinal, setTamanhoPecaFinal] = useState({
        altura: 0,
        largura: 0,
    });
    const [erro, setErro] = useState("");
    let novelosNecessarios = 0;
    const printaQuantNovelo = useRef();

    const printaNumeroNovelos = () => {
        printaQuantNovelo.current.textContent = `Você vai precisar de ${
            isNaN(novelosNecessarios) ? "0" : Math.ceil(novelosNecessarios)
        } novelo(s)`;
    };

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
                valorNovelo: 7.9,
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
                valorNovelo: 12.2,
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
            },
            noveloInfo: {
                pesoNovelo: 85,
                valorNovelo: 12.2,
            },
        },
    ];

    const linhasArmazenadasLS = localStorage.getItem("linhas");
    const linhasIniciais = linhasArmazenadasLS
        ? JSON.parse(linhasArmazenadasLS)
        : listaLinhasInicial;

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
        setErro("");
        if (!validaValores()) return;

        let areaAmostra = amostra.altura * amostra.largura;
        let areaPecaFinal = tamanhoPecaFinal.altura * tamanhoPecaFinal.largura;
        let consumoTotalFio = Math.ceil(
            (amostra.peso / areaAmostra) * areaPecaFinal
        );

        novelosNecessarios = consumoTotalFio / novelo.pesoNovelo;

        setTotalValorNovelo(
            novelosNecessarios >= 1
                ? novelosNecessarios * novelo.valorNovelo * 3
                : novelosNecessarios * novelo.valorNovelo
        );
        printaNumeroNovelos();
    };

    const [isOpen, setIsOpen] = useState(false);

    const abreModal = () => setIsOpen(!isOpen);

    const validaValores = () => {
        if (
            tamanhoPecaFinal.largura == "" ||
            tamanhoPecaFinal.altura == "" ||
            novelo.pesoNovelo == ""
        ) {
            setErro("Preencha todos os campos");
            return false;
        }
        return true;
    };

    return (
        <>
            <h3>Calculadora de Novelos</h3>

            <form>
                <div className="calcNovelo_campos">
                    <div className="calcNovelo-tamanho_wrapper">
                        <p style={{marginBottom: "8px"}}>Tamanho da peça em cm</p>
                        <div>
                            <CampoTexto
                                id="txtAltura"
                                label="Altura"
                                onChange={({ target }) =>
                                    setTamanhoPecaFinal((anterior) => ({
                                        ...anterior,
                                        altura: target.value,
                                    }))
                                }
                                tipo="number"
                                placeholder="Altura"
                            />
                            <CampoTexto
                                id="txtLargura"
                                label="Largura"
                                onChange={({ target }) =>
                                    setTamanhoPecaFinal((anterior) => ({
                                        ...anterior,
                                        largura: target.value,
                                    }))
                                }
                                tipo="number"
                                placeholder="Largura"
                            />
                        </div>
                    </div>
                    <fieldset
                        className="calcNovelo-escolherLinha"
                        style={{ flexWrap: "wrap" }}
                    >
                        <label
                            style={{ display: "inline-block" }}
                            htmlFor="selectLinha"
                        >
                            Escolha a linha:
                        </label>
                        <span>
                            <select
                                id="selectLinha"
                                onChange={(e) => escolheLinha(e)}
                                required
                            >
                                <option selected disabled>
                                    Selecione
                                </option>
                                {listaLinhas.map(
                                    ({ id, palavraChave, linha }) => (
                                        <option key={id} value={palavraChave}>
                                            {linha}
                                        </option>
                                    )
                                )}
                            </select>
                            <button
                                type="button"
                                className="btn btnIcone btnSecundario"
                                title="Cadastrar uma nova linha"
                                onClick={abreModal}
                            >
                                +
                            </button>
                        </span>
                    </fieldset>
                </div>
                <MensagemErro erro={erro} />
                <button
                    className="btnFull btnPrimario"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Calcular
                </button>
                <p ref={printaQuantNovelo}></p>
            </form>
            <Modal
                taAberto={{ isOpen, setIsOpen }}
                lista={{ listaLinhas, setListaLinhas }}
            />
        </>
    );
};

export default CalculadoraNovelos;
