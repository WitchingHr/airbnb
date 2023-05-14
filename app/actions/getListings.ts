import prisma from "@/app/lib/prismadb";

// params
export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

// get listings server action 
export default async function getListings(
  params: IListingsParams,
) {
  try {
    // get params
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;
    
    // initialize query object
    let query: any = {}

    // if userId exists, add to query
    if (userId) {
      query.userId = userId;
    }

    // if category exists, add to query
    if (category) {
      query.category = category;
    }

    // if roomCount exists, add to query
    // convert to number and find listings with roomCount greater than or equal to
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
    }

    // if guestCount exists, add to query
    // convert to number and find listings with guestCount greater than or equal to
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }
    
    // if bathroomCount exists, add to query
    // convert to number and find listings with bathroomCount greater than or equal to
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }

    // if locationValue exists, add to query
    if (locationValue) {
      query.locationValue = locationValue;
    }
    
    // if startDate and endDate exists, add to query
    // find listings that do not have reservations that overlap with the given dates
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
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
