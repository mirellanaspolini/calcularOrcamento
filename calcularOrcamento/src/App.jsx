import { useEffect, useState } from "react";
import "./App.css";
import CalculadoraNovelos from "./CalculadoraNovelos";

function App() {
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
            <h1>Calculadora de Orçamentos</h1>

            <h2>Calcule o orçamento:</h2>
            <label htmlFor="quantHoras">Quantidade de horas estimado: </label>
            <input
                type="number"
                id="quantHoras"
                onChange={({ target }) => setValorTotalHoras(target.value * 8)}
            />
            {valorTotalHoras}
            <br />
            <label htmlFor="quantEnchimento">Enchimento (g):</label>
            <input
                type="number"
                id="quantEnchimento"
                onChange={({ target }) => setValorEnchimento(target.value / 10)}
            />
            <br />
            <label htmlFor="quantAgulhas">
                Quantidade de agulhas necessárias:
            </label>
            <input
                onChange={({ target }) =>
                    setValorTotalAgulhas(target.value * 3.7)
                }
                type="number"
                id="quantAgulhas"
            />
            {valorTotalAgulhas}

            <br />

            <p></p>
            <input
                type="checkbox"
                value="txtChaveiro"
                id="txtChaveiro"
                data-preco="5"
                onChange={calculaValorAdicional}
            />
            <label htmlFor="txtChaveiro">Chaveiro</label>

            <input
                type="checkbox"
                value="txtFeltro"
                id="txtFeltro"
                data-preco="5"
                onChange={calculaValorAdicional}
            />
            <label htmlFor="txtFeltro">Feltro</label>

            <input
                type="checkbox"
                value="txtOlhinhos"
                id="txtOlhinhos"
                data-preco="0.20"
                onChange={calculaValorAdicional}
            />
            <label htmlFor="txtOlhinhos">Olhinhos</label>

            <CalculadoraNovelos
                valorTotalNovelo={{ valorTotalNovelo, setTotalValorNovelo }}
            />
            <hr />
            <h1>Total: R$ {valorTotal.toFixed(2)}</h1>
        </main>
    );
}

export default App;
