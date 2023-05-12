import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

// register user
export async function POST(request: Request) {
  // get body from request
  const body = await request.json();

  // get email, name, password from body
  const { email, name, password } = body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  // return user in response
  return NextResponse.json(user);
}
