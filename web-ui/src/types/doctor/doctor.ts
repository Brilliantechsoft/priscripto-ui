// types/doctor.ts
export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialization?: string;
  degree?: string;
  profilePicture?: string;
  bio?: string;
}

export interface Specialization {
  id: string;
  name: string;
}

export interface Degree {
  id: string;
  name: string;
}