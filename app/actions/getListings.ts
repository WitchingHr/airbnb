import prisma from "@/app/lib/prismadb";

// get listings server action 
export default async function getListings() {
  try {
    // get listings from db
    const listings = await prisma.listing.findMany({
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