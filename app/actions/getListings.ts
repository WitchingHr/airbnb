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

    // return listings
    return listings;

  } catch (err: any) {
    // if error, throw error
    throw new Error(err);
  }
}