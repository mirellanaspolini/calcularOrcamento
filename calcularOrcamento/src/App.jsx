import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [valorTotal, setValorTotal] = useState(0);
    const [valorTotalHoras, setValorTotalHoras] = useState(0);
    const [valorTotalAgulhas, setValorTotalAgulhas] = useState(0);

    useEffect(() => {
        let valorTotal = valorTotalAgulhas + valorTotalHoras;
        setValorTotal(valorTotal);
    }, [valorTotalHoras, valorTotalAgulhas]);

    return (
        <main>
            <h1>Calculadora de Orçamentos</h1>

            <h3>Calcule o orçamento:</h3>
            <label htmlFor="quantHoras">Quantidade de horas estimado: </label>
            <input
                onChange={({ target }) => setValorTotalHoras(target.value * 8)}
                type="number"
                placeholder="0"
            />
            {valorTotalHoras}
            <br />
            <label htmlFor="quantEnchimento">Enchimento (g):</label>
            <input type="number" id="quantEnchimento" placeholder="0" />
            <br />
            <label htmlFor="quantAgulhas">Quantidade de agulhas necessárias:</label>
            <input
                onChange={({ target }) =>
                    setValorTotalAgulhas(target.value * 3.7)
                }
                type="number"
                id="quantAgulhas"
                placeholder="0"
            />
            {valorTotalAgulhas}

            <h3>Tamanho final do amigurumi:</h3>

            <label htmlFor="alturaFinal">Altura (cm):</label>
            <input type="number" id="alturaFinal" placeholder="0" />

            <br />

            <label htmlFor="larguraFinal">Largura (cm):</label>
            <input type="number" id="larguraFinal" placeholder="0" />

            <br />

            <h3>Calculadora de Novelos</h3>

            <label>Selecione a linha:</label>
            <select onChange="teste()" name="selectLinha" id="selectLinha">
                <option value="" selected disabled>
                    Selecione a linha
                </option>
                <option value="balloonAmigo">Balloon Amigo</option>
                <option value="amigurumiPelucia">Amigurumi Pélucia</option>
            </select>

            <p id="resultado"></p>

            <p></p>
            <input
                type="checkbox"
                name="txtChaveiro"
                value="txtChaveiro"
                id="txtChaveiro"
                data-preco="5"
            />
            <label htmlFor="txtChaveiro">Chaveiro</label>

            <input
                type="checkbox"
                name="txtFeltro"
                value="txtFeltro"
                id="txtFeltro"
                data-preco="2.8"
            />
            <label htmlFor="txtFeltro">Feltro</label>

            <input
                type="checkbox"
                name="txtOlhinhos"
                value="txtOlhinhos"
                id="txtOlhinhos"
                data-preco="0.20"
            />
            <label htmlFor="txtOlhinhos">Olhinhos</label>

            <h2 id="total">Total: R$ {valorTotal.toFixed(2)}</h2>
        </main>
    );
}

export default App;
