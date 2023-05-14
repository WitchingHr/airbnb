import getListingById from "@/app/actions/getListingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

// params interface
interface IParams {
  listingId?: string;
}

// listing page for individual listing
const ListingPage = async ({ params }: { params: IParams }) => {
  // get listing by id using params
  const listing = await getListingById(params);

  // get reservations for listing
  const reservations = await getReservations(params);

  // get current user
  const currentUser = await getCurrentUser();

  // if no listing show empty state
  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  )
};

export default ListingPage;
