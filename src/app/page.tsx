import { SessionProvider } from "next-auth/react";

import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import Header from "@/components/header";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <FormGenerator />
      </main>
    </SessionProvider>
  );
}
