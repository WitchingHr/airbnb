// api endpoint for registering a new user

import bcrypt from 'bcrypt'; // for hashing password
import prisma from '@/app/lib/prismadb'; // for database
import { NextResponse } from 'next/server'; // for returning response

// register new user
export async function POST(request: Request) {
  try {
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

  } catch (error) {
    // return error in response
    return NextResponse.error();
  }
}
