import { useContext } from "react";
import { Produtos_contexto } from "../context/Produtos_contexto";
import  Dynamic_table  from "../components/Dynamic_table";

function Produtos_cadastrados(){
    const { produtos_cadastrados, carregando, erro } = useContext(Produtos_contexto);

    if (carregando) return <p>Carregando...</p>;
    if (erro)   return <p>Erro: {erro}</p>;
    
    console.log(produtos_cadastrados[0])
  //  const titulos = ["ID", "Produto", "ID Grupo", "Preço", "Quantidade em Estoque"]

    return (
        <Dynamic_table data={produtos_cadastrados}  />
    );
}
export default Produtos_cadastrados;
