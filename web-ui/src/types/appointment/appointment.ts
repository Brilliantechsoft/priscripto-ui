export interface Appointment {
  id: number;
  patientName: string;
  date: string;
  visitType: string;
  callType: string;
  email: string;
  phone: string;
  status: 'upcoming' | 'cancelled' | 'completed';
  profileImageUrl?: string;
}