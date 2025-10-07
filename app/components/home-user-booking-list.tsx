import { db } from "../lib/prisma";
import BookingItem from "./booking-item";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

export default async function HomeUserBookingList() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session?.user) {
    return null;
  }

  const { user } = session;

  const bookings = await db.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  if (bookings.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold text-gray-400">
        AGENDAMENTOS
      </h2>
      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={bookings.length > 1 ? "min-w-[90%]" : "w-full"}
          >
            <BookingItem booking={booking} />
          </div>
        ))}
      </div>
    </>
  );
}
