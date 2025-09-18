import { Request, Response } from 'express';
import { CalculateBusinessDateUseCase } from '../../application/useCases/calculateBusinessDateUseCase';
import { BusinessDateRequestSchema } from '../../domain/entities/businessDateRequest';

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
        res.status(400).json({ error: 'InvalidParameters', message: validationResult.error.errors[0].message });
        return;
      }

      const result = await this.calculateBusinessDateUseCase.execute(validationResult.data);
      res.json({ date: result });
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('fetch holidays')) {
        res.status(503).json({ error: 'ServiceUnavailable', message: 'Unable to fetch holidays data' });
      } else {
        res.status(400).json({ error: 'InvalidParameters', message });
      }
    }
  }
}