"use server";

import { db } from "../lib/prisma";

type CreateBookingPayloadType = {
  serviceId: string;
  userId: string;
  date: Date;
};

export async function createBooking(payload: CreateBookingPayloadType) {
  await db.booking.create({
    data: payload,
  });
}
