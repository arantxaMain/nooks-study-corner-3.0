export interface User {
  name: string;
  email: string;
  password: string;
  gender: string;
  workDuration: number;
  breakDuration: number;
  studyMinutes?: { [key: string]: number };
}