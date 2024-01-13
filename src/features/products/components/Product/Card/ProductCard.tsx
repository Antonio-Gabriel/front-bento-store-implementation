import { StartIcon } from "@/assets/icons/Star";
import { Button } from "@/components/ui/button";
import { FiShoppingCart } from "react-icons/fi";
import { LimitedText } from "../../LimitedText";
import { Spinner } from "@/components/ui/spinner";


type ProductCardProps = {
  title?: string;
  price?: string;
  image?: any;
  oldPrice?: string;
  rate?: number;
  description?: string;
  className?: string;
  isPending: boolean
  addProductIntoCart: () => void;
};

export function ProductCard({
  title,
  price,
  image,
  rate = 0,
  oldPrice,
  className,
  isPending,
  description,
  addProductIntoCart,
}: ProductCardProps) {  

  return (
    <div className={`flex flex-col items-start gap-y-4 ${className}`}>
      <div className="w-full h-56 rounded-lg bg-card flex-center">
        <img src={image ?? ""} alt={title ?? "Product"} height={300} className="w-auto h-auto object-cover" />
      </div>

      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col items-start gap-y-2">
          <span className="text-sm">{title}</span>
          <div className="flex items-center gap-x-2">
            <h5 className="font-bold">{price}</h5>
            <s className="text-sm text-border font-medium">{oldPrice}</s>
          </div>
          <div className="flex items-center gap-x-1">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span
                  className={
                    index + 1 <= rate ? "[&>svg_*]:fill-secondary" : ""
                  }
                >
                  {StartIcon}
                </span>
              ))}
          </div>          
        </div>          

        { isPending ? (
          <Button disabled={true} className="hover:bg-primary hover:brightness-75 transition-all duration-150">            
            <Spinner />
          </Button>
        ) : (
          <Button onClick={addProductIntoCart} className="hover:bg-primary hover:brightness-75 transition-all duration-150">
            <FiShoppingCart className="text-xl" />
          </Button>
        ) }
      </div>

      <LimitedText text={description ?? ''} limit={100} />
    </div>
  );
}
