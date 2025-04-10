// types/doctor.ts
export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specializationId?: number; // Matches backend expectation
  specializationName?: string;
  profilePicture?: string;
  bio?: string;
  education?: Education[]; // Array of education entries
}

export interface Education {
  id?: number; // Optional ID for existing education records
  degreeId: number; // Foreign key to the Degree table
  degreeName?: string; // Optional, for display purposes
  instituteName: string; // Name of the institution
  startDate: string; // ISO date string (e.g., "2020-01-01")
  endDate?: string; // Optional, as it could be ongoing
}

export interface Specialization {
  specializationId: number;
  specializationName: string;
}

export interface Degree {
  degreeId: number;
  degreeName: string;
}