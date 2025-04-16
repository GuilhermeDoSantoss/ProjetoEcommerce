// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: 'Notebook Pro X',
        preco: 4999.00,
        imagem: 'assets/images/notebook.jpg',
        descricao: 'Intel Core i7, 16GB RAM, SSD 512GB'
    },
    {
        id: 2,
        nome: 'Smartphone Galaxy Ultra',
        preco: 3499.00,
        imagem: 'assets/images/smartphone.jpg',
        descricao: '128GB, 8GB RAM, Câmera 108MP'
    },
    {
        id: 3,
        nome: 'Smartwatch Fit Pro',
        preco: 899.00,
        imagem: 'assets/images/smartwatch.jpg',
        descricao: 'Monitor Cardíaco, GPS, À prova d\'água'
    },
    {
        id: 4,
        nome: 'Headphone Bluetooth Pro',
        preco: 599.00,
        imagem: 'assets/images/headphone.jpg',
        descricao: 'Cancelamento de Ruído, 30h Bateria'
    },
    {
        id: 5,
        nome: 'Tablet Pro 11',
        preco: 2799.00,
        imagem: 'assets/images/tablet.jpg',
        descricao: '256GB, Tela 11", Suporte a Caneta'
    },
    {
        id: 6,
        nome: 'Câmera DSLR Pro',
        preco: 3299.00,
        imagem: 'assets/images/camera.jpg',
        descricao: '24MP, 4K Video, Wi-Fi'
    }
];

// Estado do carrinho
let carrinho = [];

// Funções do carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const itemNoCarrinho = carrinho.find(item => item.id === produtoId);
    
    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
    mostrarNotificacao('Produto removido do carrinho!');
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function atualizarCarrinho() {
    const carrinhoElement = document.querySelector('.card-body');
    if (!carrinhoElement) return;

    if (carrinho.length === 0) {
        carrinhoElement.innerHTML = '<div class="text-center"><p>Seu carrinho está vazio</p></div>';
    } else {
        let html = '';
        carrinho.forEach(item => {
            html += `
                <div class="carrinho-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">${item.nome}</h6>
                            <small class="text-muted">Qtd: ${item.quantidade}</small>
                        </div>
                        <div class="text-end">
                            <p class="mb-0">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
                            <button class="btn btn-sm btn-danger" onclick="removerDoCarrinho(${item.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
            <hr>
            <div class="d-flex justify-content-between">
                <h6>Total:</h6>
                <h6>R$ ${calcularTotal().toFixed(2)}</h6>
            </div>
            <button class="btn btn-success w-100 mt-3" onclick="finalizarCompra()">
                Finalizar Compra
            </button>
        `;

        carrinhoElement.innerHTML = html;
    }

    // Atualizar o estado do botão de finalizar compra
    const btnFinalizarCompra = document.querySelector('.btn-success');
    if (btnFinalizarCompra) {
        btnFinalizarCompra.disabled = carrinho.length === 0;
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Adicione itens ao carrinho primeiro!', 'error');
        return;
    }

    // Mostrar modal de pagamento
    const modalHtml = `
        <div class="modal fade" id="paymentModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Escolha a forma de pagamento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Forma de Pagamento</label>
                            <select class="form-select" id="paymentMethod">
                                <option value="PIX">PIX</option>
                                <option value="DEBIT_CARD">Cartão de Débito</option>
                                <option value="CREDIT_CARD">Cartão de Crédito</option>
                            </select>
                        </div>
                        
                        <!-- Campos PIX -->
                        <div id="pixFields" class="payment-fields">
                            <div class="mb-3">
                                <label class="form-label">Chave PIX</label>
                                <input type="text" class="form-control" id="pixKey" placeholder="Digite sua chave PIX">
                            </div>
                        </div>
                        
                        <!-- Campos Cartão -->
                        <div id="cardFields" class="payment-fields" style="display: none;">
                            <div class="mb-3">
                                <label class="form-label">Número do Cartão</label>
                                <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nome no Cartão</label>
                                <input type="text" class="form-control" id="cardHolderName" placeholder="Nome como está no cartão">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Data de Validade</label>
                                        <input type="text" class="form-control" id="cardExpiryDate" placeholder="MM/AA">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">CVV</label>
                                        <input type="text" class="form-control" id="cardCvv" placeholder="123">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="processarPagamento()">Pagar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Inicializar modal
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    paymentModal.show();

    // Event listener para mudança no método de pagamento
    document.getElementById('paymentMethod').addEventListener('change', function() {
        const method = this.value;
        document.getElementById('pixFields').style.display = method === 'PIX' ? 'block' : 'none';
        document.getElementById('cardFields').style.display = method !== 'PIX' ? 'block' : 'none';
    });
}

function processarPagamento() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const amount = calcularTotal();
    
    const paymentData = {
        amount: amount,
        paymentMethod: paymentMethod
    };

    if (paymentMethod === 'PIX') {
        paymentData.pixKey = document.getElementById('pixKey').value;
    } else {
        paymentData.cardNumber = document.getElementById('cardNumber').value;
        paymentData.cardHolderName = document.getElementById('cardHolderName').value;
        paymentData.cardExpiryDate = document.getElementById('cardExpiryDate').value;
        paymentData.cardCvv = document.getElementById('cardCvv').value;
    }

    // Enviar dados para o backend
    fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'APPROVED') {
            mostrarNotificacao('Pagamento aprovado! Compra finalizada com sucesso!', 'success');
            carrinho = [];
            atualizarCarrinho();
            bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
        } else {
            mostrarNotificacao('Erro no pagamento. Tente novamente.', 'error');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        mostrarNotificacao('Erro ao processar pagamento. Tente novamente.', 'error');
    });
}

function mostrarNotificacao(mensagem, tipo = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.textContent = mensagem;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar listeners aos botões de "Adicionar ao Carrinho"
    document.querySelectorAll('.btn-primary').forEach((btn, index) => {
        btn.addEventListener('click', () => adicionarAoCarrinho(produtos[index].id));
    });

    // Inicializar o carrinho
    atualizarCarrinho();
}); 