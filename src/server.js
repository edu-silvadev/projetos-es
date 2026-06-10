// winget install OpenJS.NodeJS  -> instala o Node.js no Windows
// node --version -> verifica se o Node está instalado corretamente
// npm init -y -> cria o package.json automático no projeto
// Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force -> permite executar scripts PowerShell como npm.ps1
// npm --version -> verifica se o npm está disponível após a instalação

import fs from 'fs';
console.log("Arquivos na pasta atual:", fs.readdirSync('.'));
console.log("Arquivos na pasta routes:", fs.readdirSync('./routes'));
import express from 'express' // Framework para criar o servidor e as rotas
import cors from 'cors' // Para conectar o front e back
import userRoutes from './routes/userRoutes.js';

const app = express()

app.use(cors({
    origin: 'http://127.0.0.1:5500', // A URL EXATA DO FRONTEND (Live Server)
    credentials: true // Permitir o intercâmbio de cookies entre front e back
}));
app.use(express.json())

// Rotas
app.use(userRoutes)

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))