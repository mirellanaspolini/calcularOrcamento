import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CampoTexto from "../CampoTexto";
import "./index.css";

const Modal = ({ isOpen, lista }) => {
    const display = { display: isOpen ? "block" : "none" };

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

    const teste = {
        // linha: "Amigurumi Soft",
        // palavraChave: "amigurumiSoft",
        // amostra: {
        //     largura: 10,
        //     altura: 5,
        //     peso: 4,
        // },
        // noveloInfo: {
        //     pesoNovelo: 65,
        //     valorNovelo: 10.36,
        // },
    };

    const handleClick = () => {
        const jaExiste = lista.listaLinhas.find(
            (lista) => lista.linha === teste.linha
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
                        />
                    </div>

                    <span style={{ display: "flex", gap: "16px" }}>
                        <button
                            id="btnSubmit"
                            type="submit"
                            onClick={handleClick}
                        >
                            Cadastrar
                        </button>
                        <button
                            id="btnSubmit"
                            style={{ backgroundColor: "white" }}
                            // onClick={fechaModal}
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
