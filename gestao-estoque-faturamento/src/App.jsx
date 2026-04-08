import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import { Produtos_provider } from "./context/Produtos_contexto";
import { Grupos_provider }   from "./context/Grupos_contexto";
import { Vendas_provider }    from "./context/Vendas_contexto";

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Cadastrar_produtos from './pages/Cadastrar_produtos';
import Faturamento from './pages/Faturamento';
import Produtos_cadastrados from './pages/Produtos_cadastrados';
import { Teste }        from "./components/test_page"; 


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* puxa o componente NavBar */}
    <Navbar />
      <Produtos_provider>
        <Grupos_provider>
          <Vendas_provider>

            {/* Config as rotas para a navegação*/}
            <Routes>
              <Route path="/" element={<Produtos_cadastrados />} />
              <Route path="/cadastro" element={<Cadastrar_produtos />} />
              <Route path="/faturamento" element={<Faturamento />} />
            </Routes>
            {/* teste api*/}
            <Teste /> 
                
          </Vendas_provider>
        </Grupos_provider>
      </Produtos_provider>

    {/* puxa o componente Footer */}
    <Footer />
    </>
  );
}

export default App
