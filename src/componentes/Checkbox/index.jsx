import React from "react";

const Checkbox = ({ id, preco, label, onChange }) => {
    return (
        <>
            <input
                style={{ margin: "0px 4px" }}
                type="checkbox"
                id={id}
                data-preco={preco}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </>
    );
};

export default Checkbox;
