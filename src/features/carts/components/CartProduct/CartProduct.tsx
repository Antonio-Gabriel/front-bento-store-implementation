import { Button } from "@/components/ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type CartProductProps = {
  image?: any;
  title?: string;
  price?: string;
  quantity: number
  oldPrice?: string;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
};

export function CartProduct({
  image,
  title,
  price,
  quantity,
  oldPrice,
  increaseQuantity,
  decreaseQuantity
}: CartProductProps) {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-x-4">
        <div className="w-24 h-24 p-3 rounded-xl bg-card flex-center">
          <img src={image ?? ""} alt={title ?? ""} className="w-auto h-auto object-cover" />
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
              onClick={decreaseQuantity}
              variant="outline"
              className="border-2 w-[36px] border-border rounded-md p-0 flex-center h-[36px]"
            >
              <FiChevronLeft />
            </Button>
            <span>{quantity}</span>
            <Button
              onClick={increaseQuantity}
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
