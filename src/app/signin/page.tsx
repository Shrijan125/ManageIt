'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Logo from '../../../public/noteflow.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import Loader from '@/components/Loader/loader';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleClick = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      toast({
        description: 'All fields are required.',
        variant: 'destructive',
      });
      return;
    }
    try {
      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });
      if (result?.status === 401) {
        toast({ description: 'Invalid credentials.', variant: 'destructive' });
        setLoading(false);
        return;
      }
      router.replace('/user');
    } catch (error) {
      if (error instanceof Error) {
        toast({ description: error.message, variant: 'destructive' });
      } else {
        toast({ description: 'An error occurred.', variant: 'destructive' });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-[400px] h-[500px] mx-auto my-20">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4">
          <div className="relative w-14 h-14">
            <Image src={Logo} alt="company-logo" fill></Image>
          </div>
        </CardTitle>
        <CardDescription className="mt-5 text-xl text-purple-200">
          Sign In
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-5 flex-col">
        <Label htmlFor="email">Email</Label>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          id="email"
          placeholder="test@gmail.com"
        ></Input>
        <Label htmlFor="password">Password</Label>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          type="password"
          id="password"
          placeholder="testing"
        ></Input>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick} className="w-full mt-5">
          {loading ? <Loader /> : 'Sign In'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
