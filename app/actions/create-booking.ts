"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { db } from "../lib/prisma";

type CreateBookingPayloadType = {
  serviceId: string;
  date: Date;
};

export async function createBooking(payload: CreateBookingPayloadType) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  await db.booking.create({
    data: { ...payload, userId },
  });
}
