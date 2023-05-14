import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

// favorites page
// fetches favorite listings for current user and displays favorites client
const FavoritesPage = async () => {
  // get favorite listings
  const listings = await getFavoriteListings();

  // get current user
  const currentUser = await getCurrentUser();

  // if no user show empty state
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be signed in to view this page."
      />
    );
  }

  // if no listings show empty state
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="You haven't favorited any listings yet."
      />
    );
  }

  // otherwise, show favorites client
  return (
    <FavoritesClient
      listings={listings}
      currentUser={currentUser}
    />
  );
};

export default FavoritesPage;
