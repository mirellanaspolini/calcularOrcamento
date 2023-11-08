import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CampoTexto from "../CampoTexto";
import "./index.css";

const Modal = ({ situacao, lista }) => {
    const display = { display: situacao.isOpen ? "block" : "none" };

    const [linha, setLinha] = useState("");
    const [amostra, setAmostra] = useState({
        largura: 0,
        altura: 0,
        peso: 0,
    });
    const [noveloInfo, setNoveloInfo] = useState({
        pesoNovelo: 0,
        valorNovelo: 0,
    });
    const [erro, setErro] = useState("");

    const handleClick = (e) => {
        e.preventDefault();

        situacao.setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro(null);

        if (
            linha == "" ||
            amostra.altura == "" ||
            amostra.largura == "" ||
            amostra.peso == "" ||
            noveloInfo.pesoNovelo == "" ||
            noveloInfo.valorNovelo == ""
        ) {
            setErro("Preencha todos os campos");
            return;
        }

        const jaExiste = lista.listaLinhas.find(
            (lista) => lista.linha === linha
        );
        if (!jaExiste) {
            lista.setListaLinhas([
                ...lista.listaLinhas,
                {
                    id: uuidv4(),
                    palavraChave: linha.replace(" ", ""),
                    linha,
                    amostra,
                    noveloInfo,
                },
            ]);
        }
    };

    return (
        <article style={display} aria-modal className="modalBackgroundBlur">
            <div className="modalWrapper">
                <form className="modal">
                    <div>
                        <h2>Cadastre uma nova linha</h2>
                        <h3>Novelo: </h3>
                        <CampoTexto
                            id="txtLinha"
                            label="Nome"
                            onChange={({ target }) => setLinha(target.value)}
                        />
                        <CampoTexto
                            id="txtPesoNovelo"
                            label="Peso (g)"
                            onChange={({ target }) =>
                                setNoveloInfo((anterior) => ({
                                    ...anterior,
                                    pesoNovelo: target.value,
                                }))
                            }
                            tipo="number"
                        />

                        <CampoTexto
                            id="txtValorNovelo"
                            label="Valor"
                            onChange={({ target }) =>
                                setNoveloInfo((anterior) => ({
                                    ...anterior,
                                    valorNovelo: target.value,
                                }))
                            }
                            tipo="number"
                        />
                        <h3>Amostra: </h3>
                        <CampoTexto
                            id="txtAltura"
                            label="Altura (cm)"
                            onChange={({ target }) =>
                                setAmostra((anterior) => ({
                                    ...anterior,
                                    altura: target.value,
                                }))
                            }
                            tipo="number"
                        />
                        <CampoTexto
                            id="txtLargura"
                            label="Largura (cm)"
                            onChange={({ target }) =>
                                setAmostra((anterior) => ({
                                    ...anterior,
                                    largura: target.value,
                                }))
                            }
                            tipo="number"
                        />
                        <CampoTexto
                            id="txtPeso"
                            label="Peso (g)"
                            onChange={({ target }) =>
                                setAmostra((anterior) => ({
                                    ...anterior,
                                    peso: target.value,
                                }))
                            }
                            tipo="number"
                        />
                    </div>
                    <span style={{ color: "#db4444" }}>{erro}</span>
                    <span style={{ display: "flex", gap: "2px" }}>
                        <button
                            className="btnFull btnPrimario"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Cadastrar
                        </button>
                        <button
                            className="btnFull btnSecundario"
                            style={{ backgroundColor: "white" }}
                            onClick={handleClick}
                        >
                            Fechar
                        </button>
                    </span>
                </form>
            </div>
        </article>
    );
};

export default Modal;
