"use client"

import { SheetCart } from "./SheetCart";
import { DrawerCart } from "./DrawerCart";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Cart() {
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1201px)");

  if (isLargeDevice) {
    return <SheetCart />;
  }

  return <DrawerCart />;
}
