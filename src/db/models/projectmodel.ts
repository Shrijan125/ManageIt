import mongoose,{Schema} from 'mongoose';
import { CheckpointSchema } from './checkpoints.model';

const ProjectSchema = new Schema({
    projectId: { type: String, required: true },
    candidateId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    totalMarks: { type: Number, required: true },
    checkpoints: [CheckpointSchema],
});

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);