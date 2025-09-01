import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BarbershopService } from "@prisma/client";

type BarbershopServiceItemProps = {
  service: BarbershopService;
};

export default function BarbershopServiceItem({
  service,
}: BarbershopServiceItemProps) {
  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative min-h-[100px] min-w-[100px]">
          <Image
            alt={service.name}
            fill
            src={service.imageUrl}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm font-semibold">{service.name}</p>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </span>
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
