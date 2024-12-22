import { connectToDB } from '@/db';
import { Project } from '@/db/models/projectmodel';
import { ProjectWithId } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();
    const data: ProjectWithId[] = await Project.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to get Data' },
      { status: 500 },
    );
  }
}
