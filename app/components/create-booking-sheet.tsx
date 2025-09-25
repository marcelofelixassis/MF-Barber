"use client";

import { ptBR } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Barbershop, BarbershopService } from "@prisma/client";
import { addMonths, format, set, startOfDay } from "date-fns";
import { toast } from "sonner";
import { createBooking } from "../actions/create-booking";

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

type CreateBookingSheetPropsType = {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
  children: React.ReactNode;
};

export default function CreateBookingSheet({
  service,
  barbershop,
  children,
}: CreateBookingSheetPropsType) {
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();

  const isDisabledConfirmButton = !selectedDay || !selectedTime;

  function resetBookingData() {
    setSelectedDay(new Date());
    setSelectedTime(undefined);
  }

  function handleChangeDate(newDate?: Date) {
    if (newDate) {
      setSelectedDay(newDate);
    }
  }

  function handleChangeTime(newTime: string) {
    setSelectedTime(newTime);
  }

  function handleOnOpenChange(isOpen: boolean) {
    setOpen(isOpen);
  }

  async function handleCreateNewBooking() {
    if (isDisabledConfirmButton) {
      toast.info("Selecione uma data e horário");
      return;
    }

    try {
      const bookingDate = set(selectedDay, {
        hours: Number(selectedTime.split(":")[0]),
        minutes: Number(selectedTime.split(":")[1]),
      });

      await createBooking({
        serviceId: service.id,
        date: bookingDate,
      });

      setOpen(false);
      toast.success("Reserva confirmada!");
    } catch (e) {
      const error = e as Error;
      console.error("Error on create a new booking", error);
      toast.error(error.message || "Erro ao criar reserva!");
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOnOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        onCloseAutoFocus={resetBookingData}
        className="overflow-auto px-0 [&::-webkit-scrollbar]:hidden"
      >
        <SheetHeader>
          <SheetTitle className="px-5 text-left">Fazer Reserva</SheetTitle>
        </SheetHeader>
        <div className="border-b border-solid p-5">
          <Calendar
            mode="single"
            locale={ptBR}
            selected={selectedDay}
            onSelect={handleChangeDate}
            disabled={{
              before: startOfDay(new Date()),
              after: addMonths(new Date(), 1),
            }}
            className="capitalize-calendar w-full p-0"
          />
        </div>
        <div className="flex gap-3 overflow-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
          {TIME_LIST.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              onClick={() => handleChangeTime(time)}
              className="rounded-full"
            >
              {time}
            </Button>
          ))}
        </div>
        {selectedTime && (
          <div className="px-5 pt-5">
            <Card>
              <CardContent className="p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="font-bold">{service.name}</span>
                    <span className="font-bold">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(service.price))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Data</span>
                    <span className="text-sm">
                      {format(selectedDay, "d 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Horário</span>
                    <span className="text-sm">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Barbearia</span>
                    <span className="text-sm">{barbershop.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <SheetFooter className="px-5 pt-5">
          <Button onClick={handleCreateNewBooking}>Confirmar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
