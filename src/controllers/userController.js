// Controller para lidar com as operações relacionadas aos usuários (cadastro, login, listagem)
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserModel from '../models/userModel.js';

export const criar = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const user = await UserModel.criarUsuario(nome, email, senhaHash);

        const { senha: _, ...userSemSenha } = user;
        res.status(201).json(userSemSenha);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar usuário. Verifique se o e-mail já existe." });
    }
};

export const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await UserModel.buscarPorEmail(email);

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) return res.status(401).json({ error: "Senha inválida" });

        // O primeiro argumento é o ID do usuário
        // O segundo é uma palavra-chave secreta 
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true, // Impede que o JavaScript do front acesse o cookie (Proteção XSS)
            secure: false,  // Deixei 'false' para funcionar no localhost (mudarei para 'true' apenas em produção/HTTPS)
            sameSite: 'lax', // Permite o envio do cookie em requisições do mesmo navegador
            maxAge: 3600000 // Tempo de vida do cookie: 1 hora (em milissegundos)
        });
        
        const { senha: _, ...userSemSenha } = user;
        res.status(200).json({ message: "Login realizado com sucesso!", user: userSemSenha, token });
    } catch (error) {
        res.status(500).json({ error: "Erro no servidor ao tentar logar" });
    }
};

export const listar = async (req, res) => {
    const users = await UserModel.listarTodos();
    res.status(200).json(users);
};