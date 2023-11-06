import React from "react";

const CampoTexto = ({label, id, onChange}) => {
    return (
        <fieldset>
            <label htmlFor={id}>{label}:</label>
            <input
                type="number"
                id={id}
                onChange={onChange}
            />
        </fieldset>
    );
};

export default CampoTexto;
