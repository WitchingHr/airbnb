import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";

import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

export const dynamic = 'force-dynamic'

// properties page
// fetches properties for current user and displays properties client
const PropertiesPage = async () => {
  // get current user
  const currentUser = await getCurrentUser();

  // if no user show empty state
  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="You must be signed in to view this page."
    />;
  }

  // get properties for current user
  const listings = await getListings({
    userId: currentUser.id,
  });

  // if no properties show empty state
  if (listings.length === 0) {
    return <EmptyState
      title="No properties found"
      subtitle="You haven't listed any properties yet."
    />;
  }

  // otherwise, show trips client
  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default PropertiesPage;
