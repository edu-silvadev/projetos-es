import express from 'express';
import * as userController from '../controllers/userController.js';
import { limitadorLogin } from '../middlewares/rateLimiter.js'; 

const router = express.Router();

router.post('/usuarios', userController.criar);
router.post('/login', limitadorLogin, userController.login);
router.get('/usuarios', userController.listar);

export default router; // Rota de Cadastro