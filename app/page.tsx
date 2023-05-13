import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  // get listings
  const listings = await getListings();

  // get current user
  const currentUser = await getCurrentUser();

  // if no listings
  if (listings.length === 0) {
    return (
      // show empty state with reset button
      <EmptyState showReset />
    )
  }

  // otherwise, show listings
  return (
    <Container>
      <div className="
        pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
