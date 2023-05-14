"use client"

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

// error page
// shows an error
const ErrorState: React.FC<ErrorStateProps> = ({
  error
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Uh oh!"
      subtitle="Something went wrong."
    />
  );
};

export default ErrorState;
