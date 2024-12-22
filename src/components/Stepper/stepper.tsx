'use client';
import { CheckpointWithId } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface StepperProps {
  projectId: string;
  checkpoints: CheckpointWithId[];
  yourProjects: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  checkpoints: initialCheckpoints,
  yourProjects,
  projectId,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [checkpoints, setCheckpoints] = useState(initialCheckpoints);

  async function handleCheckpoint(checkpointId: string) {
    setLoading(true);

    const checkpoint = checkpoints.find((c) => c._id === checkpointId);
    if (!checkpoint) return;

    const newStatus = !checkpoint.completed;

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_NEXTBASE_URL + '/markcheckpoint',
        {
          projectId: projectId,
          checkpointId: checkpointId,
          completed: newStatus,
        },
      );

      setCheckpoints((prevCheckpoints) =>
        prevCheckpoints.map((cp) =>
          cp._id === checkpointId ? { ...cp, completed: newStatus } : cp,
        ),
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast({
          description: error.response.data.message,
          variant: 'destructive',
        });
      } else if (error instanceof Error) {
        toast({ description: error.message, variant: 'destructive' });
      } else {
        toast({ description: 'An error occurred.', variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ol className="flex items-center w-full">
      {checkpoints.map((item, index) => (
        <li
          key={index}
          className={`flex w-full ${
            index === checkpoints.length - 1
              ? 'after:w-0'
              : 'after:w-full after:border-4'
          } items-center after:content-[''] after:h-1 after:border-b after:inline-block ${
            item.completed ? 'after:border-primaryBg' : 'after:border-gray-700'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={`flex hover:cursor-pointer items-center justify-center w-4 h-4 bg-gray-700 rounded-full ${
                    item.completed ? 'dark:bg-primaryBg' : ''
                  } shrink-0`}
                ></span>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <p>Due Date: {new Date(item.dueDate).toDateString()}</p>
                  <p>Marks: {item.marks}</p>
                  {yourProjects && (
                    <div className="flex items-center gap-2">
                      Mark as Complete:{' '}
                      <input
                        type="checkbox"
                        disabled={loading}
                        checked={item.completed}
                        onChange={() => handleCheckpoint(item._id)}
                      />
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ol>
  );
};
