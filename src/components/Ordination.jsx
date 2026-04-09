// retorna o cabeçalho da tabela com os títulos e setas de ordenação
// titulos: array de títulos das colunas passados pelo componente pai
// handleOrdenacao pra ficar alternando a ordenação cresc/decresc e mudar a coluna
// coluna_ordenacao e ordem_crescente pra mostrar icon pra cima ou pra baixo
function Ordination({ titulos, itens, coluna_ordenacao, ordem_crescente, Handle_ordenacao }) {
    return (
        <thead className="table-dark">
            <tr>
                {titulos.map((titulo, index) => (
                    <th
                        key={titulo}
                        onClick={() => Handle_ordenacao(index)}
                        style={{ cursor: index < itens.length ? 'pointer' : 'default' }}
                    >
                        {titulo}
                        {coluna_ordenacao === index && (
                            <i className={ordem_crescente ? 'bi bi-arrow-up' : 'bi bi-arrow-down'}></i>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default Ordination;