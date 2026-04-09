// recebe o valor atual do filtro e a função onChange
// chama o onChange com o valor digitado a cada tecla
function Filtro({ filtro, onChange, place_holder }) {
  return (
    <input className="form-control mb-3"
      type="text"
      placeholder={place_holder}
      value={filtro}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Filtro;