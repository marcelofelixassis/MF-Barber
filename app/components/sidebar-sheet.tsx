"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { quickSearchOptions } from "../consts/quick-search-options";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "../lib/auth-client";
import AuthDialog from "./auth-dialog";
import { cn } from "../lib/utils";
import LogoutDialog from "./logout-dialog";
import { useState } from "react";

type SidebarSheetProps = {
  children: React.ReactNode;
};

export default function SidebarSheet({ children }: SidebarSheetProps) {
  const { data: session } = authClient.useSession();

  const [sheetOpen, setSheetOpen] = useState(false);

  function closeSheet() {
    setSheetOpen(false);
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto p-5">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        {session?.user ? (
          <div className="flex gap-3 border-b py-5">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback>
                {session.user.name
                  ? session.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="h-12">
              <p className="font-bold">{session.user.name}</p>
              <p className="text-xs">{session.user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b py-5">
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <AuthDialog>
              <Button size="icon">
                <LogInIcon />
              </Button>
            </AuthDialog>
          </div>
        )}

        <div className="flex flex-col gap-1 border-b py-6">
          <SheetClose asChild>
            <Button asChild className="justify-start">
              <Link href="/">
                <HomeIcon />
                Ínicio
              </Link>
            </Button>
          </SheetClose>
          {session?.user ? (
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/bookings">
                <CalendarIcon />
                Agendamentos
              </Link>
            </Button>
          ) : (
            <AuthDialog>
              <Button variant="ghost" className="justify-start">
                <CalendarIcon />
                Agendamentos
              </Button>
            </AuthDialog>
          )}
        </div>

        <div
          className={cn("flex flex-col gap-1 py-6", {
            "border-b": session?.user,
          })}
        >
          {quickSearchOptions.map((option) => (
            <SheetClose asChild key={option.name}>
              <Button asChild variant="ghost" className="justify-start">
                <Link href={`/barbershop?search=${option.name}`}>
                  <Image
                    alt={option.name}
                    src={option.image}
                    height={16}
                    width={16}
                  />
                  {option.name}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {session?.user && (
          <div className="py-6">
            <LogoutDialog onLogoutComplete={closeSheet}>
              <Button variant="ghost" className="w-full justify-start">
                <LogOutIcon />
                Sair da conta
              </Button>
            </LogoutDialog>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
