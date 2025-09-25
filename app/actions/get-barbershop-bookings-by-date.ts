"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../lib/prisma";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

interface GetBookingsProps {
  barbershopId: string;
  date: Date;
}

export async function getBarbershopBookingsByDate({
  date,
  barbershopId,
}: GetBookingsProps) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  return db.booking.findMany({
    where: {
      AND: [
        {
          date: {
            lte: endOfDay(date),
            gte: startOfDay(date),
          },
        },
        {
          service: {
            barbershopId,
          },
        },
      ],
    },
  });
}
