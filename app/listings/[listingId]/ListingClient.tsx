'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"; // date functions
import { toast } from "react-hot-toast";
import { Range } from "react-date-range"; // date range type

import { SafeListing, SafeReservation, SafeUser } from "@/app/types"; // types

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";

// initial date range
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

// props
interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
}

// listing client component
// displays listing title, location, and image
const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  // login modal
  const loginModal = useLoginModal();

  // router
  const router = useRouter();

  // get dates that are already reserved
  const disabledDates = useMemo(() => {
    // initialize dates array
    let dates: Date[] = [];

    // iterate through reservations
    reservations.forEach((reservation) => {
      // create date range for each reservation
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      // add reserved dates to array
      dates = [...dates, ...range];
    });

    // return reserved dates
    return dates;
  }, [reservations]);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // total price
  const [totalPrice, setTotalPrice] = useState(listing.price);

  // date range
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // create reservation
  const onCreateReservation = useCallback(async () => {
    // if user is not logged in, open login modal
    if (!currentUser) {
      return loginModal.onOpen();
    }
    
    setIsLoading(true);

    // create reservation request
    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,

    }).then(() => {
      // toast success
      toast.success('Reservation created!');
      // reset date range
      setDateRange(initialDateRange);
      // refresh router
      router.refresh();

    }).catch(() => {
      // toast error
      toast.error('Something went wrong!');

    }).finally(() => {
      setIsLoading(false);
    });
  }, [currentUser, totalPrice, dateRange, listing, loginModal, router]);

  // update total price when date range changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // get day count
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      // set total price
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing]);

  // get category
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">

          {/* title and image */}
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            {/* listing info */}
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />

            {/* reservation calendar */}
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
