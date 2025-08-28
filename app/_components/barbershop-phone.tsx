"use client";

import { Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type BarbershopPhoneProps = {
  phone: string;
};

export default function BarbershopPhone({ phone }: BarbershopPhoneProps) {
  function copyToClipboard() {
    navigator.clipboard.writeText(phone);
    toast.success("Número copiado para a área de transferência!");
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Smartphone width={24} />
        <p className="text-sm">{phone}</p>
      </div>
      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        Copiar
      </Button>
    </div>
  );
}
