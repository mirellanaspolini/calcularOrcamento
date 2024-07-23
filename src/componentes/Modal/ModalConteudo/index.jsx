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
            <h3>Cadastre uma nova linha</h3>
            <h4>Informações do novelo</h4>
            <span>
                <CampoTexto
                    id="txtLinha"
                    label="Linha"
                    onChange={({ target }) => setLinha(target.value)}
                    placeholder="Nome da linha"
                />
                <CampoTexto
                    id="txtPesoNovelo"
                    label="Peso"
                    onChange={({ target }) =>
                        setNoveloInfo((anterior) => ({
                            ...anterior,
                            pesoNovelo: target.value,
                        }))
                    }
                    tipo="number"
                    placeholder="0"
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
                    placeholder="0"
                />
            </span>
            <h4>Informações da amostra</h4>
            <span>
                <CampoTexto
                    id="txtAltura"
                    label="Altura"
                    onChange={({ target }) =>
                        setAmostra((anterior) => ({
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
                        setAmostra((anterior) => ({
                            ...anterior,
                            largura: target.value,
                        }))
                    }
                    tipo="number"
                    placeholder="0"
                />
                <CampoTexto
                    id="txtPeso"
                    label="Peso"
                    onChange={({ target }) =>
                        setAmostra((anterior) => ({
                            ...anterior,
                            peso: target.value,
                        }))
                    }
                    tipo="number"
                    placeholder="0"
                />
            </span>
            <MensagemErro erro={erro} />
            {feedback && <p>{feedback}</p>}

            <span style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
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
