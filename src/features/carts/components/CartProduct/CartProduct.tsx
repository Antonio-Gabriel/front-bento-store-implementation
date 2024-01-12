import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type CartProductProps = {
  image?: any;
  title?: string;
  price?: string;
  oldPrice?: string;
};

export function CartProduct({
  image,
  title,
  price,
  oldPrice,
}: CartProductProps) {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-x-4">
        <div className="w-24 h-24 p-3 rounded-xl bg-card flex-center">
          <Image src={image ?? ""} alt={title ?? ""} />
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <span className="text-sm">{title}</span>
            <div className="flex items-center gap-x-2">
              <h5 className="font-bold">{price}</h5>
              <s className="text-sm text-border font-medium">{oldPrice}</s>
            </div>
          </div>

          <div className="flex items-center gap-x-3">
            <Button
              variant="outline"
              className="border-2 w-[36px] border-border rounded-md p-0 flex-center h-[36px]"
            >
              <FiChevronLeft />
            </Button>
            <span>1</span>
            <Button
              variant="outline"
              className="border-2 w-[36px] border-border rounded-md p-0 flex-center h-[36px]"
            >
              <FiChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
