"use client"

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./Button";

// props
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

// empty state component
// displayed when no listings are found
// allows users to reset filters
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No listings found',
  subtitle = 'Try adjusting your search or filters to find what you are looking for.',
  showReset
}) => {
  // router
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">

        {/* filter reset button, reset by reloading page */}
        {showReset && (
          <Button outline label="Reset filters" onClick={() => router.push('/')} />
        )}
      </div>
    </div>
  )
};

export default EmptyState;
