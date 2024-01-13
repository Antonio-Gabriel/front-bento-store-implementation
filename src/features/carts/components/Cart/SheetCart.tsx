import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartContent } from "./CartContent";
import { FiShoppingCart } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export function SheetCart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="border-2 border-border rounded-md p-2 hover:brightness-75 transition duration-150">
          <FiShoppingCart />
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-y-12">
        <SheetHeader>
          <div className="flex">
            <span className="text-foreground flex items-center gap-x-4 border flex-none font-semibold text-lg uppercase border-primary rounded-full px-3 py-1">
              <FiShoppingCart />
              Carrinho
            </span>
          </div>
        </SheetHeader>

        <CartContent />

        <SheetFooter className="content-end">
          <Button className="uppercase w-full font-semibold">Finalizar Compra</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
