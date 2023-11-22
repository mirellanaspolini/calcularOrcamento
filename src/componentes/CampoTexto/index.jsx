import React from "react";

const CampoTexto = ({ label, id, onChange, tipo = "text", valor }) => {
    return (
        <fieldset>
            <label htmlFor={id}>{label}:</label>
            <input type={tipo} id={id} onChange={onChange} value={valor} required />
        </fieldset>
    );
};

export default CampoTexto;
