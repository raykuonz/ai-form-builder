import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";

import { forms } from "@/db/schema";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Button } from "../ui/button";

type Form = InferSelectModel<typeof forms>;

interface FormsListProps {
  forms: Form[],
}

const FormsList = ({
  forms,
}: FormsListProps) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4"
    >
      {forms.map((form) => (
        <Card
          key={form.id}
          className="max-w-[350px] flex flex-col"
        >
          <CardHeader
            className="flex-1"
          >
            <CardTitle>
              {form.name}
            </CardTitle>
            <CardDescription>
              {form.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href={`/forms/edit/${form.id}`}
              className="w-full"
            >
              <Button
                className="w-full"
              >
                View
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default FormsList