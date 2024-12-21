'use client';
import CardComponent from '@/components/Card/card-component';
import NavBar from '@/components/NavBar/navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { ProjectInterface } from '@/lib/types';

const UserPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    axios
      .get(BASE_URL + '/getProjects')
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch(() => {
        toast({ description: 'An error occurred', variant: 'destructive' });
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="mt-8 mx-8 grid grid-cols-4 gap-5 place-items-center">
        {data.map((project, index) => (
          <CardComponent
            key={index}
            checkpoints={project.checkpoints}
            description={project.description}
            dueDate={project.dueDate}
            title={project.title}
            totalMarks={project.totalMarks}
          ></CardComponent>
        ))}
      </div>
    </>
  );
};

export default UserPage;
