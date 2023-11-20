import React from "react";

const MensagemErro = ({ erro }) => {
    const estilo = { color: "#db4444" };

    return <>{erro && <p style={estilo}>{erro}</p>}</>;
};

export default MensagemErro;
