import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CartContent } from "./CartContent";
import { Button } from "@/components/ui/button";
import { FiShoppingCart } from "react-icons/fi";

export function DrawerCart() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="border-2 border-border rounded-md p-2 hover:brightness-75 transition duration-150">
          <FiShoppingCart />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-y-12">
        <DrawerHeader>
          <div className="flex">
            <span className="text-foreground flex items-center gap-x-4 border flex-none font-semibold text-base uppercase border-primary rounded-full px-3 py-1">
              <FiShoppingCart />
              Carrinho
            </span>
          </div>
        </DrawerHeader>

        <CartContent className="pb-12" />

        <DrawerFooter className="content-end">
          <Button className="uppercase w-full font-semibold">
            Finalizar Compra
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
