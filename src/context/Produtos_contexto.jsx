import { createContext, useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

// inicializa com null
export const Produtos_contexto = createContext(null);


export function Produtos_provider({ children }) {
   // cria 3 estados para lista de produtos, carregamento e erro  
  const [produtos_cadastrados, set_produtos] = useState([]);
  const [carregando, set_carregando]   = useState(false);
  const [erro, set_erro]       = useState(null);

  // Função para o GEt
  // ativa o "carregando..."
  // limpa os eventuais erro anterior
  // faz o GET na api (endpoint  /produtos_cadastrados) e salva
  // catch caso erro
  // destiva o "carregando" (caso erro ou caso sucesso) 
  const Fetch_produtos = useCallback(async () => {
    set_carregando(true);
    set_erro(null);
    api.get("/produtos_cadastrados")
      .then(data =>{
        set_produtos(data);
        set_carregando(false);
      })
     .catch (e => {
       set_erro(e.message);
       set_carregando(false);
     }); 
  }, []);
  
  // chama o fetch quando o component é montado
  useEffect(() => { Fetch_produtos(); }, [Fetch_produtos]);

  // Funçao POST
  // recebe dados do novo produto e envia para o servidor
  // e retorna sucesso ou erro para o componete
  const Criar_produto = (novo_produto) => {
    return api.post("/produtos_cadastrados", novo_produto)
      .then(novo => {
        set_produtos((prev) => [...prev, novo]);
        return { successo: true, data: novo };
      })
      .catch(e => {
        return { successo: false, erro: e.message };
      });
  };

  // Funcao PUT 
  // recebe o id e o dados novos e manda para o server
  // busca pelo id do produto e altera o correspondente...
  // e retorna sucesso ou erro para o componete
  const Atualizar_produto = (id, dados_novos) => {
    return api.put(`/produtos_cadastrados/${id}`, dados_novos)
      .then(atualizar => {
        set_produtos((prev) =>
          prev.map((p) => (p.id === id ? atualizar : p))
        );
        return { successo: true, data: atualizar };
      })
      .catch(e => {
        return { successo: false, erro: e.message };
      });
  };

  // Funçao DELETE
  // recebe um id, manda para o server
  // busca pelo id do produto e deleta o correspondente (com o filter (no caso mantem tods menos o id))...
  // e retorna sucesso ou erro para o componete
  const Deletar_produto = (id) => {
    return api.delete(`/produtos_cadastrados/${id}`)
      .then(() => {
        set_produtos((prev) => prev.filter((p) => p.id !== id));
        return { successo: true };
      })
      .catch(e => {
        return { successo: false, erro: e.message };
      });
  };

  //  para ser acessado por todos os componentes filhos....
  return (
    <Produtos_contexto.Provider value={{
      produtos_cadastrados,
      carregando,
      erro,
      Fetch_produtos,
      Criar_produto,
      Atualizar_produto,
      Deletar_produto,
    }}>
      {children}
    </Produtos_contexto.Provider>
  );
}