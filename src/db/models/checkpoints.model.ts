import mongoose,{Schema} from "mongoose";

export const CheckpointSchema = new Schema({
    checkpointId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    marks: { type: Number, required: true },
    completed: { type: Boolean, default: false },
  });

export const Checkpoint = mongoose.models.Checkpoint || mongoose.model('Checkpoint', CheckpointSchema);
