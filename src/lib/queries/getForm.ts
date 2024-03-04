"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { forms } from "@/db/schema";
import { auth } from "../auth";

export const getForm = async (formId: number) => {

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        }
      }
    }
  });

  if (!form) {
    return {
      success: false,
      message: 'Form not found.',
    }
  }

  return {
    success: true,
    data: form,
  };
}

export const getUserForms = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  const response = await db.query.forms.findMany({
    where: eq(forms.userId, userId),
  })

  return {
    success: true,
    data: response
  }
}