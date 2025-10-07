import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { isFuture } from "date-fns";

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
  );
}
