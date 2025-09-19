import { Response } from 'express';

export class ResponseFormatter {
  static success(res: Response, data: any): void {
    res.json({ date: data });
  }

  static validationError(res: Response, message: string): void {
    res.status(400).json({ error: 'InvalidParameters', message });
  }

  static error(res: Response, error: Error): void {
    const message = error.message;
    if (message.includes('fetch holidays')) {
      res.status(503).json({ error: 'ServiceUnavailable', message: 'Unable to fetch holidays data' });
    } else {
      res.status(400).json({ error: 'InvalidParameters', message });
    }
  }
}