import Header from "./components/header";
import { Button } from "./components/ui/button";
import Image from "next/image";
import { db } from "./lib/prisma";
import BarbershopItem from "./components/barbershop-item";
import { quickSearchOptions } from "./consts/quick-search-options";
import BookingItem from "./components/booking-item";
import WelcomeUser from "./components/welcome-user";
import BarbershopSearchForm from "./components/barbershop-search-form";
import Link from "next/link";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />
      <div className="p-5">
        <WelcomeUser />
        <p>Terça feira, 05 de agosto.</p>

        <div className="mt-6">
          <BarbershopSearchForm />
        </div>

        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button asChild key={option.name} variant="secondary">
              <Link href={`/barbershop?search=${option.name}`}>
                <Image
                  alt={option.name}
                  src={option.image}
                  height={16}
                  width={16}
                />
                {option.name}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner.svg"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold text-gray-400">
          AGENDAMENTOS
        </h2>

        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold text-gray-400">
          RECOMENDADOS
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold text-gray-400">POPULARES</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
