"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toSlug } from "@/lib/utils";
import type { Control } from "react-hook-form";
import type { IProductInput } from "@/types";

interface SlugFieldProps {
  control: Control<IProductInput>;
  getValue: (field: "name") => string;
  setValue: (field: "slug", value: string) => void;
}

export function SlugField({ control, getValue, setValue }: SlugFieldProps) {
  return (
    <FormItem className="w-full">
      <FormLabel>Slug</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            placeholder="Enter product slug"
            className="pl-8"
            {...control.register("slug")}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2.5"
            onClick={() => {
              const name = getValue("name");
              setValue("slug", toSlug(name));
            }}
          >
            Generate
          </Button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
