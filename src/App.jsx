import { useEffect, useState } from "react";
import "./App.css";
import AplicadorDesconto from "./componentes/AplicadorDesconto";
import CalculadoraNovelos from "./componentes/CalculadoraNovelos";
import CampoTexto from "./componentes/CampoTexto";
import ValoresAdicionais from "./componentes/ValoresAdicionais";

const App = () => {
    const [valorTotal, setValorTotal] = useState(0);
    const [valorTotalHoras, setValorTotalHoras] = useState(0);
    const [valorTotalAgulhas, setValorTotalAgulhas] = useState(0);
    const [valorEnchimento, setValorEnchimento] = useState(0);
    const [valorAdicional, setValorAdicional] = useState(0);
    const [valorTotalNovelo, setTotalValorNovelo] = useState(0);
    const valoresFixos = 10;

    const calculaTotalComLucro = () => {
        const somaTotal =
            valoresFixos +
            valorTotalAgulhas +
            valorTotalHoras +
            valorEnchimento +
            valorAdicional +
            valorTotalNovelo;
        const totalComLucro = somaTotal + somaTotal * 0.27;
        setValorTotal(totalComLucro);
    };

    useEffect(() => {
        calculaTotalComLucro();
    }, [
        valorTotalHoras,
        valorTotalAgulhas,
        valorEnchimento,
        valorAdicional,
        valorTotalNovelo,
    ]);

    return (
        <main>
            <img
                style={{ display: "block", margin: "0 auto 16px" }}
                width="100px"
                src="/logo.svg"
                alt="Logo da Pingurumis - crocheteria"
            />
            <h3>Calculadora de Orçamentos</h3>
            <div className="calcOrcamento_wrapper">
                <CampoTexto
                    id="txtQuantHoras"
                    label="Quant. de horas"
                    onChange={({ target }) =>
                        setValorTotalHoras(target.value * 8)
                    }
                    tipo="number"
                    placeholder="0"
                />
                <CampoTexto
                    id="txtQuantEnchimento"
                    label="Enchimento (g)"
                    onChange={({ target }) =>
                        setValorEnchimento(target.value / 10)
                    }
                    tipo="number"
                    placeholder="0"
                />
                <CampoTexto
                    id="txtQuantAgulhas"
                    label="Quant. agulhas"
                    onChange={({ target }) =>
                        setValorTotalAgulhas(target.value * 3.7)
                    }
                    tipo="number"
                    placeholder="0"
                />
            </div>
            <ValoresAdicionais
                setValorAdicional={setValorAdicional}
                valorAdicional={valorAdicional}
            />
            <hr />
            <CalculadoraNovelos setTotalValorNovelo={setTotalValorNovelo} />
            <hr />
            <AplicadorDesconto
                valorTotal={valorTotal}
                setValorTotal={setValorTotal}
            />
            <hr />
            <h2>
                Total: R$ {isNaN(valorTotal) ? "0.00" : valorTotal.toFixed(2)}
            </h2>
        </main>
    );
};

export default App;
