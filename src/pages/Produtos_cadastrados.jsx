import { useContext } from "react";
import { Produtos_contexto } from "../context/Produtos_contexto";
import  Dynamic_table  from "../components/Dynamic_table";
import { api } from "../services/api";

function Produtos_cadastrados(){
    // puxa os dados do contexto
    const { produtos_cadastrados, carregando, erro } = useContext(Produtos_contexto);

    // verifica se os dados estão sendo carregados ou se ocorreu um erro
    if (carregando){
        return <p>Carregando...</p>;
    } 
    if (erro) {  
        return <p>Erro: {erro}</p>;
    }
    // só debug...
    //console.log(produtos_cadastrados[0])

    // retorna a tabela dinâmica com produtos cadastrados
    return (
        <Dynamic_table data={produtos_cadastrados}  titulos={["ID", "Produto", "ID Grupo", "Preço", "Estoque"]} itens = {["id", "nome", "idGrupo", "precoVenda", "quantidadeEstoque"]} onDelete={async (id) => {
    await api.delete(`/produtos_cadastrados/${id}`);
    
  }}/>
    );
}
export default Produtos_cadastrados;
