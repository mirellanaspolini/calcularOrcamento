import React from "react";

const Checkbox = ({ id, preco, label, onChange }) => {
    return (
        <div>
            <input
                className="checkbox"
                style={{ margin: "0px 4px" }}
                type="checkbox"
                id={id}
                data-preco={preco}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default Checkbox;
