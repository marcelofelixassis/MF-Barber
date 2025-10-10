import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface IBarbershopItemProps {
  barbershop: Barbershop;
}

export default function BarbershopItem({ barbershop }: IBarbershopItemProps) {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-1">
        <div className="relative h-[159px] w-full">
          <Image
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            className="rounded-2xl object-cover"
            sizes="167px"
          />
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 flex gap-1"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="font-semibold">5,0</p>
          </Badge>
        </div>
        <div className="p-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" asChild className="mt-3 w-full">
            <Link href={`/barbershop/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
