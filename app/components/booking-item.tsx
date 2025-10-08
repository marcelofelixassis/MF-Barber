import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { format, isFuture } from "date-fns";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { ptBR } from "date-fns/locale";
import BarbershopPhone from "./barbershop-phone";
import { Button } from "./ui/button";

interface IBookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

export default function BookingItem({ booking }: IBookingItemProps) {
  const date = new Date(booking.date);

  const month = date.toLocaleString("pt-BR", { month: "long" });
  const day = date.toLocaleString("pt-BR", { day: "2-digit" });
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isConfirmed = isFuture(date);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-3 pl-3">
              <Badge
                variant={isConfirmed ? "default" : "outline"}
                className="w-fit"
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={booking.service.barbershop.imageUrl}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-7">
              <p className="text-sm">{month}</p>
              <p className="text-2xl">{day}</p>
              <p className="text-sm">{time}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5 overflow-auto px-0 [&::-webkit-scrollbar]:hidden">
        <SheetHeader className="border-b pb-2">
          <SheetTitle className="px-5 text-left">
            Informações da Reserva
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="flex-1 px-5">
          <div className="relative h-[180px] w-full">
            <Image
              alt="Mapa da barbearia"
              src="/map.png"
              fill
              className="rounded-xl object-cover"
            />
            <Card className="absolute bottom-5 left-1/2 w-[90%] -translate-x-1/2">
              <CardContent className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={booking.service.barbershop.imageUrl}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col">
                    <p className="max-w-full truncate font-bold">
                      {booking.service.barbershop.name}
                    </p>
                    <p className="max-w-full truncate text-xs">
                      {booking.service.barbershop.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Badge
            variant={isConfirmed ? "default" : "outline"}
            className="mt-6 w-fit"
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mt-3">
            <CardContent className="p-3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="font-bold">{booking.service.name}</span>
                  <span className="font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Data</span>
                  <span className="text-sm">
                    {format(booking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Horário</span>
                  <span className="text-sm">
                    {format(booking.date, "HH:MM", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Barbearia</span>
                  <span className="text-sm">
                    {booking.service.barbershop.name}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-3">
            {booking.service.barbershop.phones.map((phone, index) => (
              <BarbershopPhone key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-5 flex flex-row gap-3 px-5">
          <SheetClose asChild>
            <Button className="flex-1" variant="secondary">
              Voltar
            </Button>
          </SheetClose>
          {isConfirmed ? (
            <Button className="flex-1" variant="destructive">
              Cancelar Reserva
            </Button>
          ) : (
            <Button className="flex-1">Avaliar</Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
