'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectWithId } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Stepper } from '../Stepper/stepper';
import { addProject } from '@/actions/addproject';
import Loader from '../Loader/loader';
import { useToast } from '@/hooks/use-toast';
import { images } from '@/lib/constants';
import { useRouter, usePathname } from 'next/navigation';

const CardComponent: React.FC<ProjectWithId> = ({
  title,
  checkpoints,
  description,
  dueDate,
  totalMarks,
  _id,
}) => {
  const date = new Date(dueDate);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const { toast } = useToast();

  const showAcceptButton = pathname.includes('/yourprojects');

  const handleClick = async () => {
    setLoading(true);
    try {
      await addProject({ projectId: _id });
      toast({ description: 'Project Added successfully!' });
    } catch (error) {
      toast({ description: 'Failed to add project', variant: 'destructive' });
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Card className="sm:w-[400px] w-[300px] h-[500px] overflow-hidden select-none">
      <CardHeader className="relative h-[45%]">
        <Image src={randomImage} alt="img1" fill />
      </CardHeader>
      <CardContent className="mt-2 text-purple-100">
        <h1 className="sm:text-xl text-lg font-semibold">{title}</h1>
        <p className="sm:text-sm text-xs mt-2">{description}</p>
        <p className="font-bold mt-2">
          Due Date:{' '}
          <span className="font-medium">{date.toLocaleDateString()}</span>{' '}
        </p>
        <p className="font-bold mt-2">
          Total Marks: <span className="font-medium">{totalMarks}</span>{' '}
        </p>
        {showAcceptButton && (
          <>
            <p className="font-bold mt-2">
              CheckPoints completed:{' '}
              <span className="font-medium">{totalMarks}</span>{' '}
            </p>
            <p className="font-bold mt-2">
              CheckPoints remaining:{' '}
              <span className="font-medium">{totalMarks}</span>{' '}
            </p>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-5 items-start w-full">
        <Stepper
          projectId={_id}
          yourProjects={showAcceptButton}
          checkpoints={checkpoints}
        ></Stepper>
        {!showAcceptButton && (
          <Button onClick={handleClick}>
            {!loading ? 'Accept' : <Loader />}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
