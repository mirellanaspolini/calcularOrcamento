import React, { useState } from "react";
import "./index.css";
import ModalConteudo from "./ModalConteudo";

const Modal = ({ taAberto, lista }) => {
    const display = { display: taAberto.isOpen ? "block" : "none" };

    return (
        <article style={display} aria-modal className="modalBackgroundBlur">
            <div className="modalWrapper">
                <div className="modal">
                    <ModalConteudo lista={lista} taAberto={taAberto} />
                </div>
            </div>
        </article>
    );
};

export default Modal;
