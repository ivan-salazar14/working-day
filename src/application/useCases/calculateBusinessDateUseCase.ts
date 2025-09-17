import { DateTime } from 'luxon';
import { BusinessDateService } from '../../domain/services/businessDateService';

export class CalculateBusinessDateUseCase {
  constructor(private businessDateService: BusinessDateService) {}

  async execute(days?: number, hours?: number, date?: string): Promise<string> {
    if ((days === undefined || days <= 0) && (hours === undefined || hours <= 0)) {
      throw new Error('At least one of days or hours must be provided');
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

    let result: DateTime = start;
    if (days) {
      result = await this.businessDateService.addBusinessDays(result, days);
    }
    if (hours) {
      result = await this.businessDateService.addBusinessHours(result, hours);
    }
    return result.toUTC().toISO()!;
  }
}