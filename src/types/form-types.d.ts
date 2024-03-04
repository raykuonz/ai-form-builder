import { InferSelectModel } from "drizzle-orm";

import {
  answers,
  fieldOptions,
  forms,
  formSubmissions,
  questions,
} from "@/db/schema";

export type AnswerSelectModal = InferSelectModel<typeof answers>;
export type FieldOptionSelectModel = InferSelectModel<typeof fieldOptions>;
export type FormSelectModel = InferSelectModel<typeof forms>;
export type FormSubmissionSelectModal = InferSelectModel<typeof formSubmissions>;
export type QuestionSelectModel = InferSelectModel<typeof questions>;