'use client';

import Image from "next/image";

// profile picture component
// profile picture for user menu
const Avatar = () => {
  return (
    <Image 
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
      src={"/images/placeholder.jpg"}
    />
  )
};

export default Avatar;
