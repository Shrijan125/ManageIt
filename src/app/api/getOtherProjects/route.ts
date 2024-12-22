import { connectToDB } from '@/db';
import { User } from '@/db/models/user.model';
import { ProjectId } from '@/lib/types';
import { NextResponse } from 'next/server';
import { Project } from '@/db/models/projectmodel';

export async function GET() {
  try {
    await connectToDB();

    const user = await User.findOne({ email: 'test@gmail.com' })
      .select('projects')
      .populate('projects');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const projects: ProjectId[] = await Project.find({
      _id: { $nin: user.projects },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to get Data' },
      { status: 500 },
    );
  }
}
