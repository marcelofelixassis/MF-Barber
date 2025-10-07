import { headers } from "next/headers";
import BookingItem from "../components/booking-item";
import Header from "../components/header";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import { db } from "../lib/prisma";
import { isFuture } from "date-fns";

export default async function BookingsPage() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/");
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
      date: "asc",
    },
  });

  return (
    <div>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h2 className="mb-3 mt-6 text-xs font-bold text-gray-400">
          CONFIRMADOS
        </h2>
        <div className="flex flex-col gap-3">
          {bookings
            .filter((booking) => isFuture(booking.date))
            .map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold text-gray-400">
          FINALIZADOS
        </h2>
        <div className="flex flex-col gap-3">
          {bookings
            .filter((booking) => !isFuture(booking.date))
            .map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
        </div>
      </div>
    </div>
  );
}
