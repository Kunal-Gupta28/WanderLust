"use client";

import { useEffect, useState } from "react";
import { ErrorDetourScene } from "../components/error-boundary";

export default function Error({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("WanderLust Route Error Caught:", error);
  }, [error]);

  return (
    <ErrorDetourScene
      error={error}
      onReset={reset}
      showDetails={showDetails}
      toggleDetails={() => setShowDetails(!showDetails)}
    />
  );
}
