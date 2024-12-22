import { CheckpointInterface } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface StepperProps {
  checkpoints: CheckpointInterface[];
}

export const Stepper: React.FC<StepperProps> = ({ checkpoints }) => {
  return (
    <ol className="flex items-center w-full">
      {checkpoints.map((item, index) => {
        return (
          <li
            key={index}
            className={`flex w-full ${index == checkpoints.length - 1 ? 'after:w-0' : 'after:w-full after:border-4'}  items-center after:content-['']  after:h-1 after:border-b after:border-blue-100  after:inline-block dark:after:border-gray-700`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`flex hover:cursor-pointer items-center justify-center w-4 h-4 bg-gray-700 rounded-full ${index == 0 ? 'dark:bg-primaryBg' : ''} shrink-0`}
                  ></span>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <p>Due Date: {new Date(item.dueDate).toDateString()}</p>
                    <p>Marks: {item.marks}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        );
      })}
    </ol>
  );
};
