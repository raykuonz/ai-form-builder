"use server";

import { InferInsertModel, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  forms,
  questions as dbQuestions,
  fieldOptions as dbFieldOptions,
} from "@/db/schema";
import { auth } from "@/lib/auth";

type Form = InferInsertModel<typeof forms>;
type Question = InferInsertModel<typeof dbQuestions>;
type FieldOption = InferInsertModel<typeof dbFieldOptions>;

interface SaveFormProps {
  name: string;
  description: string;
  questions: Array<Question & { fieldOptions?: FieldOption[] }>;
}

export const saveForm = async ({
  name,
  description,
  questions,
}: SaveFormProps) => {
  const session = await auth();
  const userId = session?.user?.id;

  const newForm = await db
    .insert(forms)
    .values({
      name,
      description,
      userId,
      published: false,
    })
    .returning({
      insertedId: forms.id,
    });

  const formId = newForm[0].insertedId;

  const newQuestions = questions.map((question) => {
    return {
      label: question.label,
      fieldType: question.fieldType,
      fieldOptions: question.fieldOptions,
      formId,
    }
  });

  await db.transaction(async (tx) => {
    for (const question of newQuestions) {
      const [{ questionId }] = await tx
        .insert(dbQuestions)
        .values(question)
        .returning({
          questionId: dbQuestions.id,
        });

      if (question.fieldOptions && question.fieldOptions.length > 0) {
        await tx
          .insert(dbFieldOptions)
          .values(question.fieldOptions.map((fieldOption) => ({
            ...fieldOption,
            questionId,
          })));
      }
    }
  });

  return formId;
}

export const publishForm = async (formId: number) => {
  await db
    .update(forms)
    .set({ published: true })
    .where(eq(forms.id, formId));
}