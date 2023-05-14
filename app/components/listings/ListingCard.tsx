"use client"

import { useRouter } from "next/navigation";
import { format } from "date-fns"; // for formatting dates

// types
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

// props
interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

// listing card component
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  // router
  const router = useRouter();

  // get country
  const { getByValue} = useCountries();
  const location = getByValue(data.locationValue);

  // cancel reservation
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId);
  }, [disabled, onAction, actionId]);

  // get price
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data]);

  // get formatted reservation date
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    // get start and end date
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    // format dates
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)} // go to listing page
      className="col-span-1 cursor-pointer group" // group for hover effect
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">

          {/* image */}
          <Image
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
          
          {/* heart button */}
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        
        {/* location */}
        <div className="font-semibold text-lg">
          {location?.label}, {location?.region}
        </div>
        
        {/* reservation date or category */}
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>

        {/* price */}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>

        {/* action button */}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
      
    </div>
  )
};

export default ListingCard;
