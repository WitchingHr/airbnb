"use client"

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { SafeListing, SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

// props
interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

// properties client component
// displays all properties for a user
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  // router
  const router = useRouter();

  // for disabling delete button while deleting
  const [deletingId, setDeletingId] = useState("");

  // delete listing
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    // send request to delete listing
    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted");
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
        title="Properties"
        subtitle="Manage your listed properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}         
      </div>
    </Container>
  );
};

export default PropertiesClient;
