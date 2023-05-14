import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";

// types
import { SafeUser } from "@/app/types/index";

// interface for useFavorite hook
interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

// hook
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  // router
  const router = useRouter();

  // login modal, (methods: onOpen, onClose, isOpen)
  const loginModal = useLoginModal();

  // check if listing is favorited, return boolean
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  // toggle favorite
  const toggleFavorite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    // if no current user, open login modal
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      // initialize request
      let request;

      // if listing is favorited
      if (hasFavorited) {
        // delete favorite
        request = () => axios.delete(`/api/favorites/${listingId}`);

      } else {
        // else, post favorite
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      // send request
      await request();

      // refresh page
      router.refresh();

      // toast success
      toast.success('Success');

    } catch (err: any) {
      // toast error
      toast.error(err.message);
    }
  }, [currentUser, hasFavorited, listingId, loginModal, router]);

  // return functions
  return {
    hasFavorited,
    toggleFavorite,
  }
};

export default useFavorite;
