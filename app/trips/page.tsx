import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";

import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

export const dynamic = 'force-dynamic'

// trips page
// fetches trips for current user and displays trips client
const TripsPage = async () => {
  // get current user
  const currentUser = await getCurrentUser();

  // if no user show empty state
  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="You must be signed in to view this page."
    />;
  }

  // get reservations for current user
  const reservations = await getReservations({
    userId: currentUser.id,
  });

  // if no reservations show empty state
  if (reservations.length === 0) {
    return <EmptyState
      title="No trips found"
      subtitle="You haven't booked any trips yet."
    />;
  }

  // otherwise, show trips client
  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default TripsPage;