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
    const holidayDates = await this.businessDateService.getHolidayDates();
    if (!holidayDates) {
      throw new Error('Unable to fetch holidays data');
    }

    start = await this.businessDateService.adjustToBusinessTimeBackwards(start, holidayDates);
    let result: DateTime = start;
    if (days) {
      result = await this.businessDateService.addBusinessDays(result, days);
    }
    if (hours) {
      result = await this.businessDateService.addBusinessHours(result, hours);
    }
    // Ensure the result is within business hours if not already and hours were added
    if (hours && !this.businessDateService.isBusinessHour(result, holidayDates)) {
      result = this.businessDateService.nextBusinessHour(result, holidayDates);
    }
    return result.toUTC().toISO({ suppressMilliseconds: true })!;
  }
}