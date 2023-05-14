"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi"; // for search icon

// search component
// search bar for navbar
const Search = () => {
	// get search params
	const params = useSearchParams();
	
	// get countries
	const { getByValue } = useCountries();

	// get values from search params
	const locationValue = params?.get("locationValue");
	const startDate = params?.get("startDate");
	const endDate = params?.get("endDate");
	const guestCount = params?.get("guestCount");

	// update location label based on params
	const locationLabel = useMemo(() => {
		// if location value exists
		if (locationValue) {
			return getByValue(locationValue as string)?.label;
		}

		// otherwise, return anywhere
		return 'Anywhere';
	}, [locationValue, getByValue]);

	// update duration label based on params
	const durationLabel = useMemo(() => {
		// if start and end date exists
		if (startDate && endDate) {
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);
			// get difference in days
			let diff = differenceInDays(end, start);

			if (diff === 0) {
				diff = 1;
			}

			// return duration label
			return `${diff} night${diff > 1 ? 's' : ''}`;
		}

		// otherwise, return any week
		return 'Any Week';
		}, [startDate, endDate]);

		// update guest label based on params
		const guestLabel = useMemo(() => {
			// if guest count exists
			if (guestCount) {
				// return guest label
				return `${guestCount} Guest${+guestCount > 1 ? 's' : ''}`;
			}

			// otherwise, return add guests
			return 'Add Guests';
		}, [guestCount]);


	// search modal
	const searchModal = useSearchModal();

	return (
		<div
			onClick={searchModal.onOpen}
			className="
				border-[1px] w-full md:w-auto py-2 rounded-full
				shadow-sm hover:shadow-md transition cursor-pointer
			"
		>
			<div className="flex flex-row items-center justify-between ">

				{/* location */}
				<div className="px-6 text-sm font-semibold">{locationLabel}</div>
				
				{/* timeframe */}
				<div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
					{durationLabel}
				</div>

				<div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
					{/* amount of guests */}
					<div className="hidden sm:block">{guestLabel}</div>

					{/* search icon */}
					<div className="p-2 text-white rounded-full bg-rose-500">
						<BiSearch size={18} />
					</div>
				</div>

			</div>
		</div>
	);
};

export default Search;
