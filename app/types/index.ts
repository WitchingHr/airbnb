import { Listing, Reservation, User } from "@prisma/client";

// sanitized listing data for client
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

// sanitized reservation data for client
export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate"> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
}

// sanitized user data for client
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};