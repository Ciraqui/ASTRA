// public/js/auth.js

// Função para obter o token atual
function getAuthToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        throw new Error('Token não encontrado');
    }
    return token;
}

// Função para verificar o status de autenticação
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        // Usuário está logado
        document.getElementById('loginNav').classList.add('d-none');
        document.getElementById('dashboardNav').classList.remove('d-none');
        document.getElementById('logoutNav').classList.remove('d-none');
    } else {
        // Usuário não está logado
        document.getElementById('loginNav').classList.remove('d-none');
        document.getElementById('dashboardNav').classList.add('d-none');
        document.getElementById('logoutNav').classList.add('d-none');
    }
}

// Função para fazer login
async function login(email, senha) {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login');
        }

        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard.html';
    } catch (error) {
        console.error('Erro durante login:', error);
        throw error;
    }
}

// Função para fazer logout
async function logout() {
    console.log('Iniciando logout...'); // Log para debug
    try {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token encontrado, chamando API de logout...'); // Log para debug
            // Chama a API de logout para incluir o token na blacklist
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error('Erro ao fazer logout no servidor:', await response.text());
            } else {
                console.log('Logout no servidor bem-sucedido'); // Log para debug
            }
        }
    } catch (error) {
        console.error('Erro durante logout:', error);
    } finally {
        console.log('Removendo token do localStorage...'); // Log para debug
        localStorage.removeItem('token');
        console.log('Redirecionando para página de login...'); // Log para debug
        window.location.href = '/login.html';
    }
}

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Verifica se o token não está expirado
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
    } catch (error) {
        return false;
    }
}

// Função para redirecionar usuários não autenticados
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

// Função para fazer requisições autenticadas
async function authFetch(url, options = {}) {
    const token = getAuthToken();
    const defaultOptions = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    };

    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };

    try {
        const response = await fetch(url, finalOptions);
        
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
            throw new Error('Sessão expirada');
        }

        return response;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

// Executar verificação de autenticação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se está em uma página que requer autenticação
    const publicPages = ['/', '/index.html', '/login.html', '/cadastro.html'];
    const currentPath = window.location.pathname;

    if (!publicPages.includes(currentPath)) {
        requireAuth();
    }

    checkAuthStatus();
});

// Exporta as funções para uso em outros arquivos
window.login = login;
window.logout = logout;
window.isAuthenticated = isAuthenticated;
window.requireAuth = requireAuth;
window.authFetch = authFetch;
window.getAuthToken = getAuthToken;