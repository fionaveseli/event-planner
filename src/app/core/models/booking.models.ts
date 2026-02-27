export interface BookingCreateRequest {
  eventId: string;
  clientName: string;
  clientEmail: string;
  notes?: string;
}

export interface Booking {
  id: string;
  eventId: string;
  clientName: string;
  clientEmail: string;
  notes?: string;
  createdAtIso: string;
}