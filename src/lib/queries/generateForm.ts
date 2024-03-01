"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export const generateForm = async (
  prevState: { message: string },
  formData: FormData,
) => {
  const schema = z.object({
    description: z.string(),
  });

  const parse = schema.safeParse({
    description: formData.get('description'),
  });

  if (!parse.success) {
    console.error('##### generateForm - parse.error', parse.error);
    return {
      message: 'Failed to parse data',
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      message: 'No OPEN AI API Key found',
    }
  }

  const data = parse.data;
  const promptExplanation = `Based on the description, generate a survey with questions array where every element has 2 fields: label and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with label and value fields. For example, for RadioGroup, and Select types, the field options array can be [{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `${data.description} ${promptExplanation}`,
        }],
      }),
    });

    const json = await response.json();

    revalidatePath('/');

    return {
      message: 'success',
      data: json,
    }

  } catch (error) {
    console.error('##### generateForm fetch api failed', error);
    return {
      message: 'Failed to create form',
    }
  }
}