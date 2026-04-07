import { Link } from 'react-router-dom'
function Navbar(){
    return(
        <nav className="navbar">
            <h1>Sistema de Gerenciamento de Estoque e Faturamento</h1>
            <Link to="/">Produtos Cadastrados</Link>
            <Link to="/cadastro">Cadastrar Produtos</Link>
            <Link to="/faturamento">Faturamento</Link>
        </nav>
    );
}

export default Navbar;
