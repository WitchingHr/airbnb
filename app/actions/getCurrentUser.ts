import { getServerSession } from "next-auth/next"; // for getting session

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/lib/prismadb";

// get session from server
export async function getSession() {
  return await getServerSession(authOptions);
}

// get current user from session
export default async function getCurrentUser() {
  try {
    // get session
    const session = await getSession();

    // if no session, return null
    if (!session?.user?.email) {
      return null;
    }

    // get current user from db
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // if no user, return null
    if (!currentUser) {
      return null;
    }

    // return current user
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };

  // if error, return null
  } catch (err) {
    console.log(err);
    return null;
  }
}
