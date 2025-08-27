import { Card, CardContent } from "./ui/card";

export default function Footer() {
  return (
    <footer>
      <Card className="min-w-full rounded-none">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            © 2025 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
}
