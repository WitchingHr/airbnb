import prisma from "@/app/lib/prismadb";

// interface for params
interface IParams {
  listingId?: string;
}

// get listing by id
export default async function getListingById(
  params: IParams
) {
  try {
    // destructure listingId from params
    const { listingId } = params;

    // get listing from db, include user
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    // if no listing, return null
    if (!listing) {
      return null;
    }

    // sanitize listing data for client and return
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      }
    }

  } catch (err: any) {
    // if error, throw error
    throw new Error(err);
  }
}
