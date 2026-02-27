export interface EventItem {
  id: string;
  title: string;
  location: string;
  dateIso: string; // ISO string for now
}

export interface EventCreateRequest {
  title: string;
  location: string;
  dateIso: string;
}

export interface EventUpdateRequest {
  title: string;
  location: string;
  dateIso: string;
}