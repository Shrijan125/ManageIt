import { Project } from '@/db/models/projectmodel';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { projectId, checkpointId, completed } = await request.json();

    const project = await Project.findOneAndUpdate(
      { _id: projectId, 'checkpoints._id': checkpointId },
      { $set: { 'checkpoints.$.completed': completed } },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: 'Project or checkpoint not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error in mark-checkpoint API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
