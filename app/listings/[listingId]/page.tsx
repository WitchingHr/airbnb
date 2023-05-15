import getListingById from "@/app/actions/getListingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";

// params interface
interface IParams {
  listingId?: string;
}

export const dynamic = 'force-dynamic'

// listing page for individual listing
// fetches listing by id and displays listing client
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

  // otherwise, show listing client
  return (
    <div>
      <ClientOnly>
        <ListingClient
          listing={listing}
          currentUser={currentUser}
          reservations={reservations}
        />
      </ClientOnly>
    </div>
  )
};

export default ListingPage;
