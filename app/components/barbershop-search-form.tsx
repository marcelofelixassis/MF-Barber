"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const SearchFormSchema = z.object({
  search: z.string().trim().min(1, { message: "Digite algo para buscar" }),
});

type SearchFormType = z.infer<typeof SearchFormSchema>;

export default function BarbershopSearchForm() {
  const router = useRouter();

  const searchForm = useForm<SearchFormType>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: { search: "" },
  });

  function applySearch(data: SearchFormType) {
    router.push(`/barbershop?search=${data.search}`);
  }

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(applySearch)}
        className="flex gap-2"
      >
        <FormField
          control={searchForm.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} placeholder="Faça sua busca..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="icon">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
}
