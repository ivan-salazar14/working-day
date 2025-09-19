import { Router } from 'express';
import { businessDateController } from '../../container';

export const businessDateRouter = Router();

businessDateRouter.get('/calculate', (req, res) => businessDateController.calculate(req, res));