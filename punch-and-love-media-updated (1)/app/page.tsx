import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const Search = dynamic(() => import("./components/Search"), { ssr: false });
const Results = dynamic(() => import("./components/Results"), { ssr: false });

export default function HomePage() {
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen p-6">
      <Suspense fallback={<p>Loading search...</p>}>
        <Search onError={setError} />
      </Suspense>
      {error && <p className="text-red-500">Error: {error}</p>}
      <Suspense fallback={<p>Loading results...</p>}>
        <Results />
      </Suspense>
    </div>
  );
}
