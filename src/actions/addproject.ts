'use server';
import { User } from '@/db/models/user.model';
import { Types } from 'mongoose';

export async function addProject({ projectId }: { projectId: string }) {
  try {
    const result = await User.findOneAndUpdate(
      { email: 'test@gmail.com' },
      { $push: { projects: new Types.ObjectId(projectId) } },
      { new: true },
    );
  } catch (error) {
    return { error: 'Failed to add project' };
  }
  return { message: 'Project added successfully' };
}
