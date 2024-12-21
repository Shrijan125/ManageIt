import { connectToDB } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectInterface, CheckpointInterface } from '@/lib/types';
import { Project } from '@/db/models/projectmodel';

function isValidCheckpoint(checkpoint: any): checkpoint is CheckpointInterface {
  return (
    typeof checkpoint.title === 'string' &&
    typeof checkpoint.description === 'string' &&
    !isNaN(new Date(checkpoint.dueDate).getTime()) &&
    typeof checkpoint.marks === 'number' &&
    typeof checkpoint.completed === 'boolean'
  );
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = (await req.json()) as ProjectInterface;

    const { title, description, dueDate, totalMarks, checkpoints } = body;

    if (!title || !description || !dueDate || !totalMarks || !checkpoints) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!Array.isArray(checkpoints) || checkpoints.length === 0) {
      return NextResponse.json(
        { message: 'Checkpoints cannot be empty or invalid' },
        { status: 400 },
      );
    }

    for (const checkpoint of checkpoints) {
      if (!isValidCheckpoint(checkpoint)) {
        return NextResponse.json(
          { message: 'Invalid checkpoint data' },
          { status: 400 },
        );
      }
    }

    const totalCheckpointMarks = checkpoints.reduce(
      (sum, checkpoint) => sum + checkpoint.marks,
      0,
    );

    if (totalCheckpointMarks !== totalMarks) {
      return NextResponse.json(
        {
          message:
            "Total marks from checkpoints do not match the project's total marks",
        },
        { status: 400 },
      );
    }

    const projectDueDate = new Date(dueDate);
    const lastCheckpointDueDate = checkpoints
      .map((checkpoint) => new Date(checkpoint.dueDate))
      .sort((a, b) => a.getTime() - b.getTime())
      .pop();

    if (lastCheckpointDueDate && lastCheckpointDueDate > projectDueDate) {
      return NextResponse.json(
        { message: 'Checkpoint due dates exceed project due date' },
        { status: 400 },
      );
    }

    const newProject = await Project.create({
      title,
      description,
      dueDate: projectDueDate,
      totalMarks,
      checkpoints,
    });

    if (!newProject)
      return NextResponse.json(
        { message: 'Failed to create Project' },
        { status: 500 },
      );

    return NextResponse.json(
      { message: 'Project created successfully' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create Project' },
      { status: 500 },
    );
  }
}
