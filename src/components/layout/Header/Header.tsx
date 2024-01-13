import Link from "next/link";
import { Fragment } from 'react';

import { FiUser } from "react-icons/fi";
import { HeaderLinks } from "./utils/links";
import { Cart } from '@/features/carts/components/Cart/Cart'

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="w-full sticky flex justify-between sm:px-4 lg:px-44 py-8 items-center border-b-2 border-b-[#2A2A2A50]">
      <Link
        href="#"
        className="font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent sm:text-xl lg:text-2xl"
      >
        BentoStore.<span className="text-foreground font-black">io</span>
      </Link>

      <nav className="sm:hidden lg:flex">
        <ul className="flex items-center gap-x-8">
          {HeaderLinks.map(
            (link: { label: string; route: string }, index: number) => (
              <Fragment key={index}>
                <li>
                  <Link
                    className="text-sm font-bold hover:brightness-50 transition duration-150"
                    href={link.route}
                  >
                    {link.label}
                  </Link>
                </li>

                {index + 1 < HeaderLinks.length && (
                  <Separator
                    orientation="vertical"
                    className="bg-border w-[2px] h-4"
                  />
                )}
              </Fragment>
            )
          )}
        </ul>
      </nav>

      <div className="flex items-start sm:gap-x-4 lg:gap-x-8">
        <div className="flex items-center sm:gap-x-4 lg:gap-x-8">
          <Link
            href="#"
            className="border-2 border-border rounded-md p-2 hover:brightness-75 transition duration-150"
          >
            <FiUser />
          </Link>

          <Cart />
        </div>

        <Avatar>
          <AvatarImage className="bg-border" src="" alt="user" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
