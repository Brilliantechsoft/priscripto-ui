// types/doctor.ts
export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: number;
  age?: number;
  country?: string;
  state?: string;
  city?: string;
  pincode?: number;
  clinicAddress?: string;
  gender?: string;
  image?: string;
  education?: Education[];
  specialities?: SpecialityService[];
}

export interface Education {
  id?: number;
  degreeId: number;
  degreeName?: string;
  instituteName: string;
  startDate: string;
  endDate?: string;
}

export interface SpecialityService {
  id?: number;
  specializationName: string | null;
  serviceName: string | null;
  price: number | null;
}

// export interface ServiceDetail {
//   id?: number; 
//   serviceId: number;
//   serviceName?: string; 
//   price: number; 
// }

export interface Specialization {
  specializationId: number;
  specializationName: string;
}

export interface Service {
  serviceId: number;
  serviceName: string;
}

export interface Degree {
  degreeId: number;
  degreeName: string;
}