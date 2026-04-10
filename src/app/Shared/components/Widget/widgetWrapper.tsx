"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MiniWidget from "./MiniWidget";

interface WidgetWrapperProps {
  token: string;
}

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ token }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Evita rendering lato server e flicker
  useEffect(() => setMounted(true), []);

  // Controllo: token mancante o homepage => non renderizzare
  if (!mounted || !token || pathname === "/") return null;

  return <MiniWidget token={token} />;
};

export default WidgetWrapper;
