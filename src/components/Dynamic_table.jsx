import { useState } from "react";
import Ordination from "./Ordination";
import Deleter from "./Deleter";
import Filter from "./Filter";

function Dynamic_table({ data, titulos, itens, grupos, onDelete, campos_filtro, onEdit, place_holder }) {
    const [pagina_atual, set_pagina_atual] = useState(1);
    const [coluna_ordenacao, set_coluna_ordenacao] = useState(null);
    const [ordem_crescente, set_ordem_crescente] = useState(true);
    const [dados_locais, set_dados_locais] = useState(data);
    const produtos_por_pagina = 10;
    const [filtro, set_filtro] = useState("");

    // função que troca o idGrupo pelo nome
    // verificacao caso venha um grupo vazio    
    // dentro de grupo busca o id correspondente
    // caso não encontre o default é "Sem Grupo"
    const nome_do_grupo = (idGrupo) => {
    if (!grupos || grupos.length === 0) return idGrupo;
    const grupo = grupos.find(g => g.id === idGrupo);
    return grupo ? grupo.nome : "Sem grupo";
    };

    // chama a função de delete do pai passando o id
    // remove o item da lista local após deletar com sucesso
    // volta para a primeira página
    const Handle_delete = async (id) => {
        try {
            await onDelete(id);
            set_dados_locais(dados_locais.filter(item => item[itens[0]] !== id));
            set_pagina_atual(1); 
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
        }
    };

    // controla a ordenação por coluna
    // se clicar na mesma coluna, inverte a ordem (ASC/DESC)
    // se clicar em outra coluna, ordena crescente
    const Handle_ordenacao = (coluna_index) => {
        if (coluna_ordenacao === coluna_index) {
            set_ordem_crescente(!ordem_crescente);
        } else {
            set_coluna_ordenacao(coluna_index);
            set_ordem_crescente(true);
        }
    };

    // filtra os dados pelos campos definidos em campos_filtro
    // ignora campos que são arrays (ex: itens de um pedido)
    // troca idGrupo pelo nome antes de comparar
    const Dados_filtrados = dados_locais.filter(p => {
        const texto = filtro.toLowerCase();
        return campos_filtro.some(campo => {
            if (Array.isArray(p[campo])) return false;
            const valor = campo === "idGrupo"
            ? nome_do_grupo(p[campo])
            : String(p[campo]);
            return valor.toLowerCase().includes(texto);
        });
    });

    // atualiza e volta para a pagina 1
    const Handle_filtro = (valor) => {
        set_filtro(valor);
        set_pagina_atual(1);
    };
    
    // Ordena os dados
    // verifica se os valores são números para ordenar corretamente
    // caso contrário, usa localeCompare para ordenar strings
    let dados_ordenados = [...Dados_filtrados];
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
        <div className="container-fluid mt-3">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4"> 
                <Filter filtro={filtro} onChange={Handle_filtro} place_holder={place_holder} />
            </div>
            <div className="table-responsive">
                <table  className= "table table-dark table-striped">
                    <Ordination 
                        titulos={[...titulos, ...(onDelete || onEdit ? ['Ações'] : [])]} 
                        itens={itens} 
                        coluna_ordenacao={coluna_ordenacao} 
                        ordem_crescente={ordem_crescente} 
                        Handle_ordenacao={Handle_ordenacao}
                    />
                    <tbody>
                    {produtos_da_pagina.map(p => (
                        <tr key={p[itens[0]]}>
                            {itens.map(item => (
                            <td key={item}>
                                {/* se for array renderiza os itens linha a linha */}
                                {/* se for idGrupo troca pelo nome */}
                                {/* senão exibe o valor normalmente */}
                                {Array.isArray(p[item])
                                ? p[item].map(i => (
                                    <div key={i.idProduto}>
                                        {i.nomeProduto} — Qtd: {i.quantidadeVendida} — R$ {i.valorProduto}
                                    </div>
                                    ))
                                : item === "idGrupo"
                                    ? nome_do_grupo(p[item])
                                    : p[item]
                                }
                            </td>
                            ))}
                        {/* exibe botão editar se a prop onEdit foi passada */}
                        <td>
                            <div className="d-flex align-items-center gap-2">
                                {onEdit && (
                                    <button type="button" className="btn btn-outline-primary" onClick={() => onEdit(p)}>  
                                        Editar
                                    </button>
                                    
                                )}
                                {/* exibe botão deletar se a prop onDelete foi passada */}
                                {onDelete && (
                                
                                        <Deleter 
                                            id={p[itens[0]]} 
                                            confirmacao={Handle_delete}
                                        />
                                )}
                            </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>        
            {/* botões de paginação */}
            {/* array para o total de paginas */}
            {/* desabilita o numero da pagina atual (já que já está nela) */}

            <nav>
            <ul className="pagination justify-content-center mt-3">
                {Array.from({ length: total_paginas }, (_, i) => i + 1).map(numero => (
                <li
                    key={numero}
                    className={`page-item ${numero === pagina_atual ? 'active' : ''}`}
                >
                    <button className="page-link"
                    onClick={() => set_pagina_atual(numero)}
                    >
                    {numero}
                    </button>
                </li>
                ))}
            </ul>
            </nav>
        </div>
    );
}


export default Dynamic_table;