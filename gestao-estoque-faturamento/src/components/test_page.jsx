import { useContext } from "react";
import { Produtos_contexto } from "../context/Produtos_contexto";

export function Teste() {
  const { produtos_cadastrados, carregando, erro } = useContext(Produtos_contexto);

  if (carregando) return <p>Carregando...</p>;
  if (erro)   return <p>Erro: {erro}</p>;

  return (
    <ul>
      {produtos_cadastrados.map(p => (
        <li key={p.id}>{p.nome}</li>
      ))}
      {}
    </ul>
  );
}