"use client";

import { useEffect, useState } from "react";

// Render year on the client so it stays current on statically-exported pages
// without requiring a rebuild every January 1st.
const BUILD_YEAR = new Date().getFullYear();

export function FooterYear() {
  const [year, setYear] = useState(BUILD_YEAR);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span suppressHydrationWarning>{year}</span>;
}
