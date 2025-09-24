"use client";

import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

type PendingProviderType = "github" | "google";

type AuthDialogPropsType = {
  children: React.ReactNode;
};

export default function AuthDialog({ children }: AuthDialogPropsType) {
  const [isPending, setIsPending] = useState<PendingProviderType | null>(null);

  async function githubConnection() {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: window.location.href,
      },
      {
        onRequest: () => {
          setIsPending("github");
        },
        onSuccess: () => {
          setIsPending(null);
        },
        onError: ({ error }) => {
          setIsPending(null);
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[80vw] max-w-[400px] rounded p-5">
        <DialogHeader className="space-y-3 sm:text-center">
          <DialogTitle>Faça login na plataforma</DialogTitle>
          <DialogDescription>
            Conecte-se usando sua conta do Github
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Button
            variant="outline"
            onClick={githubConnection}
            disabled={!!isPending}
            className="w-full"
          >
            {isPending === "github" && <Loader2Icon className="animate-spin" />}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path d="M12 .297a12 12 0 00-3.797 23.399c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729 1.204.086 1.838 1.234 1.838 1.234 1.07 1.834 2.807 1.304 3.492.996.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.334-5.467-5.932 0-1.311.467-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.513 11.513 0 016 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.911 1.233 3.222 0 4.61-2.807 5.628-5.48 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576A12 12 0 0012 .297z" />
            </svg>
            GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
