"use server";

import { redirect } from "next/navigation";

export const navigateToForm = async (formId: number) => {

  if (!formId) return;

  redirect(`/forms/edit/${formId}`);
}