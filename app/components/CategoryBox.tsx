'use client';

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons"; // for icon types
import qs from "query-string"; // for parsing query strings

// props
interface CategoryBoxProps {
	icon: IconType;
	label: string;
	selected?: boolean;
}

// category box component
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected
}) => {
  // router
  const router = useRouter();
  // params
  const params = useSearchParams();

  // create query string
  const handleClick = useCallback(() => {
    // initialize current query
    let currentQuery = {};

    // if params already exist, parse them into current query
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // update query with category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // if category already exists in query, remove it
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // stringify url
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    // push url to router
    router.push(url);
    
  }, [params, label, router]);

	return (
		<div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 transition
        border-b-2 cursor-pointer hover:text-neutral-800
        ${selected ? 'text-neutral-800 border-b-neutral-800' : 'text-neutral-500 border-transparent'}`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">
        {label}
      </div>
    </div>
	);
};

export default CategoryBox;
