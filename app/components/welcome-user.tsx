"use client";

import { authClient } from "../lib/auth-client";
import { Skeleton } from "./ui/skeleton";

export default function WelcomeUser() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <>
      {isPending ? (
        <Skeleton className="h-7 w-40 rounded-sm" />
      ) : (
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name}!`
            : "Olá, Faça seu Login!"}
        </h2>
      )}
    </>
  );
}
