// retorna o cabeçalho da tabela com os títulos e setas de ordenação
// titulos: array de títulos das colunas passados pelo componente pai
// handlerOrdenaçao pra ficar alternando a ordenação cresc/decresc e mudar a coluna
// coluna_ordenacao e ordem_crescente pra mostrar icon pra cima ou pra baixo
function Ordination({ titulos, itens, coluna_ordenacao, ordem_crescente, handleOrdenacao }) {
    return (
        <thead>
            <tr>
                {titulos.map((titulo, index) => (
                    <th 
                        key={titulo} 
                        onClick={() => handleOrdenacao(index)} 
                        style={{cursor: index < itens.length ? 'pointer' : 'default'}}
                    >
                        {titulo}
                        {coluna_ordenacao === index && (
                            <span>{ordem_crescente ? ' ▲' : ' ▼'}</span>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default Ordination;
