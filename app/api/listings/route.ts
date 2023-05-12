import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// create a new listing
export async function POST(request: Request) {
  // get the current user
  const currentUser = await getCurrentUser();

  // if there is no current user, return an error
  if (!currentUser) {
    return NextResponse.error();
  }

  // get the body of the request
  const body = await request.json();

  // destructure the body to get the listing data
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    price,
    location,
  } = body;

  // create a new listing
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      price: parseInt(price, 10),
      locationValue: location.value,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}