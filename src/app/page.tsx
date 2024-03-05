import { SessionProvider } from "next-auth/react";
import Image from "next/image";

import Header from "@/components/header";
import FormGeneratorWrapper from "@/components/form-generator/form-generator-wrapper";

export default async function Home() {

  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <section
          id="hero"
          className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full bg-[url('/grid.svg')]"
        >
          <h1
            className="text-4xl font-bold text-center tracking-tighter sm:Text-5xl md:text-6xl leading-6"
          >
            Create yourt forms <br />in seconds not hours
          </h1>
          <p
            className="max-w-[600px] mt-4 text-center text-gray-500 md:text-xl"
          >
            Generate, publish and share your form right away with AI, Dive into insightful results, charts and analytics.
          </p>
          <FormGeneratorWrapper />
          <div
            className="w-full bg-gradient-to-b from-transparent to-white h-24"
          ></div>
        </section>
        <section
          id="features"
          className="flex flex-col items-center justify-center space-y-4 mt-12 pb-24"
        >
          <h2
            className="text-3xl font-bold text-center tracking-tighter sm:Text-4xl md:text-5xl"
          >
            How it works
          </h2>
          <ul
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl text-center"
          >
            <li
              className="flex flex-col items-center space-y-4 relative"
            >
              <Image
                src="/images/app/demo1.png"
                width={250}
                height={250}
                alt="Create a form"
                className="bg-white p-4 shadow-sm border rounded-md"
              />
              <Image
                src="/arrow.svg"
                width={125}
                height={125}
                alt="Arrow"
                className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
              />
              <p>
                1. Add a prompt and describe the requiremetns for your form.
              </p>
            </li>
            <li
              className="flex flex-col items-center space-y-4 relative"
            >
              <Image
                src="/images/app/demo2.png"
                width={250}
                height={250}
                alt="Update the form"
                className="bg-white p-4 shadow-sm border rounded-md"
              />
              <Image
                src="/arrow.svg"
                width={125}
                height={125}
                alt="Arrow"
                className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1] rotate-180"
              />
              <p>
                2. Generate and share the form.
              </p>
            </li>
            <li
              className="flex flex-col items-center space-y-4 relative"
            >
              <Image
                src="/images/app/demo4.png"
                width={250}
                height={250}
                alt="Check the analytics"
                className="bg-white p-4 shadow-sm border rounded-md"
              />
              <p>
               3. Check results, analytics and more.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </SessionProvider>
  );
}
