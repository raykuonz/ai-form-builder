"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export const updateUserStripeCustomerId = async (
  userId: string,
  stripeCustomerId: string,
) => {
  await db.update(users)
    .set({ stripeCustomerId })
    .where(eq(users.id, userId));
}

export const updateUserStripeCustomerSubscription = async (
  stripeCustomerId: string,
  subscribed: boolean,
) => {
  try {

    console.log('##### updateUserSubscription', {
      stripeCustomerId,
      subscribed,
    });

    await db.update(users)
      .set({ subscribed })
      .where(eq(users.stripeCustomerId, stripeCustomerId));
  } catch (error) {
    console.error('##### updateUserSubscription error', error);
  }
}