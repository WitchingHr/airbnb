"use client"

import { PuffLoader } from "react-spinners";

// loader component
// shows a loader
const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
