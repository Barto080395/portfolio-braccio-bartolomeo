"use client";

import React from "react";
import Link from "next/link";
import { styled } from "@mui/system";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface FooterProps {
  token?: string;
}

const FooterContainer = styled("footer")({
  backgroundColor: "#0f1b23",
  color: "#d1d5db",
  padding: "60px 20px 30px 20px",
  borderTop: "4px solid #f1c40f",
  fontFamily: "'Poppins', sans-serif",
});

const FooterGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

const SectionTitle = styled("h3")({
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "#FFD166",
  marginBottom: "12px",
  textAlign: "center",
});

const FooterLink = styled(Link)({
  display: "block",
  color: "#d1d5db",
  fontSize: "0.9rem",
  textDecoration: "none",
  marginBottom: "6px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ffffff",
  },
});

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
});

const ListItem = styled("li")({
  fontSize: "0.9rem",
  textAlign: "center",
});

const FooterBottom = styled("div")({
  borderTop: "1px solid #374151",
  marginTop: "40px",
  paddingTop: "15px",
  textAlign: "center",
  fontSize: "0.85rem",
  color: "#9ca3af",
});

const Footer: React.FC<FooterProps> = ({ token }) => {
  const pathname = usePathname();

  // 🔹 Controllo visibilità
  if (!token || pathname === "/") return null;

  return (
    <FooterContainer>
      <FooterGrid>
        {/* Logo + Slogan */}
        <Link
          href="/secret"
          style={{
            color: "#ffcc00", // colore finale
            fontSize: "1.2rem", // camelCase
            marginTop: "12px",
            fontWeight: 700,
            fontStyle: "italic",
            textDecoration: "none",
            letterSpacing: "1px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
          aria-label="Homepage"
        >
          <Image
            src="/icons8-homeadvisor.svg"
            alt="Logo"
            width={120}
            height={120}
          />
          <span
            style={{ lineHeight: "1.2", textAlign: "center", display: "block" }}
          >
            “I transform ideas into digital reality.”
          </span>
        </Link>

        {/* Sezioni di Interesse */}
        <div>
          <SectionTitle>Sezioni di Interesse</SectionTitle>
          <List>
            <ListItem>
              <FooterLink href="/secret">🏠 Home – Benvenuto</FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/home">💼 Portfolio – I miei lavori</FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/about">ℹ️ About – Chi sono</FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/skills">
                🛠️ Skills – Le mie competenze
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/projects">
                📁 Projects – I miei progetti
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/contact">✉️ Contact – Contattami</FooterLink>
            </ListItem>
          </List>
        </div>

        {/* Servizi Offerti */}
        <div>
          <SectionTitle>Servizi e Supporto</SectionTitle>
          <List>
            <ListItem>
              <FooterLink href="/contact">
                🌐 Sviluppo siti web moderni e responsivi
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/contact">
                🎨 Design professionale e interfacce intuitive
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/contact">
                ⚙️ Ottimizzazione SEO per visibilità e performance
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="/contact">
                🛠️ Supporto, manutenzione e aggiornamenti continui
              </FooterLink>
            </ListItem>
          </List>
        </div>

        {/* Contatti */}
        <div>
          <SectionTitle>Contatti</SectionTitle>
          <List>
            <ListItem>
              📧{" "}
              <a
                href="mailto:bartolomeobraccio95@live.com"
                style={{ color: "#d1d5db", textDecoration: "none" }}
              >
                bartolomeobraccio95@live.com
              </a>
            </ListItem>
            <ListItem>
              📞 Cell: <span style={{ color: "#fff" }}>+39 3664099541</span>
            </ListItem>
            <ListItem>
              📍 Massima disponibilità per progetti locali o collaborazioni a
              distanza.
            </ListItem>
          </List>
        </div>
      </FooterGrid>

      <FooterBottom>
        © 2025 <span style={{ color: "#FFD166" }}>Bartolomeo Braccio</span> –
        Web Developer. Tutti i diritti riservati.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
