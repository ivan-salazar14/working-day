import { expect } from 'chai';
import { BusinessDateService } from '../../src/domain/services/businessDateService';
import { HolidayProvider } from '../../src/domain/ports/holidayProvider';
import { DateTime } from 'luxon';

class MockHolidayProvider implements HolidayProvider {
  private holidays: string[];

  constructor(holidays: string[] = []) {
    this.holidays = holidays;
  }

  async fetchHolidays(): Promise<string[]> {
    return this.holidays;
  }
}

describe('BusinessDateService', () => {
  let service: BusinessDateService;
  let mockProvider: MockHolidayProvider;

  beforeEach(() => {
    mockProvider = new MockHolidayProvider(['2025-01-01']);
    service = new BusinessDateService(mockProvider);
  });

  describe('isBusinessDay', () => {
    it('should return false for weekends', () => {
      const saturday = DateTime.fromISO('2025-01-04'); // Saturday
      expect(service.isBusinessDay(saturday, new Set())).to.be.false;
    });

    it('should return false for holidays', () => {
      const holiday = DateTime.fromISO('2025-01-01');
      expect(service.isBusinessDay(holiday, new Set(['2025-01-01']))).to.be.false;
    });

    it('should return true for business days', () => {
      const businessDay = DateTime.fromISO('2025-01-02'); // Wednesday
      expect(service.isBusinessDay(businessDay, new Set(['2025-01-01']))).to.be.true;
    });
  });

  describe('addBusinessDays', () => {
    it('should add business days correctly', async () => {
      const start = DateTime.fromISO('2025-01-01'); // Holiday
      const result = await service.addBusinessDays(start, 1);
      expect(result.toISODate()).to.equal('2025-01-02'); // Next business day
    });
  });
});