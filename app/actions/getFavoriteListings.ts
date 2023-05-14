import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/lib/prismadb";

// get favorite listings
export default async function getFavoriteListings() {
  try {
    // get current user
    const currentUser = await getCurrentUser();

    // if no current user, return empty array
    if (!currentUser) {
      return [];
    }

    // get favorites from db
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...currentUser.favoriteIds] || [],
        },
      },
    });

    // sanitize favorites data for client
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    // return sanitized favorites
    return safeFavorites;

  } catch (err: any) {
    // if error, return error
    throw new Error(err);
  }
}