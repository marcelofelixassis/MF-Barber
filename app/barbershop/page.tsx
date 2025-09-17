import BarbershopItem from "../components/barbershop-item";
import BarbershopSearchForm from "../components/barbershop-search-form";
import Header from "../components/header";
import { db } from "../lib/prisma";

type BarbershopPagePropsType = {
  searchParams: {
    search?: string;
  };
};

export default async function BarbershopPage({
  searchParams,
}: BarbershopPagePropsType) {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParams?.search,
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: searchParams?.search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <div>
          <BarbershopSearchForm initialSearch={searchParams?.search} />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold text-gray-400">
          {`RESULTADOS PARA "${searchParams?.search?.toUpperCase() || ""}"`}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
