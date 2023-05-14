import prisma from "@/app/lib/prismadb";

// params
export interface IListingsParams {
  userId?: string;
}

// get listings server action 
export default async function getListings(
  params: IListingsParams,
) {
  try {
    // get userId from params
    const { userId } = params;
    
    // initialize query object
    let query: any = {}

    // if userId exists, add to query
    if (userId) {
      query.userId = userId;
    }

    // get listings from db
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      }
    });

    // sanitize listing data for client
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    // return listings
    return safeListings;

  } catch (err: any) {
    // if error, throw error
    throw new Error(err);
  }
}
