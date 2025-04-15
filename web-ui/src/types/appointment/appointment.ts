export interface Appointment {
  appointmentId: number;
  patientId: number;
  patientName: string;
  date: string;
  purpose: string;
  appointmentType: string;
  email: string;
  phoneNo: number;
  appointmentStatus: 'UPCOMING' | 'CANCELLED' | 'COMPLETED';
  profileImageUrl?: string;
  time : string
}