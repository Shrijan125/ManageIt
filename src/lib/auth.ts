import { connectToDB } from '@/db';
import { User } from '@/db/models/user.model';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(
        credentials: { username: string; password: string } | undefined,
      ) {
        if (!credentials) return null;
        try {
          await connectToDB();
          const user = await User.findOne({
            email: credentials?.username,
          }).select('password');

          if (!user) {
            return null;
          }
        const isPasswordValid = credentials.password === user.password;
          if (!isPasswordValid) {
            console.log('Invalid email or password');
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
