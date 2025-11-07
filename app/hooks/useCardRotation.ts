"use client";
import { useState } from "react";

interface Rotation {
  x: number;
  y: number;
}

const ROTATION_SENSITIVITY = 10;

export const useCardRotation = () => {
  const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / ROTATION_SENSITIVITY;
    const rotateY = (centerX - x) / ROTATION_SENSITIVITY;

    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return { rotation, handleMouseMove, resetRotation };
};
