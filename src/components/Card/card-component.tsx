'use client';
import React from 'react';
import Image from 'next/image';
import Img1 from '../../../public/img1.jpg';
import { ProjectInterface } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Stepper } from '../Stepper/stepper';



const CardComponent: React.FC<ProjectInterface> = ({title, checkpoints, description, dueDate, totalMarks }) => {
  const date = new Date(dueDate);
  const  handleClick = () => {};
  return (
    <Card className="w-[400px] h-[500px] overflow-hidden select-none">
      <CardHeader className="relative h-[45%]">
        <Image src={Img1} alt="img1" fill />
      </CardHeader>
      <CardContent className="mt-2 text-purple-100">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p>{description}</p>
        <p className="font-bold mt-2">
          Due Date: <span className="font-medium">{date.toLocaleDateString()}</span>{' '}
        </p>
        <p className="font-bold mt-2">
          Total Marks: <span className="font-medium">{totalMarks}</span>{' '}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 items-start w-full">
        <Stepper checkpoints={checkpoints}></Stepper>
        <Button onClick={handleClick}>Accept</Button>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
