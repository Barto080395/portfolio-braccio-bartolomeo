"use client";

import { keyframes, styled } from "@mui/system";

// Animazione di rotazione
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Wrapper del loader
const LoaderWrapper = styled("div")({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backgroundColor: "rgba(0,0,0,0.6)",
});

// Cerchio che ruota con i dots
const Spinner = styled("div")({
  position: "relative",
  width: 80,
  height: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  animation: `${spin} 1s linear infinite`,
});

// Singolo dot
const Dot = styled("div", {
    shouldForwardProp: (prop) => !["size", "angle", "color"].includes(prop as string),
  })<{ size: number; angle: number; color?: string }>(({ size, angle }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `${size}px`,
    height: `${size}px`,
    marginTop: `-${size / 2}px`,
    marginLeft: `-${size / 2}px`,
    backgroundColor: "#FFD700",
    borderRadius: "50%",
    transform: `rotate(${angle}deg) translate(25px) rotate(-${angle}deg)`,
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  }));
  

type LoaderProps = {
  dotColor?: string;
};

const Loader: React.FC<LoaderProps> = ({ dotColor }) => {
  const dots = [
    { size: 6, angle: 0 },
    { size: 6, angle: 72 },
    { size: 6, angle: 144 },
    { size: 6, angle: 216 },
    { size: 6, angle: 288 },
  ];

  return (
    <LoaderWrapper>
      <Spinner>
        {dots.map((dot, i) => (
          <Dot key={i} size={dot.size} angle={dot.angle} color={dotColor} />
        ))}
      </Spinner>
    </LoaderWrapper>
  );
};

export default Loader;
