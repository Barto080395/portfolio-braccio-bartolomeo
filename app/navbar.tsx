"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import { useGlobalStore } from "./State/GlobalContext";
import { usePathname } from "next/navigation";
import { styled } from "@mui/system";
import LazyLoading from "./Shared/components/LazyLoading";
import Animated from "./Shared/components/Animated";
import WidgetWrapper from "./Shared/components/Widget/widgetWrapper";

const Nav = styled("nav")({
  background: "linear-gradient(90deg, #1d2b36, #2e4a62)",
  padding: "12px 2%",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 999,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
});

const LogoLink = styled(Link)({
  color: "#FFD166",
  fontSize: "1rem",
  fontWeight: 700,
  textDecoration: "none",
  letterSpacing: "1px",
  display: "flex",
  justifyContent: "space-between",
});

const LinksWrapper = styled("div")({
  display: "flex",
  gap: "12px",
});

const RightWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",

  "@media (max-width: 1023px)": {
    flexDirection: "row-reverse",
    gap: "8px",
  },
});

const HamburgerButton = styled("button")({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#FFFFFF",
  fontSize: "1.5rem",
});

const MobileMenu = styled("div")({
  position: "absolute",
  top: "60px",
  right: "0px",
  background: "rgba(29,43,54,0.95)",
  padding: "12px",
  borderRadius: "12px 0 0 12px", 
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  zIndex: 1000,
});

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isHovered" && prop !== "cursor",
})<NavLinkProps>(({ isHovered, cursor }) => ({
  color: isHovered ? "#FFD166" : "#FFFFFF",
  textDecoration: "none",
  fontWeight: 500,
  letterSpacing: "0.5px",
  fontSize: "1rem",
  cursor: cursor,
  padding: "8px 12px",
  borderRadius: "8px",
  ...(isHovered && {
    transform: "translateY(-2px)",
    backgroundColor: "rgba(255, 209, 102, 0.1)",
  }),
}));

interface NavbarProps {
  token?: string;
}

interface NavLinkProps {
  isHovered: boolean;
  cursor: string;
}

const NavbarClient: React.FC<NavbarProps> = ({ token }) => {
  const { state, dispatch } = useGlobalStore();
  const cursor = state.cursor;
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!token || pathname === "/") return null;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = useMemo(
    () => [
      { href: "/secret", label: "🏠 Home" },
      { href: "/home", label: "💼 Portfolio" },
      { href: "/about", label: "👨‍💻 About" },
      { href: "/skills", label: "🛠️ Skills" },
      { href: "/projects", label: "📁 Projects" },
      { href: "/contact", label: "✉️ Contatti" },
    ],
    []
  );

  return (
    <Nav>
      <LogoLink href="/secret" aria-label="Homepage">
        <Image
          src="/icons8-homeadvisor.svg"
          alt="Logo"
          width={40}
          height={40}
        />
      </LogoLink>

      <LazyLoading rootMargin="0px">
        <RightWrapper>
          <Animated once amount={0.1}>
            {isMobile ? (
              <div>
                <HamburgerButton
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Menu"
                >
                  ☰
                </HamburgerButton>

                {menuOpen && (
                  <MobileMenu>
                    {links.map((link) => {
                      const isHovered = state.hoveredId === link.href;
                      return (
                        <NavLink
                          key={link.href}
                          href={link.href}
                          isHovered={isHovered}
                          cursor={cursor ?? "default"}
                          onClick={() => setMenuOpen(false)}
                          onMouseEnter={() => {
                            dispatch({ type: "SET_HOVER", payload: link.href });
                            dispatch({
                              type: "SET_CURSOR",
                              payload: "pointer",
                            });
                          }}
                          onMouseLeave={() => {
                            dispatch({ type: "CLEAR_HOVER" });
                            dispatch({
                              type: "SET_CURSOR",
                              payload: "default",
                            });
                          }}
                        >
                          {link.label}
                        </NavLink>
                      );
                    })}
                  </MobileMenu>
                )}
              </div>
            ) : (
              <LinksWrapper>
                {links.map((link) => {
                  const isHovered = state.hoveredId === link.href;
                  return (
                    <NavLink
                      key={link.href}
                      href={link.href}
                      isHovered={isHovered}
                      cursor={cursor ?? "default"}
                      onMouseEnter={() => {
                        dispatch({ type: "SET_HOVER", payload: link.href });
                        dispatch({ type: "SET_CURSOR", payload: "pointer" });
                      }}
                      onMouseLeave={() => {
                        dispatch({ type: "CLEAR_HOVER" });
                        dispatch({ type: "SET_CURSOR", payload: "default" });
                      }}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </LinksWrapper>
            )}
          </Animated>
          {token && <WidgetWrapper token={token} />}
        </RightWrapper>
      </LazyLoading>
    </Nav>
  );
};

export default NavbarClient;
