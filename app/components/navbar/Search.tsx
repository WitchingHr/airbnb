"use client";

import { BiSearch } from "react-icons/bi"; // for search icon

// search component
// search bar for navbar
const Search = () => {
	return (
		<div
			className="
				border-[1px] w-full md:w-auto py-2 rounded-full
				shadow-sm hover:shadow-md transition cursor-pointer
			"
		>
			<div className="flex flex-row items-center justify-between ">

				{/* location */}
				<div className="px-6 text-sm font-semibold">Anywhere</div>
				
				{/* timeframe */}
				<div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
					Any week
				</div>

				<div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
					{/* amount of guests */}
					<div className="hidden sm:block">Add Guests</div>

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
