import React, { useState } from "react";
import CampoTexto from "../CampoTexto";
import "./style.css";

const AplicadorDesconto = ({ valorTotal, setValorTotal }) => {
    const [desconto, setDesconto] = useState(0);
    const [percDesconto, setPercDesconto] = useState(0);

    const calculaDesconto = () => {
        const valorDesconto = valorTotal * (percDesconto / 100);
        const valorTotalComDesconto = valorTotal - valorDesconto;

        setDesconto(valorDesconto);
        setValorTotal(valorTotalComDesconto);
    };
    const descontaDesconto = () => {
        const valorTotalSemDesconto = valorTotal + desconto;

        setDesconto(0);
        setPercDesconto(0);
        setValorTotal(valorTotalSemDesconto);
    };

    return (
        <div className="campoDesconto">
            <CampoTexto
                id="txtDesconto"
                label="Adicionar desconto (%)"
                tipo="number"
                onChange={({ target }) => setPercDesconto(target.value)}
                valor={percDesconto}
                placeholder="0"
            />
            {desconto === 0 ? (
                <button
                    type="button"
                    className="btn btnPrimario"
                    onClick={calculaDesconto}
                >
                    Adicionar
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btnSecundario"
                    onClick={descontaDesconto}
                >
                    Remover
                </button>
            )}
        </div>
    );
};

export default AplicadorDesconto;
