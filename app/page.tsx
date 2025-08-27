import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";

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
        <h2 className="text-xl font-bold">Olá, Marcelo</h2>
        <p>Terça feira, 05 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca aqui..." />
          <Button size="icon">
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          <Button variant="secondary">
            <Image alt="Cabelo" src="/hair.svg" height={16} width={16} />
            Cabelo
          </Button>
          <Button variant="secondary">
            <Image alt="Barba" src="/mustache.svg" height={16} width={16} />
            Barba
          </Button>
          <Button variant="secondary">
            <Image
              alt="Acabamento"
              src="/razor-double-edge.svg"
              height={16}
              width={16}
            />
            Acabamento
          </Button>
          <Button variant="secondary">
            <Image
              alt="Acabamento"
              src="/mingcute_eyebrow.svg"
              height={16}
              width={16}
            />
            Sobrancelha
          </Button>
          <Button variant="secondary">
            <Image
              alt="Acabamento"
              src="/ph_towel.svg"
              height={16}
              width={16}
            />
            Massagem
          </Button>
          <Button variant="secondary">
            <Image
              alt="Acabamento"
              src="/hugeicons_shampoo.svg"
              height={16}
              width={16}
            />
            Hidratação
          </Button>
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

        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-3 pl-3">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-7">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">09:45</p>
            </div>
          </CardContent>
        </Card>

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
      <Footer />
    </div>
  );
}
