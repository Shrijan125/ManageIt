import { connectToDB } from '@/db';
import { User } from '@/db/models/user.model';
import { ProjectWithId } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();

    const user = await User.findOne({ email: 'test@gmail.com' }).populate(
      'projects',
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userProjects: ProjectWithId[] = user.projects;

    return NextResponse.json(userProjects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to get User Projects' },
      { status: 500 },
    );
  }
}
