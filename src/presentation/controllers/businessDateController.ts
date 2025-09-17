import { Request, Response } from 'express';
import { CalculateBusinessDateUseCase } from '../../application/useCases/calculateBusinessDateUseCase';

export class BusinessDateController {
  constructor(private calculateBusinessDateUseCase: CalculateBusinessDateUseCase) {}

  async calculate(req: Request, res: Response): Promise<void> {
    try {
      const days = req.query.days ? parseInt(req.query.days as string, 10) : undefined;
      const date = req.query.date as string | undefined;

      if (days !== undefined && (isNaN(days) || days <= 0)) {
        res.status(400).json({ error: 'InvalidParameters', message: 'Days must be a positive integer' });
        return;
      }

      if (date && !date.endsWith('Z')) {
        res.status(400).json({ error: 'InvalidParameters', message: 'Date must be in ISO 8601 UTC format with Z suffix' });
        return;
      }

      const result = await this.calculateBusinessDateUseCase.execute(days, date);
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