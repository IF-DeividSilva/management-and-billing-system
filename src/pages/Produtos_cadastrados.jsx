import { useContext } from "react";
import { Produtos_contexto } from "../context/Produtos_contexto";
import  Dynamic_table  from "../components/Dynamic_table";
import { api } from "../services/api";
import { Grupos_contexto } from "../context/Grupos_contexto";
import { useNavigate } from "react-router-dom";


function Produtos_cadastrados(){
    // puxa os dados do contexto (os de produtos e dos grupso)
    const { produtos_cadastrados, carregando, erro } = useContext(Produtos_contexto);
    const { grupos, carregando: carregando_grupos } = useContext(Grupos_contexto);
    const navigate = useNavigate();
    
    // verifica se os dados estão sendo carregados ou se ocorreu um erro
    if (carregando || carregando_grupos){
        return <p>Carregando...</p>;
    } 
    if (erro) {  
        return <p>Erro: {erro}</p>;
    }
    // só debug...
    //console.log(produtos_cadastrados[0])

    // retorna a tabela dinâmica com produtos cadastrados
    // edit com rota para /cadastro passando os dados do produto
    // delete chamando a api e passando o id
    // dá erro no serve caso add um novo e delete-o (404)...
    return (
        <Dynamic_table data={produtos_cadastrados}  
            titulos={["ID", "Produto", "Grupo", "Preço", "Estoque"]} 
            itens = {["id", "nome", "idGrupo", "precoVenda", "quantidadeEstoque"]} 
            grupos={grupos}
            campos_filtro={["nome", "idGrupo"]}
            place_holder="Buscar por nome ou grupo..."
            onEdit={(produto) => navigate("/cadastro", { state: { produto } })}
            onDelete={async (id) => {
                await api.delete(`/produtos_cadastrados/${id}`);
    
  }}/>
    );
}
export default Produtos_cadastrados;
