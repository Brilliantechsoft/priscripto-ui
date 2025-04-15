export interface AppointmentRequest {
    appointmentId: number;
    patientId: number;
    patientName: string;
    date: string;
    time : string;
    purpose: string;
    appointmentType: string;
    profileImage?: string;
    
  }