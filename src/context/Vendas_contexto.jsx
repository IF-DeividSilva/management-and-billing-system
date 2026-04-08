import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";

// inicializa com null
export const Vendas_contexto = createContext(null);

export function Vendas_provider({ children }) {
  const [vendas, set_vendas]     = useState([]);
  const [carregando, set_carregando] = useState(false);
  const [erro, set_erro]     = useState(null);

  // chama o fetch quando o component é montado
  // ativa o "carregando..."
  // limpa os eventuais erros anteriores (só pra manter boas práticas...)
  // faz o GET na api (endpoint  /vendas) e salva
  // catch caso erro
  // desativa o "carregando" 
  useEffect(() => {
    set_carregando(true);
    set_erro(null);
    api.get("/vendas")
      .then(data => {
        set_vendas(data);
        set_carregando(false);
      })
      .catch(e => {
        set_erro(e.message);
        set_carregando(false);
      });
  }, []);

  //  para ser acessado por todos os componentes filhos....
  return (
    <Vendas_contexto.Provider value={{ vendas, carregando, erro }}>
      {children}
    </Vendas_contexto.Provider>
  );
}