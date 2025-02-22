// Quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Pegue todos os produtos com a classe "produto"
    const produtos = document.querySelectorAll('.produto img');
    // Pegue o modal e o conteúdo da imagem ampliada
    const modal = document.getElementById('modal');
    const imagemAmpliada = document.getElementById('imagem-ampliada');
    const fecharModal = document.querySelector('.fechar');

    // Adicionar evento de clique em cada imagem de produto
    produtos.forEach(function(produto) {
        produto.addEventListener('click', function() {
            // Define a imagem ampliada com o src da imagem clicada
            imagemAmpliada.src = produto.src;
            // Exibe o modal
            modal.style.display = 'block';
        });
    });

    // Fechar o modal quando clicar no "X"
    fecharModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fechar o modal se clicar fora da imagem ampliada
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
