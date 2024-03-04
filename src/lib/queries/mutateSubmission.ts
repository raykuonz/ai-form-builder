"use server";

import { db } from "@/db";

import {
  formSubmissions,
  answers as dbAnswers,
} from "@/db/schema";

interface SubmitFormProps {
  formId: number;
  answers: Array<{
    questionId: number;
    fieldOptionId?: number;
    value?: string;
  }>
}

export const submitForm = async ({
  formId,
  answers,
}: SubmitFormProps) => {
  try {
    const [{ formSubmissionId }] = await db
      .insert(formSubmissions)
      .values({ formId })
      .returning({ formSubmissionId: formSubmissions.id });

    await db
      .insert(dbAnswers)
      .values(answers.map((answer) => ({
        ...answer,
        formSubmissionId,
      })));

    return formSubmissionId;
  } catch (error) {
    console.error('##### submitForm error', error);
    return null;
  }
}