"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type LogoutDialogPropsType = {
  children: React.ReactNode;
  onLogoutComplete: () => void;
};

export default function LogoutDialog({
  children,
  onLogoutComplete,
}: LogoutDialogPropsType) {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();
    router.replace("/");
    router.refresh();
    onLogoutComplete();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[80vw] max-w-[400px] rounded p-5">
        <DialogHeader className="space-y-3 sm:text-center">
          <DialogTitle>Sair</DialogTitle>
          <DialogDescription>
            Deseja mesmo sair da plataforma?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            size="sm"
            onClick={signOut}
            className="w-full"
          >
            Sair
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
