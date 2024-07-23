import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CampoTexto from "../CampoTexto";
import MensagemErro from "../MensagemErro";
import Modal from "../Modal";
import "./style.css";

const CalculadoraNovelos = ({ setTotalValorNovelo }) => {
    const [amostra, setAmostra] = useState({});
    const [novelo, setNovelo] = useState({});
    const [pecaFinal, setPecaFinal] = useState({
        altura: 0,
        largura: 0,
    });
    const [erro, setErro] = useState("");
    const [novelosNecessarios, setNovelosNecessarios] = useState(0);
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
                altura: 4,
                largura: 4,
                peso: 4,
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
                altura: 4.5,
                largura: 4.5,
                peso: 7,
            },
            noveloInfo: {
                pesoNovelo: 85,
                valorNovelo: 12.2,
            },
        },
        {
            id: uuidv4(),
            linha: "Amigurumi Pelucia Duplo",
            palavraChave: "amigurumiPeluciaDuplo",
            amostra: {
                altura: 5,
                largura: 10,
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

        const areaAmostra = calcularAreaCilindro(amostra.largura / 2, amostra.altura);
        const areaPecaFinal = calcularAreaCilindro(pecaFinal.largura / 2, pecaFinal.altura);
        const pesopeçafinal = (amostra.peso * areaPecaFinal) / areaAmostra;

        setNovelosNecessarios(pesopeçafinal / novelo.pesoNovelo);

        setTotalValorNovelo(
            novelosNecessarios >= 1
                ? novelosNecessarios * novelo.valorNovelo * 3
                : novelosNecessarios * novelo.valorNovelo
        );

        printaNumeroNovelos();
    };

    const calcularAreaCilindro = (raio, altura) => {
        const areaBase = Math.PI * raio * raio;
        const areaLateral = 2 * Math.PI * raio * altura;
        const areaTotal = 2 * areaBase + areaLateral;
        
        return areaTotal;
      }
      

    const [isOpen, setIsOpen] = useState(false);

    const abreModal = () => setIsOpen(!isOpen);

    const validaValores = () => {
        if (
            pecaFinal.largura == "" ||
            pecaFinal.altura == "" ||
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
                        <p>Tamanho da peça (cm)</p>
                        <div>
                            <CampoTexto
                                id="txtAltura"
                                label="Altura"
                                onChange={({ target }) =>
                                    setPecaFinal((anterior) => ({
                                        ...anterior,
                                        altura: target.value,
                                    }))
                                }
                                tipo="number"
                                placeholder="0"
                            />
                            <CampoTexto
                                id="txtLargura"
                                label="Largura"
                                onChange={({ target }) =>
                                    setPecaFinal((anterior) => ({
                                        ...anterior,
                                        largura: target.value,
                                    }))
                                }
                                tipo="number"
                                placeholder="0"
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
