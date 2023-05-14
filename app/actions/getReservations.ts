import prisma from "@/app/lib/prismadb";

// interface for params
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

// get reservations
// can find reservations by listingId, userId, or authorId
export default async function getReservations(params: IParams) { 
  try {
    // destructure listingId, userId, authorId from params
    const { listingId, userId, authorId } = params;

    // create query object
    const query: any = {};

    // if listingId, add to query
    if (listingId) {
      query.listingId = listingId;
    }

    // if userId, add to query
    if (userId) {
      query.userId = userId;
    }

    // if authorId, add to query
    if (authorId) {
      query.listing = { userId: authorId };
    }

    // get reservations from db, include listing
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // sanitize reservations data for client
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    // return sanitized reservations
    return safeReservations;

  } catch (err: any) {
    // if error, throw error
    throw new Error(err);
  }
}