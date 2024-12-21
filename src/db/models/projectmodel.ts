import mongoose, { Schema } from 'mongoose';
import { ProjectInterface } from '@/lib/types';

const ProjectSchema = new Schema<ProjectInterface>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    totalMarks: { type: Number, required: true },
    checkpoints: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          dueDate: { type: Date, required: true },
          marks: { type: Number, required: true },
          completed: { type: Boolean, default: false },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);
