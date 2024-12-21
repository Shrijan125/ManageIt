'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {User} from "@/db/models/user.model";

export async function addProject({projectId}:{projectId: string})
{
    const session = await getServerSession(authOptions);
    if(!session?.user)
        return;
    const user = session.user;
    try {
        const result = await User.findOneAndUpdate(
            { email: user.email },
            { $push: { projects: projectId } },
            { new: true }
          );
    } catch (error) {
        return { error: 'Failed to add project' };
    }
    return { message: 'Project added successfully' };
}