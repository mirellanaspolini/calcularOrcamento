import { useEffect, useState } from "react";
import "./App.css";
import CalculadoraNovelos from "./componentes/CalculadoraNovelos";
import CampoTexto from "./componentes/CampoTexto";

const App = () => {
    const [valorTotal, setValorTotal] = useState(0);
    const [valorTotalHoras, setValorTotalHoras] = useState(0);
    const [valorTotalAgulhas, setValorTotalAgulhas] = useState(0);
    const [valorEnchimento, setValorEnchimento] = useState(0);
    const [valorAdicional, setValorAdicional] = useState(0);
    const [valorTotalNovelo, setTotalValorNovelo] = useState(0);
    const valoresFixos = 0.15 + 0.6 + 1;

    const calculaTotalComLucro = () => {
        const somaTotal =
            valoresFixos +
            valorTotalAgulhas +
            valorTotalHoras +
            valorEnchimento +
            valorAdicional +
            valorTotalNovelo;
        const totalComLucro = somaTotal + somaTotal * 0.2;
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

    const calculaValorAdicional = ({ target }) => {
        target.checked
            ? setValorAdicional(valorAdicional + Number(target.dataset.preco))
            : setValorAdicional(valorAdicional - Number(target.dataset.preco));
    };

    return (
        <main>
            <h2>Calculadora de Orçamentos</h2>
            <CampoTexto
                id="txtQuantHoras"
                label="Quant. de horas"
                onChange={({ target }) => setValorTotalHoras(target.value * 8)}
                tipo="number"
            />
            <CampoTexto
                id="txtQuantEnchimento"
                label="Enchimento (g)"
                onChange={({ target }) => setValorEnchimento(target.value / 10)}
                tipo="number"
            />
            <CampoTexto
                id="txtQuantAgulhas"
                label="Quant. agulhas"
                onChange={({ target }) =>
                    setValorTotalAgulhas(target.value * 3.7)
                }
                tipo="number"
            />
            <div className="checkbox-wrapper">
                <input
                    type="checkbox"
                    id="txtChaveiro"
                    data-preco="5"
                    onChange={calculaValorAdicional}
                />
                <label htmlFor="txtChaveiro">Chaveiro</label>
                <input
                    type="checkbox"
                    id="txtFeltro"
                    data-preco="5"
                    onChange={calculaValorAdicional}
                />
                <label htmlFor="txtFeltro">Feltro</label>
                <input
                    type="checkbox"
                    id="txtOlhinhos"
                    data-preco="0.40"
                    onChange={calculaValorAdicional}
                />
                <label htmlFor="txtOlhinhos">Olhinhos</label>
            </div>

            <hr />

            <CalculadoraNovelos
                valorTotalNovelo={{ valorTotalNovelo, setTotalValorNovelo }}
            />
            <hr />
            <h2>
                Total: R${" "}
                {isNaN(valorTotal) ? "0.00" : Math.ceil(valorTotal.toFixed(2))}
            </h2>
        </main>
    );
};

export default App;
