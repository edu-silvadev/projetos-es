import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// O Model gerencia os DADOS
export const buscarPorEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const criarUsuario = async (nome, email, senhaHash) => {
    return await prisma.user.create({
        data: { nome, email, senha: senhaHash }
    });
};

export const listarTodos = async () => {
    return await prisma.user.findMany({
        select: { id: true, nome: true, email: true }
    });
};