import { Request, Response } from 'express';
import { CalculateBusinessDateUseCase } from '../../application/useCases/calculateBusinessDateUseCase';
import { BusinessDateRequestSchema } from '../../domain/entities/businessDateRequest';
import { ResponseFormatter } from '../utils/responseFormatter';

export class BusinessDateController {
  constructor(private calculateBusinessDateUseCase: CalculateBusinessDateUseCase) {}

  async calculate(req: Request, res: Response): Promise<void> {
    try {
      const rawRequest = {
        days: req.query.days ? parseInt(req.query.days as string, 10) : undefined,
        hours: req.query.hours ? parseInt(req.query.hours as string, 10) : undefined,
        date: req.query.date as string | undefined,
      };

      const validationResult = BusinessDateRequestSchema.safeParse(rawRequest);
      if (!validationResult.success) {
        ResponseFormatter.validationError(res, validationResult.error.errors[0].message);
        return;
      }

      const result = await this.calculateBusinessDateUseCase.execute(validationResult.data);
      ResponseFormatter.success(res, result);
    } catch (error) {
      ResponseFormatter.error(res, error as Error);
    }
  }
}