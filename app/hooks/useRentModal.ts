import { create } from 'zustand';

// store type for the Rent modal view state
interface RentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// store for handling the Rent modal view state
const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
