import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header/Header";
import { BaseInput } from "@/components/ui/Input/BaseInput";
import { PasswordInput } from "@/components/ui/Input/PasswordInput";

export default function Home() {
  return (
    <div className="w-full flex flex-col h-screen">
      <Header />

      <div className="w-full sm:px-4 lg:px-8 flex-1 flex-center">
        <form action="" className="w-96 flex flex-col gap-5">
          <BaseInput
            label="Email"
            placeholder="Digite seu email"
            type="email"
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
          />

          <div className="w-full flex justify-between">
            <div className="flex items-center gap-x-2">
              <Checkbox
                className="border-border border-2"
                id="remember_password"
              />
              <label
                htmlFor="remember_password"
                className="text-sm text-zinc-400"
              >
                Lembrar senha
              </label>
            </div>

            <Link href="#" className="font-medium text-primary text-sm">
              Esqueceu sua senha?
            </Link>
          </div>

          <Button className="bg-primary hover:bg-primary hover:brightness-75 transition-all duration-150 w-full py-6 rounded-md">
            Login
          </Button>

          <div className="flex items-center w-full gap-x-4">
            <Separator className="bg-border flex-1" />
            <span className="text-zinc-500 text-sm">Ou use uma rede</span>
            <Separator className="bg-border flex-1" />
          </div>
          <Button
            className="border-2 border-border rounded-md flex-center gap-x-3 py-6"
            variant="outline"
          >
            <FcGoogle />
            Entrar com o Google
          </Button>
        </form>
      </div>
    </div>
  );
}
