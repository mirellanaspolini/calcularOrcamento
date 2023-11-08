import React from "react";

const CampoTexto = ({ label, id, onChange, tipo = "text" }) => {
    return (
        <fieldset>
            <label htmlFor={id}>{label}:</label>
            <input type={tipo} id={id} onChange={onChange} required />
        </fieldset>
    );
};

export default CampoTexto;
