"use client"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // for icons

// types
import { SafeUser } from "../types";

// props
interface HeartButtonProps {
  listingId: string;
  currentUser: SafeUser | null | undefined;
}

// heart button component
// allows users to favorite a listing
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  // placeholder for now
  const hasFavorited = false;

  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
  )
};

export default HeartButton;
