import { Types } from 'mongoose';
export interface CheckpointInterface {
  title: string;
  description: string;
  dueDate: Date;
  marks: number;
  completed: boolean;
}

export interface ProjectInterface {
  title: string;
  description: string;
  dueDate: Date;
  totalMarks: number;
  checkpoints: CheckpointInterface[];
}

export interface UserInterface {
  email: string;
  password: string;
  projects: Types.ObjectId[];
}
