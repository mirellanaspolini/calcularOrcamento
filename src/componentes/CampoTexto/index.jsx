import React from "react";

const CampoTexto = ({
    label,
    id,
    onChange,
    tipo = "text",
    valor,
    placeholder,
}) => {
    return (
        <fieldset>
            <label htmlFor={id}>{label}:</label>
            <input
                type={tipo}
                id={id}
                onChange={onChange}
                value={valor}
                placeholder={placeholder}
                required
            />
        </fieldset>
    );
};

export default CampoTexto;
