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

export type Specialization = string;
export type Degree = string;

// export interface Specialization {
//   id: string;
//   name: string;
// }

// export interface Degree {
//   id: string;
//   name: string;
// }