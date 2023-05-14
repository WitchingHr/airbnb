import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

// interface for params
interface IParams {
  listingId?: string;
}

// favorite a listing
export async function POST(
  request: Request,
  { params }: { params: IParams } // destructure params from request
) {
  // get current user
  const currentUser = await getCurrentUser();

  // if no current user, return error
  if (!currentUser) {
    return NextResponse.error();
  }

  // destructure listingId from params
  const { listingId } = params;

  // if no listingId or listingId is not a string, throw error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // create favoriteIds array from current user's favoriteIds
  const favoriteIds = [...(currentUser.favoriteIds || [])];

  // push listingId to favoriteIds array
  favoriteIds.push(listingId);

  // update user with new favoriteIds array
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // return user
  return NextResponse.json(user);
}

// delete a favorited listing 
export async function DELETE(
  request: Request,
  { params }: { params: IParams } // destructure params from request
) {
  // get current user
  const currentUser = await getCurrentUser();

  // if no current user, return error
  if (!currentUser) {
    return NextResponse.error();
  }

  // destructure listingId from params
  const { listingId } = params;

  // if no listingId or listingId is not a string, throw error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // create favoriteIds array from current user's favoriteIds
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // filter favoriteIds array to remove listingId
  favoriteIds = favoriteIds.filter(
    (favoriteId) => favoriteId !== listingId
  );

  // update user with new favoriteIds array
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // return user
  return NextResponse.json(user);
}
