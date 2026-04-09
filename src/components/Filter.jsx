// recebe o valor atual do filtro e a função onChange
// chama o onChange com o valor digitado a cada tecla
function Filtro({ filtro, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={filtro}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Filtro;