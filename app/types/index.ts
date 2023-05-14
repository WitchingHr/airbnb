import { Listing, User } from "@prisma/client";

// sanitized listing data for client
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

// sanitized user data for client
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};