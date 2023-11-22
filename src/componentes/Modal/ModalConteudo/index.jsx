import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CampoTexto from "../../CampoTexto";
import "../../Modal/index.css";
import MensagemErro from "../../MensagemErro";

const ModalConteudo = ({ lista, taAberto }) => {
    const [feedback, setFeedback] = useState("");

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

    const validaValores = () => {
        if (
            linha === "" ||
            amostra.altura === 0 ||
            amostra.largura === 0 ||
            amostra.peso === 0 ||
            noveloInfo.pesoNovelo === 0 ||
            noveloInfo.valorNovelo === 0
        ) {
            setErro("Preencha todos os campos");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro(null);
        setFeedback(null);

        if (!validaValores()) return;

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
            setFeedback(`O fio "${linha}" foi cadastrado!`);
        }
        return;
    };

    const handleClick = (e) => {
        e.preventDefault();
        taAberto.setIsOpen(false);
    };

    return (
        <form>
            <div>
                <h3>Cadastre uma nova linha</h3>
                <h4>Novelo: </h4>
                <CampoTexto
                    id="txtLinha"
                    label="Linha"
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
                <h4>Amostra: </h4>
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
            <MensagemErro erro={erro} />
            {feedback && <p>{feedback}</p>}

            <span style={{ display: "flex", gap: "2px" }}>
                <button
                    className="btnFull btnPrimario"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Cadastrar
                </button>
                <button className="btnFull btnSecundario" onClick={handleClick}>
                    Fechar
                </button>
            </span>
        </form>
    );
};

export default ModalConteudo;
