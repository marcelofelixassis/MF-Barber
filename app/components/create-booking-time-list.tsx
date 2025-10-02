"use client";

import { useEffect, useState } from "react";
import { getBarbershopBookingsByDate } from "../actions/get-barbershop-bookings-by-date";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Booking } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";

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

function formatAvailableTimes(date: Date, bookings: Booking[]) {
  const now = new Date();
  let availableTimes = [...TIME_LIST];

  if (date.toDateString() === now.toDateString()) {
    availableTimes = availableTimes.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number);

      const slotDate = new Date(date);
      slotDate.setHours(hours, minutes, 0, 0);

      return slotDate.getTime() > now.getTime();
    });
  }

  if (bookings.length === 0) {
    return availableTimes;
  }

  const unavailableTimes = bookings.map((b) =>
    b.date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  return availableTimes.filter((time) => !unavailableTimes.includes(time));
}

type CreateBookingTimeListPropsType = {
  date: Date;
  barbershopId: string;
  currentTime?: string;
  setTime: (newTime: string) => void;
};

export default function CreateBookingTimeList({
  date,
  barbershopId,
  currentTime,
  setTime,
}: CreateBookingTimeListPropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [avaliableTimes, setAvaliableTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const bookings = await getBarbershopBookingsByDate({
          date,
          barbershopId,
        });
        const result = formatAvailableTimes(date, bookings);
        setAvaliableTimes(result);
      } catch (e) {
        const error = e as Error;
        console.error("Error on find barbershop bookings by date", error);
        toast.error(error.message || "Erro ao procurar horários disponíveis!");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [date, barbershopId]);

  if (isLoading) {
    return (
      <>
        {TIME_LIST.map((t) => (
          <Skeleton key={t} className="h-10 min-w-16 rounded-full" />
        ))}
      </>
    );
  }

  if (avaliableTimes.length === 0) {
    return (
      <span className="flex h-10 items-center">Nenhum horário disponível</span>
    );
  }

  return (
    <>
      {avaliableTimes.map((time) => (
        <Button
          key={time}
          variant={currentTime === time ? "default" : "outline"}
          onClick={() => setTime(time)}
          className="rounded-full"
        >
          {time}
        </Button>
      ))}
    </>
  );
}
