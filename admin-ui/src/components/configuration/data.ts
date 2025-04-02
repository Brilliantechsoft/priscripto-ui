// data.ts
export interface Specialization {
    id: number;
    name: string;
  }
  
  export interface Education {
    id: number;
    title: string;
    institution: string;
  }
  
  // Import JSON data
  import specializationsData from './specializations.json';
  import educationsData from './educations.json';
  
  export const initialSpecializations: Specialization[] = specializationsData;
  export const initialEducations: Education[] = educationsData;