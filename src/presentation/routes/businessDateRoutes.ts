import { Router } from 'express';
import { BusinessDateController } from '../controllers/businessDateController';
import { CalculateBusinessDateUseCase } from '../../application/useCases/calculateBusinessDateUseCase';
import { BusinessDateService } from '../../domain/services/businessDateService';
import { HolidaysAdapter } from '../../infrastructure/adapters/holidaysAdapter';

const holidaysAdapter = new HolidaysAdapter();
const businessDateService = new BusinessDateService(holidaysAdapter);
const calculateBusinessDateUseCase = new CalculateBusinessDateUseCase(businessDateService);
const businessDateController = new BusinessDateController(calculateBusinessDateUseCase);

export const businessDateRouter = Router();

businessDateRouter.get('/calculate', (req, res) => businessDateController.calculate(req, res));