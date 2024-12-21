'use client';
import React from 'react';
import Image from 'next/image';
import NoteFlowImage from '../../../public/noteflow.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
  TooltipContent,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const NavBar =() => {
  const handleClick = async()=>{
    await signOut();
  }
  const items = [{title:'Home',link:'user'}, {title:'Your Projects',link:'yourprojects'}, {title:'Contact',link:'#'}];
  return (
    <div className="">
      <nav className="flex items-center justify-between mt-5 mx-7">
        <div className="flex flex-row gap-4 items-center">
          <div className="relative h-[50px] w-[50px]">
            <Image
              alt="project-logo"
              className="object-cover"
              fill
              src={NoteFlowImage}
            ></Image>
          </div>
          <h1 className="text-2xl font-bold text-purple-200">ManageIt</h1>
        </div>
        <ul className="flex gap-5 items-center">
          {items.map((item, index) => {
            return (
              <Link href={`/${item.link}`} key={index}>
              <li
                className="select-none cursor-pointer text-lg hover:text-purple-300"
              >
                {item.title}
              </li>
              </Link>
            );
          })}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="hover:cursor-pointer">
                <div className="flex flex-col gap-4 p-4">
                  <h1 className="text-xl text-purple-200">Welcome!</h1>
                  <Button variant={'destructive'} onClick={handleClick}>Sign Out</Button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
