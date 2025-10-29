"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Loader from "./Shared/components/Loader";

type ClientAppWrapperProps = {
  token?: string | null;
  children: React.ReactNode;
};

export default function ClientAppWrapper({ token, children }: ClientAppWrapperProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const pathname = usePathname();

  const isSecretPage = pathname === "/secret";

  return (
    <>
      {/* Background full-screen */}
      {isSecretPage ? (
        // Solo gradient su /secret
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            overflow: "hidden",
            background: `
              linear-gradient(
                180deg,
                rgba(20,27,37,1) 0%,
                rgba(31,42,56,0.95) 25%,
                rgba(44,58,72,0.85) 60%,
                rgba(70,85,100,0.8) 100%
              )
            `,
          }}
        />
      ) : (
        // Solo immagine su tutte le altre pagine
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            overflow: "hidden",
          }}
        >
          <Image
            src="/sfondo_studio.jpg"
            alt="Sfondo"
            fill
            style={{ objectFit: "cover" }}
            priority
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
      )}

      {/* Loader overlay sopra tutto (solo per l’immagine) */}
      {!isSecretPage && !imageLoaded && <Loader dotColor="#ff1493" />}

      {/* Contenuto principale */}
      {children}
    </>
  );
}
