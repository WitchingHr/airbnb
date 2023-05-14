import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

// params
interface IParams {
  reservationId?: string;
}

// delete a reservation
export async function DELETE(request: Request, { params }: { params: IParams}) {
  // get current user
  const currentUser = await getCurrentUser();

  // if no current user, return error
  if (!currentUser) {
    return NextResponse.error();
  }

  // get reservationId from params
  const { reservationId } = params;

  // if no reservationId or invalid reservationId, return error
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  // delete reservation
  // can only delete reservation if user is owner of reservation or owner of listing
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id }, // user is owner of reservation
        { listing: { userId: currentUser.id } }, // user is owner of listing
      ],
    },
  });

  // return reservation
  return NextResponse.json(reservation);
}
