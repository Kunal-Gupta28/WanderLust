"use client";

import { useEffect, useState } from "react";
import { ErrorDetourScene } from "../components/error-boundary";

export default function GlobalError({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("WanderLust Global Error Caught:", error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Detour Ahead — WanderLust</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#f7f5ef] text-[#17221d] m-0 font-sans" suppressHydrationWarning>
        <ErrorDetourScene
          error={error}
          onReset={reset}
          showDetails={showDetails}
          toggleDetails={() => setShowDetails(!showDetails)}
        />
      </body>
    </html>
  );
}
