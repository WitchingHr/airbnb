import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

// params
interface IParams {
  listingId?: string;
}

// delete listing
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // get current user
  const currentUser = await getCurrentUser();

  // if no current user, return error
  if (!currentUser) {
    return NextResponse.error();
  }

  // get listingId from params
  const { listingId } = params;

  // if no listingId or listingId is not a string, return error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // delete listing, only if listing belongs to current user
  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  // return listing
  return NextResponse.json(listing);
}
