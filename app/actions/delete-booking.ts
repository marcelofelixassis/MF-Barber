"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { db } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBooking(bookingId: string) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
}
