import { BookingRepository, BookingInput, BookingResult, BookingRecord, SlotAvailability } from './types';
import { site } from '../lib/site';

const STORAGE_KEY = 'bb_bookings_records';

export class LocalBookingRepository implements BookingRepository {
  private getStored(): BookingRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveStored(records: BookingRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save bookings locally:', e);
    }
  }

  async getAvailability(date: string): Promise<SlotAvailability[]> {
    const records = this.getStored().filter((r) => r.date === date && r.status !== 'cancelled');

    return site.booking.slots.map((slot) => {
      const slotGuests = records
        .filter((r) => r.time === slot)
        .reduce((sum, r) => sum + r.guests, 0);

      const remaining = Math.max(0, site.booking.maxGuestsPerSlot - slotGuests);
      return {
        time: slot,
        available: remaining >= 2,
        remainingCapacity: remaining,
      };
    });
  }

  async create(input: BookingInput): Promise<BookingResult> {
    // Synchronous critical section for capacity and duplicate check
    const records = this.getStored();

    // 1. Duplicate check (same phone + date + time slot)
    const duplicate = records.find(
      (r) =>
        r.phone === input.phone &&
        r.date === input.date &&
        r.time === input.time &&
        r.status !== 'cancelled'
    );
    if (duplicate) {
      return {
        success: false,
        error: 'A reservation for this phone number and time already exists.',
      };
    }

    // 2. Capacity check
    const currentGuests = records
      .filter((r) => r.date === input.date && r.time === input.time && r.status !== 'cancelled')
      .reduce((sum, r) => sum + r.guests, 0);

    if (currentGuests + input.guests > site.booking.maxGuestsPerSlot) {
      return {
        success: false,
        error: 'That slot just filled up — please select an adjacent time slot.',
      };
    }

    // 3. Generate Booking ID BB-YYMMDD-XXXX
    const dateFormatted = input.date.replace(/-/g, '').slice(2);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `BB-${dateFormatted}-${randomSuffix}`;

    const newBooking: BookingRecord = {
      ...input,
      id: bookingId,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    records.push(newBooking);
    this.saveStored(records);

    return {
      success: true,
      bookingId,
      booking: newBooking,
    };
  }

  async getAll(): Promise<BookingRecord[]> {
    return this.getStored();
  }

  async updateStatus(id: string, status: BookingRecord['status']): Promise<boolean> {
    const records = this.getStored();
    const idx = records.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    records[idx].status = status;
    this.saveStored(records);
    return true;
  }
}

export const bookingRepo = new LocalBookingRepository();
