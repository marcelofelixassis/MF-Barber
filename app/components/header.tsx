import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SidebarSheet from "./sidebar-sheet";

export default function Header() {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image alt="FSW Barber" src="/logo.svg" height={18} width={120} />
        <SidebarSheet>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SidebarSheet>
      </CardContent>
    </Card>
  );
}
