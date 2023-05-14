import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// create a reservation
export async function POST(
  request: Request,
) {
  // get current user
  const currentUser = await getCurrentUser();

  // if no current user, return error
  if (!currentUser) {
    return NextResponse.error();
  }

  // get body
  const body = await request.json();

  // get listingId, startDate, endDate, totalPrice from body
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
  } = body;
  
  // if missing data, return error
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  // create reservation
  const listingAndReservation = await prisma.listing.update({
    where: {
      // find listing by id
      id: listingId,
    },
    data: {
      // update listing with new reservation
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  // return listing
  return NextResponse.json(listingAndReservation);
}