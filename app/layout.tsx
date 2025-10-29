import { cookies } from "next/headers";
import { Providers } from "./State/Providers";
import ModalProvider from "./Shared/components/Modal";
import ClientAppWrapper from "./ClientAppWrapper";
import Footer from "./footer";
import NavbarClient from "./navbar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'Poppins', sans-serif",
          color: "white",
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <Providers>
          <ModalProvider>
            {/* Client wrapper gestisce montaggio e loader */}
            <ClientAppWrapper token={token}>
              <NavbarClient token={token} />
              <main
                style={{
                  flex: 1, // 👈 permette al footer di restare in fondo
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {children}
              </main>

              {/* 👇 Aggiungiamo il footer qui */}
              <Footer token={token} />
            </ClientAppWrapper>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
