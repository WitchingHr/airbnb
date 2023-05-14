"use client"

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { SafeReservation, SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

// props
interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

// reservations client component
// displays all reservations for a user
const ReservationsClient: React.FC<TripsClientProps> = ({
  reservations = [],
  currentUser,
}) => {
  // router
  const router = useRouter();

  // for deleting reservation and disabling cancel button
  const [deletingId, setDeletingId] = useState("");

  // cancel reservation
  const onCancel = useCallback((id: string) => {
    // disable cancel button
    setDeletingId(id);

    // send request to cancel reservation
    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        // enable cancel button
        setDeletingId("");
      });
  }, [router]);

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
