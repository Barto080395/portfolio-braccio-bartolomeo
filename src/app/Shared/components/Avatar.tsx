"use client";

import React from "react";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import { createPortal } from "react-dom";

const useStyles = makeStyles(() => ({
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#1f2f3a",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 6px 25px rgba(0,0,0,0.6)",
    zIndex: 2000,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    zIndex: 1999,
  },
  avatarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  avatarOption: {
    cursor: "pointer",
    borderRadius: "50%",
    border: "2px solid transparent",
    "&:hover": {
      border: "2px solid #FFD166",
    },
  },
}));

type AvatarProps = {
  avatarList: string[];
  onSelect: (src: string) => void;
  onClose: () => void;
};

export const avatarList = [
  "/avatar/3d-avatar.webp",
  "/avatar/avatar-female.jpg",
  "/avatar/avatar1.webp",
  "/avatar/avatar3.jpg",
  "/avatar/avatar4.webp",
  "/avatar/avatar5.jpg",
  "/avatar/happy-man-white.jpg",
  "/avatar/africa.jpg",
  "/avatar/avatarBarba.webp",
  "/avatar/avatarWoman.jpg",
  "/avatar/businessMan.webp",
  "/bart.jpg",
];

const Avatar: React.FC<AvatarProps> = ({ avatarList, onSelect, onClose }) => {
  const classes = useStyles();

  return createPortal(
    <>
      <div className={classes.overlay} onClick={onClose} />
      <div className={classes.popup}>
        <h3 style={{ color: "#fff", marginBottom: "10px" }}>
          Scegli un Avatar
        </h3>
        <div className={classes.avatarGrid}>
          {avatarList.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Avatar ${index + 1}`}
              width={60}
              height={60}
              className={classes.avatarOption}
              onClick={() => {
                onSelect(src);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Avatar;
