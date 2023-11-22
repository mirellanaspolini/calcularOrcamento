import React from "react";
import Checkbox from "../Checkbox";

const ValoresAdicionais = ({ setValorAdicional, valorAdicional }) => {
    const campos = [
        {
            id: "txtFeltro",
            label: "Feltro",
            preco: 5,
        },
        {
            id: "txtChaveiro",
            label: "Chaveiro",
            preco: 5,
        },
        {
            id: "txtOlhos",
            label: "Olhos com trava",
            preco: 0.5,
        },
        {
            id: "txtBiscuit",
            label: "Biscuit",
            preco: 10,
        },
    ];
    const calculaValorAdicional = ({ target }) => {
        const valor = Number(target.dataset.preco);
        target.checked
            ? setValorAdicional(valorAdicional + valor)
            : setValorAdicional(valorAdicional - valor);
    };
    
    return (
        <div style={{marginTop: "12px"}}>
            {campos.map(({ id, label, preco }) => (
                <Checkbox
                    id={id}
                    label={label}
                    preco={preco}
                    onChange={calculaValorAdicional}
                />
            ))}
        </div>
    );
};

export default ValoresAdicionais;
