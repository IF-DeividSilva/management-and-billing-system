import { toast } from "react-toastify";

// clica no botão, chama a api de delete e exibe toast de sucesso
function Deleter({ id, confirmacao }) {
    const handleDelete = async () => {
        try {
            await confirmacao(id);
            toast.success("Item deletado com sucesso!");
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
            toast.error("Erro ao deletar item.");
        }
    };

    return (
        <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleDelete}
            aria-label="Excluir produto"
        >
            <i className="bi bi-trash" aria-hidden="true"></i>
        </button>
    );
}

export default Deleter;