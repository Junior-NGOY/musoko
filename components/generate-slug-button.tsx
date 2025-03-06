"use client";

import { Button } from "@/components/ui/button";

interface GenerateSlugButtonProps {
  onClick: () => void;
}

export function GenerateSlugButton({ onClick }: GenerateSlugButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-2 top-2.5"
      onClick={onClick}
    >
      Generate
    </Button>
  );
}
