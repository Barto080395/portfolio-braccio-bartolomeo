"use client";
import React from "react";

type RocketProps = {
  isLaunching: boolean;
  style?: React.CSSProperties;
};

const Rocket = ({ isLaunching, style }: RocketProps) => {
  return (
    <span
      className={isLaunching ? "rocket rocket--launch" : "rocket"}
      aria-hidden
      style={{
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "1.5rem",
        pointerEvents: "none",
        ...style,
      }}
    >
      🚀
      <style jsx>{`
        .rocket--launch {
          animation: launch 1.1s ease-in forwards;
        }

        @keyframes launch {
          0% {
            transform: translateY(-50%) translateX(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          30% {
            transform: translateY(-60px) rotate(-10deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(-300px) rotate(-45deg) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
};

export default Rocket;
