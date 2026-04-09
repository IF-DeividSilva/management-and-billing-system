import { useState } from 'react';
import { toast } from "react-toastify";

// funcao deletar
// recebe id do item, confirmacao e cancelamento
// estados pra controlar a confirmação e delete
// click em deletar ativa confirmação
// caso confirmado, chama função de confirmação passando o id
// fala com o pai chamar api e fazer req delete passandoo o id e atualiza a lista local

function Deleter({ id, confirmacao, cancelamento }) {
    const [confirmando, set_confirmando] = useState(false);
    const [deletando, set_deletando] = useState(false);

    const handleConfirm = async () => {
        set_deletando(true);
        try {
            await confirmacao(id);
            set_confirmando(false);
            toast.success("Item deletado com sucesso!");
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
            toast.error("Erro ao deletar item.");
        } finally {
            set_deletando(false);
        }
    };
    return (
        <>

            {confirmando ? (
                <div className="deleter-modal">
                    <div className="deleter-content">
                        <h3>Confirmar Exclusão</h3>
                        <p>Tem certeza que deseja deletar este item?</p>
                        <div className="d-flex align-items-center gap-2">
                            <button type="button" className="btn btn-outline-danger" aria-label="Confirmar exclusão do item"
                                onClick={handleConfirm}
                                disabled={deletando}
                            >
                                {deletando ? 'Deletando...' : 'Deletar'}
                            </button>
                            <button type="button" className="btn btn-outline-secondary"
                                onClick={() => {
                                    set_confirmando(false);
                                    if (cancelamento) cancelamento();
                                }}
                                disabled={deletando}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button type="button" className="btn btn-outline-danger me-2"
                    onClick={() => set_confirmando(true)}
                >
                    Deletar
                </button>
            )}
        </>
    );
}

export default Deleter;