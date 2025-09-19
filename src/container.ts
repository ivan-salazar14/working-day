import { HolidaysAdapter } from './infrastructure/adapters/holidaysAdapter';
import { BusinessDateService } from './domain/services/businessDateService';
import { CalculateBusinessDateUseCase } from './application/useCases/calculateBusinessDateUseCase';
import { BusinessDateController } from './presentation/controllers/businessDateController';

// Infrastructure
const holidaysAdapter = new HolidaysAdapter();

// Domain
const businessDateService = new BusinessDateService(holidaysAdapter);

// Application
const calculateBusinessDateUseCase = new CalculateBusinessDateUseCase(businessDateService);

// Presentation
export const businessDateController = new BusinessDateController(calculateBusinessDateUseCase);