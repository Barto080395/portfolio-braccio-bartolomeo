"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { styled } from "@mui/system";
import { useGlobalStore } from "@/app/State/GlobalContext";
import Avatar, { avatarList } from "../Avatar";
import Link from "next/link";
import { Tooltip } from "@mui/material";

const Container = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
});

const ProfileImageWrapper = styled("div")({
  borderRadius: "50%",
  border: "3px solid #FFD166",
  width: 40,
  height: 40,
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 0 20px rgba(255,255,255,0.6), 0 6px 12px rgba(0,0,0,0.3)",
  },
});

const Menu = styled("div")({
  position: "absolute", // relativo al Container
  top: "48px", // distanza verticale dall'avatar
  right: 0, // allinea il menu al bordo destro del Container
  background: "rgba(29,43,54,0.95)",
  borderRadius: 12,
  padding: "10px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
  overflowY: "auto",
  maxHeight: 350,
  minWidth: 180,
  zIndex: 1001,

  // 🔹 Scroll invisibile
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
  scrollbarWidth: "none", // per Firefox
  msOverflowStyle: "none", // per IE/Edge
});

const MenuItemDiv = styled("div")<{ hovered: boolean }>(({ hovered }) => ({
  cursor: "pointer",
  fontSize: "16px",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "8px",
  ...(hovered && {
    transform: "translateY(-2px)",
    backgroundColor: "rgba(255, 209, 102, 0.1)",
    color: "#FFD166",
  }),
}));

const SubMenu = styled("div")({
  "&:hover": {
    transform: "translateY(-2px)",
    backgroundColor: "rgba(255, 209, 102, 0.1)",
  },
});

// Types
type SubRoute = {
  name: string;
  path: string;
  onClick?: () => void;
};

type MenuItem = {
  title: string;
  subRoutes?: SubRoute[];
};

type MiniWidgetProps = {
  token: string;
};

const MiniWidget: React.FC<MiniWidgetProps> = ({ token }) => {
  const { state, dispatch } = useGlobalStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  if (!token) return null;

  const isOwner = token === process.env.NEXT_PUBLIC_OWNER_TOKEN;

  const menuItems: MenuItem[] = [
    {
      title: "🏢 Carriera",
      subRoutes: [{ name: "🏆 Progressi", path: "/flowChart" }],
    },
    {
      title: "📝 Quiz (facoltativo)",
      subRoutes: [{ name: "🖋️ Fai il Quiz", path: "/quiz" }],
    },
  ];

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleSelectAvatar = (src: string) => {
    setAvatar(src);
    localStorage.setItem("avatar", src);
  };

  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSubMenu = (title: string) =>
    setOpenSubMenu(openSubMenu === title ? null : title);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("avatar");
    window.location.href = "/";
  };

  const isHovered = state.hoveredId === "widget-avatar";

  return (
    <Container>
      <div
        style={{
          position: "relative",
          cursor: state.cursor,
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
        onClick={handleToggleMenu}
        onMouseEnter={() =>
          dispatch({ type: "SET_HOVER", payload: "widget-avatar" })
        }
        onMouseLeave={() => dispatch({ type: "CLEAR_HOVER" })}
      >
        <Tooltip
          title={`Token: ${token}`}
          arrow
          placement="top"
          open={isHovered}
        >
          <ProfileImageWrapper>
            <Image
              src={avatar || (isOwner ? "/bart.webp" : "/bart.jpg")}
              alt="Avatar"
              width={40}
              height={40}
            />
          </ProfileImageWrapper>
        </Tooltip>
      </div>

      {menuOpen && (
        <Menu>
          {menuItems.map((item) => (
            <div key={item.title}>
              <MenuItemDiv
                hovered={state.hoveredId === item.title}
                onMouseEnter={() =>
                  dispatch({ type: "SET_HOVER", payload: item.title })
                }
                onMouseLeave={() => dispatch({ type: "CLEAR_HOVER" })}
                onClick={() => toggleSubMenu(item.title)}
              >
                {item.title}
              </MenuItemDiv>

              {item.subRoutes && openSubMenu === item.title && (
                <SubMenu>
                  {item.subRoutes.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path || "#"}
                      style={{ textDecoration: "none", display: "block" }}
                      onClick={() => {
                        setMenuOpen(false); // ✅ chiude il menu
                        setOpenSubMenu(null); // ✅ chiude il sottomenu
                      }}
                    >
                      <MenuItemDiv
                        hovered={state.hoveredId === sub.name}
                        onMouseEnter={() =>
                          dispatch({ type: "SET_HOVER", payload: sub.name })
                        }
                        onMouseLeave={() => dispatch({ type: "CLEAR_HOVER" })}
                      >
                        {sub.name}
                      </MenuItemDiv>
                    </Link>
                  ))}
                </SubMenu>
              )}
            </div>
          ))}

          <MenuItemDiv
            hovered={state.hoveredId === "CambiaAvatar"}
            onMouseEnter={() =>
              dispatch({ type: "SET_HOVER", payload: "CambiaAvatar" })
            }
            onMouseLeave={() => dispatch({ type: "CLEAR_HOVER" })}
            onClick={() => setShowAvatarPopup(true)}
          >
            👤 Cambia Avatar
          </MenuItemDiv>

          <MenuItemDiv
            hovered={state.hoveredId === "Logout"}
            onMouseEnter={() =>
              dispatch({ type: "SET_HOVER", payload: "Logout" })
            }
            onMouseLeave={() => dispatch({ type: "CLEAR_HOVER" })}
            onClick={handleLogout}
          >
            🚪 Esci
          </MenuItemDiv>
        </Menu>
      )}

      {showAvatarPopup && (
        <Avatar
          avatarList={avatarList}
          onSelect={handleSelectAvatar}
          onClose={() => setShowAvatarPopup(false)}
        />
      )}
    </Container>
  );
};

export default MiniWidget;
