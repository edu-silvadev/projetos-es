function toggleAuthModal() {
    const modal = document.getElementById('auth-modal');
    
    if (modal) {
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    } else {
        console.error("ERRO: O elemento 'auth-modal' não existe nesta página HTML!");
    }
}

function switchForm(type) {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (type === 'login') {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function exibirMensagemModal(texto, tipo) {
    const msgElement = document.getElementById('auth-message');
    if (!msgElement) return;

    msgElement.innerText = texto;
    
    // Limpa as classes anteriores
    msgElement.className = "auth-message"; 
    
    if (tipo === 'erro') msgElement.classList.add('msg-erro');
    if (tipo === 'sucesso') msgElement.classList.add('msg-sucesso');

    if (tipo === 'sucesso') {
        setTimeout(() => {
            msgElement.style.display = 'none';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            // Abre e fecha a barra lateral 
            nav.classList.toggle('nav-active');
            // Adiciona/remove a classe 'activo' do botão para alternar os ícones
            mobileMenuBtn.classList.toggle('activo');
        });
    }
});

// O async é utilizado para permitir o uso de await dentro da função.
// O código assíncrono é necessário para lidar com a resposta do servidor sem bloquear a UI;
async function cadastrarUsuario() {
    const nome = document.getElementById('reg-nome').value;
    const email = document.getElementById('reg-email').value;
    const senha = document.getElementById('reg-senha').value;

    console.log("Tentando cadastrar:", { nome, email, senha });

    if (!nome || !email || !senha) {
        exibirMensagemModal("Por favor, preencha todos os campos!", "erro");
        return;
    }
    // Envia os dados para o backend usando fetch. 
    // Await é usado para esperar a resposta do servidor antes de continuar.
    // Try/catch é usado para lidar com erros de rede ou se o servidor estiver desligado.
    try {
        const resposta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();
        
        if (resposta.ok) {
            exibirMensagemModal("Usuário cadastrado com sucesso!", "sucesso"); 
            console.log("Sucesso do servidor:", dados);
            toggleAuthModal(); // Fecha o modal
        } else {
            console.error("Erro do servidor:", dados);
            exibirMensagemModal("Erro ao cadastrar: " + (dados.error || "Tente novamente"), "erro");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        exibirMensagemModal("O servidor está desligado ou houve um erro de rede.", "erro");
    }
}
// Aysc garante que o frontend espere pela resposta do servidor antes de continuar.
const loginIcon = document.getElementById('login-icon');
const userDropdown = document.getElementById('user-dropdown');
const userGreeting = document.getElementById('user-greeting');
const btnLogout = document.getElementById('btn-logout');

function atualizarInterfaceUsuario(logado, nome = "") {
    if (logado) {
        if (loginIcon) loginIcon.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'inline-block';
        if (userGreeting) userGreeting.innerHTML = `Olá, ${nome} ▼`;
    } else {
        if (loginIcon) loginIcon.style.display = 'inline-block';
        if (userDropdown) userDropdown.style.display = 'none';
    }
}

async function logarUsuario(event) {
    // Evita que a página recarregue 
    if (event) event.preventDefault(); 

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    console.log("Tentando logar:", { email });

    if (!email || !senha) {
        exibirMensagemModal("Preencha email e senha!", "erro");
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            const nomeUsuario = dados.user.nome || dados.user.name || "Usuário";

            localStorage.setItem('usuarioLogado', nomeUsuario);

            atualizarInterfaceUsuario(true, nomeUsuario);

            toggleAuthModal(); // Fecha o formulário/modal de login
        } else {
            exibirMensagemModal("Falha no login: " + (dados.error || "Credenciais inválidas"), "erro");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        exibirMensagemModal("Erro ao conectar com o servidor.", "erro");
    }
}

// VERIFICAÇÃO AO CARREGAR A PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');

    if (usuarioSalvo) {
        atualizarInterfaceUsuario(true, usuarioSalvo); 
    } else {
        atualizarInterfaceUsuario(false); 
    }
});

if (btnLogout) {
    btnLogout.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('usuarioLogado'); 
        localStorage.removeItem('token'); 
        atualizarInterfaceUsuario(false);
        window.location.href = "index.html"; 
    });
}

if (userDropdown) {
    userDropdown.addEventListener('click', (event) => {
        event.stopPropagation();
        userDropdown.classList.toggle('active');
    });
}

window.addEventListener('click', () => {
    if (userDropdown) {
        userDropdown.classList.remove('active');
    }
});