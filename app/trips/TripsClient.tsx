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
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
}

// trips client component
// displays all trips for a user
const TripsClient: React.FC<TripsClientProps> = ({
  reservations = [],
  currentUser,
}) => {
  // router
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  // cancel reservation
  const onCancel = useCallback((id: string) => {
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
        setDeletingId("");
      });
  }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}         
      </div>
    </Container>
  );
};

export default TripsClient;
