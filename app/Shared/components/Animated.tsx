"use client";
import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

// ===== VARIANTS =====
const getVariants = (direction: "up" | "down" | "left" | "right"): Variants => {
  const distance = 40;
  let hidden = { opacity: 0, x: 0, y: 0 }; // x e y sempre presenti

  switch (direction) {
    case "up":
      hidden = { opacity: 0, x: 0, y: distance };
      break;
    case "down":
      hidden = { opacity: 0, x: 0, y: -distance };
      break;
    case "left":
      hidden = { opacity: 0, x: distance, y: 0 };
      break;
    case "right":
      hidden = { opacity: 0, x: -distance, y: 0 };
      break;
  }

  return {
    hidden,
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.15,
      },
    }),
  };
};

// ===== PROPS =====
interface AnimatedProps {
  index?: number; 
  children: ReactNode;
  amount?: number; 
  once?: boolean; 
  direction?: "up" | "down" | "left" | "right"; // nuova prop
}

// ===== COMPONENTE =====
const Animated: React.FC<AnimatedProps> = ({
  index = 0,
  amount = 0.2,
  once = false,
  direction = "up",
  children,
}) => {
  const variants = getVariants(direction);

  return (
    <motion.div
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};

export default Animated;
