import { Link } from 'react-router-dom'

// navbar da página com links para as 3 páginas
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">

        <span className="navbar-brand">
          Sistema de Gestão e Faturamento
        </span>

        {/* botão hamburguer para telas pequenas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* links de navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Produtos Cadastrados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro">Cadastrar Produtos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faturamento">Faturamento</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;