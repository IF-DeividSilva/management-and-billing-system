
import { useState } from 'react';


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
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
        } finally {
            set_deletando(false);
        }
    };

    if (confirmando) {
        return (
            <div className="deleter-modal">
                <div className="deleter-content">
                    <h3>Confirmar Exclusão</h3>
                    <p>Tem certeza que deseja deletar este item?</p>
                    <div className="deleter-buttons">
                        <button 
                            onClick={handleConfirm} 
                            disabled={deletando}
                            className="deleter-btn-delete"
                        >
                            {deletando ? 'Deletando...' : 'Deletar'}
                        </button>
                        <button 
                            onClick={() => {
                                set_confirmando(false);
                                if (cancelamento) cancelamento();
                            }}
                            disabled={deletando}
                            className="deleter-btn-cancel"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button 
            onClick={() => set_confirmando(true)}
            className="deleter-btn"
        >
            Deletar
        </button>
    );
}

export default Deleter;