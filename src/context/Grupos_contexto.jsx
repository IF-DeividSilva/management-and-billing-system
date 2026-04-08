import { createContext, useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

// inicializa com null
export const Grupos_contexto = createContext(null);

export function Grupos_provider({ children }) {
    // cria 3 estados para lista de grupos, carregamento e erro  
    const [grupos, set_grupos] = useState([]);
    const [carregando, set_carregando]   = useState(false);
    const [erro, set_erro]       = useState(null);

    
    // chama o fetch quando o component é montado
    // ativa o "carregando..."
    // limpa os eventuais erros anteriores (só pra manter boas práticas...)
    // faz o GET na api (endpoint  /grupos) e salva
    // catch caso erro
    // destiva o "carregando" 
    useEffect(() => {
        set_carregando(true);
        set_erro(null);
        api.get("/grupos")
            .then(data => {
            set_grupos(data);
            set_carregando(false);
        })
        .catch(e => {
            set_erro(e.message);
            set_carregando(false);
        });
    }, []);

  //  para ser acessado por todos os componentes filhos....
  return (
    <Grupos_contexto.Provider value={{ grupos, carregando, erro }}>
      {children}
    </Grupos_contexto.Provider>
  );
}