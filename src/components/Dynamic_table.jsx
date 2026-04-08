import { useState } from "react";
import Ordination from "./Ordination";
import Deleter from "./Deleter";

function Dynamic_table({ data, titulos, itens, onDelete }) {
    const [pagina_atual, set_pagina_atual] = useState(1);
    const [coluna_ordenacao, set_coluna_ordenacao] = useState(null);
    const [ordem_crescente, set_ordem_crescente] = useState(true);
    const [dados_locais, set_dados_locais] = useState(data);
    const produtos_por_pagina = 10;

    const handleDelete = async (id) => {
        try {
            await onDelete(id);
            // Remove o item da lista após deletar com sucesso
            set_dados_locais(dados_locais.filter(item => item[itens[0]] !== id));
            set_pagina_atual(1); // volta para primeira página
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
        }
    };

    const handleOrdenacao = (coluna_index) => {
        if (coluna_ordenacao === coluna_index) {
            set_ordem_crescente(!ordem_crescente);
        } else {
            set_coluna_ordenacao(coluna_index);
            set_ordem_crescente(true);
        }
    };

    // Ordena os dados
    let dados_ordenados = [...dados_locais];
    if (coluna_ordenacao !== null && itens) {
        const propriedade = itens[coluna_ordenacao];
        dados_ordenados.sort((a, b) => {
            const valor_a = a[propriedade];
            const valor_b = b[propriedade];
            
            if (typeof valor_a === 'number' && typeof valor_b === 'number') {
                return ordem_crescente ? valor_a - valor_b : valor_b - valor_a;
            }
            
            const comparacao = String(valor_a).localeCompare(String(valor_b));
            return ordem_crescente ? comparacao : -comparacao;
        });
    } 
    
    // verifica se há produtos.
    if (!dados_locais || dados_locais.length === 0){
        return <p>Nenhum produto encontrado.</p>;    
    } 

    // calcula o total de páginas (tam / produtos p pagina
    const total_paginas = Math.ceil(dados_ordenados.length / produtos_por_pagina);

    // pega só a fatia dos produtos da página atual do array
    const inicio = (pagina_atual - 1) * produtos_por_pagina;
    const fim = inicio + produtos_por_pagina;
    const produtos_da_pagina = dados_ordenados.slice(inicio, fim);

    return (
        <div>
        <table>
            <Ordination 
                titulos={[...titulos, ...(onDelete ? ['Ações'] : [])]} 
                itens={itens} 
                coluna_ordenacao={coluna_ordenacao} 
                ordem_crescente={ordem_crescente} 
                handleOrdenacao={handleOrdenacao}
            />
            <tbody>
            {produtos_da_pagina.map(p => (
                <tr key={p[itens[0]]}>
                {itens.map(item => (
                    <td key={item}>{p[item]}</td>
                ))}
                {onDelete && (
                    <td>
                        <Deleter 
                            id={p[itens[0]]} 
                            onConfirm={handleDelete}
                        />
                    </td>
                )}
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