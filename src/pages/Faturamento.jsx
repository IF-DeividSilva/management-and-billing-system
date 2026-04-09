import { useContext } from "react";
import { Vendas_contexto } from "../context/Vendas_contexto";
import  Dynamic_table  from "../components/Dynamic_table";

function Faturamento (){
    // puxa os dados do contexto
    const { vendas, carregando, erro } = useContext(Vendas_contexto);
    
    // verifica se os dados estão sendo carregados ou se ocorreu um erro
    if (carregando){
        return <p>Carregando...</p>;
    } 
    if (erro) {  
        return <p>Erro: {erro}</p>;
    }
    
    // só debug...
    //console.log(vendas[0])

    // retorna a tabela dinâmica com vendas
    // e o filtro para o imput especificado
    return(
        <Dynamic_table data={vendas}  
            titulos={["ID", "Data", "Total de Itens", "Valor Total", "Itens"]} 
            itens = {["idPedido", "data", "totalItensPedido", "valorTotalPedido", "itens"]} 
            campos_filtro={["idPedido"]}
        />
    );
    
}

export default Faturamento;
