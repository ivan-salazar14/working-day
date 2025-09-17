import { DateTime } from 'luxon';
import { BusinessDateService } from '../../domain/services/businessDateService';

export class CalculateBusinessDateUseCase {
  constructor(private businessDateService: BusinessDateService) {}

  async execute(days?: number, date?: string): Promise<string> {
    if (days === undefined || days <= 0) {
      throw new Error('Days must be provided and greater than 0');
    }

    let start: DateTime;
    if (date) {
      if (!date.endsWith('Z')) {
        throw new Error('Date must be in ISO 8601 UTC format with Z suffix');
      }
      start = DateTime.fromISO(date, { zone: 'utc' }).setZone('America/Bogota');
    } else {
      start = DateTime.now().setZone('America/Bogota');
    }

    start = this.businessDateService.adjustToBusinessTime(start);

    const holidayDates = await this.businessDateService.getHolidayDates();
    while (!this.businessDateService.isBusinessDay(start, holidayDates)) {
      start = start.plus({ days: 1 });
    }

    const result = await this.businessDateService.addBusinessDays(start, days);
    return result.toUTC().toISO()!;
  }
}