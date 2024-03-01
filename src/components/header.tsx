import Link from "next/link";
import Image from "next/image";

import {
  auth,
  signIn,
  signOut,
} from "@/lib/auth";
import { Button } from "./ui/button";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button
        type="submit"
      >
        Sign out
      </Button>
    </form>
  );
}

const Header = async () => {

  const session = await auth();

  return (
    <header
      className="border bottom-1"
    >
      <nav
        className="bg-white border-gray-200 px-4 py-2.5"
      >
        <div
          className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl"
        >
          <h1>
            AI Form Builder
          </h1>
          <div>
            {session?.user ? (
              <div
                className="flex items-center gap-4"
              >
                {session.user?.name && session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <SignOutButton />
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
              >
                <Button
                  variant="link"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;