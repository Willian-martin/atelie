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

document.getElementById('chat-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura a mensagem do usuário
    const userInput = document.getElementById('user-input').value;

    // Exibe a mensagem no chat
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p><strong>Você:</strong> ${userInput}</p>`;

    // Envia a mensagem para o e-mail (via backend)
    enviarEmail(userInput);

    // Limpa o campo de entrada
    document.getElementById('user-input').value = '';
});

function enviarEmail(mensagem) {
    // Aqui você pode integrar com um serviço de backend para enviar a mensagem por e-mail
    // Exemplo usando Fetch API para enviar dados para um backend
    fetch('https://seu-backend.com/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'seu-email@exemplo.com', // E-mail de destino
            mensagem: mensagem, // Mensagem do usuário
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Mensagem enviada com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar mensagem:', error);
    });
}

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use o serviço de e-mail que preferir
    auth: {
        user: 'seu-email@gmail.com', // Seu e-mail
        pass: 'sua-senha', // Sua senha
    },
});

app.post('/enviar-email', (req, res) => {
    const { email, mensagem } = req.body;

    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: email,
        subject: 'Nova mensagem do chat',
        text: mensagem,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('E-mail enviado: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});