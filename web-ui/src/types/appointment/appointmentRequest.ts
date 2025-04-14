export interface AppointmentRequest {
    id: number;
    patientName: string;
    dateTime: string;
    visitType: string;
    callType: string;
    profileImageUrl?: string;
    
  }