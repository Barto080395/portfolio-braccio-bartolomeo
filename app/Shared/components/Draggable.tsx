"use client";
import React, { ReactNode, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useGlobalStore } from "@/app/State/GlobalContext";

type DraggableWrapperProps = {
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  bounds?: string | { left: number; top: number; right: number; bottom: number };
};

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  defaultPosition = { x: 0, y: 0 },
  bounds = "parent",
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { state, dispatch } = useGlobalStore();

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={defaultPosition}
      bounds={bounds}
      onStart={() => {
        setIsDragging(true);
        dispatch({ type: "SET_CURSOR", payload: "grabbing" }); // 👈 cambia il cursore globale
      }}
      onStop={() => {
        setIsDragging(false);
        dispatch({ type: "SET_CURSOR", payload: "grab" }); // 👈 torna al grab
      }}
    >
      <div
        ref={nodeRef}
        style={{
          cursor: state.cursor, // ✅ usa il cursore globale
          display: "inline-block",
          userSelect: "none",
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;
