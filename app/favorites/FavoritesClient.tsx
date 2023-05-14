"use client"

import { SafeListing, SafeUser } from "../types"; // types

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

// props
interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

// favorites client component
// displays favorite listings
const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="Your favorite listings"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
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
};

export default FavoritesClient;
