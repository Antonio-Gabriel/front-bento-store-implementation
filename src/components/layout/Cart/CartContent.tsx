import { mouseImage } from '@/assets';
import { Separator } from '@radix-ui/react-separator';
import { CartProduct } from '@/features/carts/components/CartProduct/CartProduct';

export function CartContent({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col flex-1 sm:px-4 lg:px-0 gap-8 w-full ${className} overflow-y-auto`}
    >
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />{' '}
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />{' '}
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />
      <CartProduct
        image={mouseImage}
        title="Logitech MX Master 3s"
        price="R$349,00"
      />
      <div className="w-full flex flex-col  gap-y-4">
        <Separator orientation="horizontal" className="bg-border h-[2px]" />
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">R$ 1200, 00</span>
        </div>
      </div>
    </div>
  );
}
