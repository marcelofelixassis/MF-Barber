import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";

export default function Header() {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href={"/"}>
          <div className="relative h-[22px] w-[120px]">
            <Image alt="FSW Barber" src="/logo.svg" fill />
          </div>
        </Link>
        <SidebarSheet>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SidebarSheet>
      </CardContent>
    </Card>
  );
}
