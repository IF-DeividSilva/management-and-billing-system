// footer da página com informações do desenvolvedor
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-1">© 2026 Sistema de Gestão e Faturamento</p>

      <div className="d-flex justify-content-center gap-3 mb-1">
        <a href="https://github.com/IF-DeividSilva" className="text-white text-decoration-none">GitHub</a>
        <a href="https://www.linkedin.com/in/deividgalvao/" className="text-white text-decoration-none">LinkedIn</a>
      </div>

      <p className="mb-0 text-secondary">Email: deivid.2002@alunos.utfpr.edu.br</p>
    </footer>
  );
}

export default Footer;