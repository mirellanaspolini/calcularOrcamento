import React from "react";

const CampoTexto = ({ label, id, onChange, tipo = "number" }) => {
    return (
        <fieldset>
            <label htmlFor={id}>{label}:</label>
            <input type={tipo} id={id} onChange={onChange} />
        </fieldset>
    );
};

export default CampoTexto;
