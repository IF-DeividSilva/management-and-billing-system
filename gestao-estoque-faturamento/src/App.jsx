import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'


import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Cadastrar_produtos from './pages/Cadastrar_produtos';
import Faturamento from './pages/Faturamento';
import Produtos_cadastrados from './pages/Produtos_cadastrados';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Routes>
        <Route path="/" element={<Produtos_cadastrados />} />
        <Route path="/cadastro" element={<Cadastrar_produtos />} />
        <Route path="/contato" element={<Faturamento />} />
      </Routes>
    <Navbar />
    <div>
        <h2>...</h2>
      </div>
      <Footer />
    </>
  );
}

export default App
