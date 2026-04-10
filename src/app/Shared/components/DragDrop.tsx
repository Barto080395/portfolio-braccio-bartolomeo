"use client";

import { useGlobalStore } from "@/app/State/GlobalContext";
import React, { useState } from "react";

type DragDropListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onChange: (newItems: T[]) => void;
};

export function DragDropList<T>({ items, renderItem, onChange }: DragDropListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { state, dispatch } = useGlobalStore();

  const cursor = state.cursor;

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;

    const newList = [...items];
    const [movedItem] = newList.splice(draggedIndex, 1);
    newList.splice(index, 0, movedItem);

    onChange(newList);
    setDraggedIndex(null);
  };

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          onMouseEnter={() => dispatch({ type: "SET_CURSOR", payload: "grab" })}
          onMouseLeave={() => dispatch({ type: "SET_CURSOR", payload: "default" })}
          style={{
            cursor: cursor,
            opacity: draggedIndex === index ? 0.5 : 1,
            flex: "1 1 200px",
            transition: "opacity 0.2s ease",
          }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </>
  );
}
