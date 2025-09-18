import { DateTime } from 'luxon';
import { BusinessDateService } from '../../domain/services/businessDateService';
import { BusinessDateRequest } from '../../domain/entities/businessDateRequest';

export class CalculateBusinessDateUseCase {
  constructor(private businessDateService: BusinessDateService) {}

  async execute(request: BusinessDateRequest): Promise<string> {
    const { days, hours, date } = request;

    let start: DateTime;
    if (date) {
      start = DateTime.fromISO(date, { zone: 'utc' }).setZone('America/Bogota');
      if (!start.isValid) {
        throw new Error('Invalid date format');
      }
    } else {
      start = DateTime.now().setZone('America/Bogota');
    }
    const holidayDates = await this.businessDateService.getHolidayDates();
    if (!holidayDates) {
      throw new Error('Unable to fetch holidays data');
    }
    console.log('Start:', start);
    start = await this.businessDateService.adjustToBusinessTimeBackwards(start, holidayDates);
    console.log('Adjusted Start:', start);
    let result: DateTime = start;
    if (days) {
      result = await this.businessDateService.addBusinessDays(result, days);
    }
    console.log('hours:', hours);
    if (hours) {
      
      result = await this.businessDateService.addBusinessHours(result, hours);
      console.log('After Adding Hours:', result);
    }
    // Ensure the result is within business hours if not already and hours were added
    if (hours && !this.businessDateService.isBusinessHour(result, holidayDates)) {
      if (result.hour === 18 && start.hour < 17) {
        result = result.set({ hour: 17, minute: 0, second: 0, millisecond: 0 });
      } else {
        result = this.businessDateService.nextBusinessHour(result, holidayDates);
      }
    }
    return result.toUTC().toISO({ suppressMilliseconds: true })!;
  }
}