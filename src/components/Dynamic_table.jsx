import { useState } from "react";

function Dynamic_table({ data }) {
    const [pagina_atual, set_pagina_atual] = useState(1);
    const produtos_por_pagina = 10;
    
    // verifica se há produtos.
    if (!data || data.length === 0) return <p>Nenhum produto encontrado.</p>;

    // calcula o total de páginas (tam / produtos p pagina
    const total_paginas = Math.ceil(data.length / produtos_por_pagina);

    // pega só a fatia dos produtos da página atual do array
    const inicio = (pagina_atual - 1) * produtos_por_pagina;
    const fim = inicio + produtos_por_pagina;
    const produtos_da_pagina = data.slice(inicio, fim);

    const titulos = ["ID", "Produto", "ID Grupo", "Preço", "Estoque"];

    return (
        <div>
        <table>
            <thead>
            <tr>
                {titulos.map(titulo => (
                <th key={titulo}>{titulo}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {produtos_da_pagina.map(p => (
                <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.idGrupo}</td>
                <td>R$ {p.precoVenda}</td>
                <td>{p.quantidadeEstoque}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* botões de paginação */}
        {/* array para o total de paginas */}
        {/* desabilita o numero da pagina atual (já que já está nela) */}

        <div>
            {Array.from({ length: total_paginas }, (_, i) => i + 1).map(numero => (
            <button
                key={numero}
                onClick={() => set_pagina_atual(numero)}
                disabled={numero === pagina_atual}
            >
                {numero}
            </button>
            ))}
        </div>
        </div>
    );
}


export default Dynamic_table;