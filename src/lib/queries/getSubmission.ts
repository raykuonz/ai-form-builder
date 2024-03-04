"use server";

import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getFormSubmissionResults = async (formId: number) => {
  try {

    const form = await db.query.forms.findFirst({
      where: eq(forms.id, formId),
      with: {
        questions: {
          with: {
            fieldOptions: true,
          }
        },
        formSubmissions: {
          with: {
            answers: {
              with: {
                fieldOption: true,
              }
            }
          }
        }
      }
    });


    if (!form) {
      return {
        success: true,
        message: 'No form found.'
      }
    }

    return {
      success: true,
      data: form,
    }

  } catch (error) {
    console.error('##### getFormSubmissionResults error', error);
    return {
      success: false,
      message: 'Something wrong.'
    }
  }
}