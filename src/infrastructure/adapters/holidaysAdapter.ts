import { DateTime } from 'luxon';

export type Holiday = string;

export class HolidaysAdapter {
  private cache: Holiday[] | null = null;
  private cacheExpiry: DateTime | null = null;

  async fetchHolidays(): Promise<Holiday[]> {
    if (this.cache && this.cacheExpiry && DateTime.now() < this.cacheExpiry) {
      return this.cache;
    }

    try {
      const response = await fetch('https://content.capta.co/Recruitment/WorkingDays.json');
      if (!response.ok) {
        throw new Error('Failed to fetch holidays');
      }
      const data: Holiday[] = await response.json();
      this.cache = data;
      this.cacheExpiry = DateTime.now().plus({ hours: 24 }); // Cache for 24 hours
      return this.cache;
    } catch (error) {
      throw new Error('Unable to fetch holidays data');
    }
  }
}