import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export default function BookingItem() {
  return (
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
  );
}
