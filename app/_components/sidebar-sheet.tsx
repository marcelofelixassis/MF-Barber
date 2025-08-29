import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { quickSearchOptions } from "../consts/quick-search-options";

type SidebarSheetProps = {
  children: React.ReactNode;
};

export default function SidebarSheet({ children }: SidebarSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto p-5">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex gap-3 border-b p-5">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
          </Avatar>
          <div className="h-12">
            <p className="font-bold">Pedro Gonçalves</p>
            <p className="text-xs">pedrogoncalves@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-b py-6">
          <SheetClose asChild>
            <Button asChild className="justify-start">
              <Link href="/">
                <HomeIcon />
                Ínicio
              </Link>
            </Button>
          </SheetClose>
          <Button variant="ghost" className="justify-start">
            <CalendarIcon />
            Agendamentos
          </Button>
        </div>

        <div className="flex flex-col gap-1 border-b py-6">
          {quickSearchOptions.map((option) => (
            <Button key={option.name} variant="ghost" className="justify-start">
              <Image
                alt={option.name}
                src={option.image}
                height={16}
                width={16}
              />
              {option.name}
            </Button>
          ))}
        </div>

        <div className="py-6">
          <Button variant="ghost" className="w-full justify-start">
            <LogOutIcon />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
