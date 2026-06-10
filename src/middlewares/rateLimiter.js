import rateLimit from 'express-rate-limit';

// Configuração do limitador para o login
export const limitadorLogin = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limita cada IP a 5 tentativas por janela
    message: { error: "Muitas tentativas de login. Tente novamente em 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
});