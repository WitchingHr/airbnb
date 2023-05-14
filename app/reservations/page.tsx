import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

// reservations page
// fetches reservations for current user and displays reservations client
const ReservationsPage = async () => {
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
    authorId: currentUser.id,
  });

  // if no reservations show empty state
  if (reservations.length === 0) {
    return <EmptyState
      title="No reservations found"
      subtitle="Your listings have no reservations yet."
    />;
  }

  // otherwise, show reservations client
  return (
    <ReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ReservationsPage;
