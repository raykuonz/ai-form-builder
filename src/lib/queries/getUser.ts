"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export const getUser = async (userId: string) => {

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  });

  return user;
}