export interface SlotAvailability {
  time: string;
  available: boolean;
  remainingCapacity: number;
}

export interface BookingInput {
  date: string;
  time: string;
  guests: number;
  seating: 'Garden' | 'Indoor';
  occasion: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
  honeypot?: string;
}

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  booking?: BookingRecord;
  error?: string;
}

export interface BookingRecord extends BookingInput {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface BookingRepository {
  getAvailability(date: string): Promise<SlotAvailability[]>;
  create(input: BookingInput): Promise<BookingResult>;
  getAll(): Promise<BookingRecord[]>;
  updateStatus(id: string, status: BookingRecord['status']): Promise<boolean>;
}

export interface Notifier {
  send(kind: 'guest-confirmation' | 'cafe-alert', payload: unknown): Promise<void>;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export interface HireApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  resumeFileName?: string;
  createdAt: string;
}
