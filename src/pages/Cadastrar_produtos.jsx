import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Produtos_contexto } from "../context/Produtos_contexto";
import { Grupos_contexto } from "../context/Grupos_contexto";
import { toast } from "react-toastify";


function Cadastrar_produtos() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Criar_produto, Atualizar_produto } = useContext(Produtos_contexto);
  const { grupos } = useContext(Grupos_contexto);
  
  
  // se veio um produto pela rota, é edição. senão, é cadastro novo
  const produto_editando = location.state?.produto || null;
  const eh_edicao = produto_editando !== null;
  
  const [nome, set_nome]               = useState(produto_editando?.nome             ?? "");
  const [idGrupo, set_idGrupo]         = useState(produto_editando?.idGrupo          ?? "");
  const [preco, set_preco]             = useState(produto_editando?.precoVenda        ?? "");
  const [estoque, set_estoque]         = useState(produto_editando?.quantidadeEstoque ?? "");
  const [erros, set_erros] = useState({});

  const limpar_form = () => {
    set_nome("");
    set_idGrupo("");
    set_preco("");
    set_estoque("");
    set_erros({});
  };

  const validar = () => {
    const novos_erros = {};

    if (!nome.trim() || /^\d+$/.test(nome)){
      novos_erros.nome   = true;
      toast.error("Nome inválido — não pode ser vazio ou só números.");
    }          
    if (!idGrupo){    
      novos_erros.idGrupo = true;
      toast.error("Selecione um grupo.");
    }
    if (!preco || preco < 0){   
      novos_erros.preco  = true;
      toast.error("Preço não pode ser vazio ou menor que zero.");
    }
      if (!estoque || estoque <= 0) { 
        novos_erros.estoque = true;
        toast.error("Estoque não pode ser vazio ou negativo.");
      }

    set_erros(novos_erros); 

    return Object.keys(novos_erros).length === 0; // true se não tiver erros
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    const payload = {
      nome,
      idGrupo: Number(idGrupo),
      precoVenda: Number(preco),
      quantidadeEstoque: Number(estoque)
    };

    if (eh_edicao) {
      // PUT
      Atualizar_produto(produto_editando.id, payload)
        .then(result => {
          if (result.successo) {
            toast.success("Produto atualizado!");
            limpar_form();
          } else {
            toast.error( result.erro);
          }
        });
    } else {
      // POST
      Criar_produto(payload)
        .then(result => {
          if (result.successo) {
            toast.success("Produto cadastrado!");
            limpar_form();
          } else {
            toast.error(result.erro);
          }
        });
    }
  };

  return (
    <div>
      <h1>{eh_edicao ? "Editar Produto" : "Cadastrar Produto"}</h1>


      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => set_nome(e.target.value)}
          style={{ border: erros.nome ? "2px solid red" : "" }}
          
        />
        <select
          value={idGrupo}
          onChange={(e) => set_idGrupo(e.target.value)}
          >

            <option value="">Selecione um grupo...</option>
            {grupos.map(g => (
              <option key={g.id} value={g.id}>  
                {g.nome}                        
              </option>
  ))}
        </select>
        <input
          placeholder="Preço"
          value={preco}
          onChange={(e) => set_preco(e.target.value)}
          style={{ border: erros.preco ? "2px solid red" : "" }}
          type="number"
          
        />
        <input
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => set_estoque(e.target.value)}
          style={{ border: erros.estoque ? "2px solid red" : "" }}
          type="number"
          
        />
        <button type="submit">
          {eh_edicao ? "Salvar alterações" : "Cadastrar"}
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default Cadastrar_produtos;