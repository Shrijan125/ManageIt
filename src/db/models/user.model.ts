import mongoose, { Schema, Types } from 'mongoose';
import { UserInterface } from '@/lib/types';

const userSchema = new Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: Types.ObjectId,
      ref: 'Project',
    },
  ],
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
