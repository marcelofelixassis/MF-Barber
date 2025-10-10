"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Barbershop, BarbershopService } from "@prisma/client";
import CreateBookingSheet from "./create-booking-sheet";
import { authClient } from "../lib/auth-client";
import AuthDialog from "./auth-dialog";

type BarbershopServiceItemProps = {
  service: BarbershopService;
  barbershop: Barbershop;
};

export default function BarbershopServiceItem({
  service,
  barbershop,
}: BarbershopServiceItemProps) {
  const { data: session } = authClient.useSession();

  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative min-h-[100px] min-w-[100px]">
          <Image
            alt={service.name}
            fill
            src={service.imageUrl}
            className="rounded-lg object-cover"
            sizes="100px"
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

            {session?.user ? (
              <CreateBookingSheet service={service} barbershop={barbershop}>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </CreateBookingSheet>
            ) : (
              <AuthDialog>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </AuthDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
