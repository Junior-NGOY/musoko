"use client";

import { Button } from "@/components/ui/button";
import type React from "react"; // Added import for React

interface ButtonWithClickProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function ButtonWithClick({ onClick, children }: ButtonWithClickProps) {
  return <Button onClick={onClick}>{children}</Button>;
}
