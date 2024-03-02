import {
  timestamp,
  pgTable,
  text,
  primaryKey,
 integer,
 serial,
 boolean,
 pgEnum
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from '@auth/core/adapters'
import { relations } from "drizzle-orm";

export const fieldTypes = pgEnum('fieldType', [
  'RadioGroup',
  'Select',
  'Input',
  'Textarea',
  'Switch',
]);

export const users = pgTable("user", {
 id: text("id").notNull().primaryKey(),
 name: text("name"),
 email: text("email").notNull(),
 emailVerified: timestamp("emailVerified", { mode: "date" }),
 image: text("image"),
})

export const accounts = pgTable(
"account",
{
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccount["type"]>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
   id_token: text("id_token"),
  session_state: text("session_state"),
},
(account) => ({
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
})
)

export const sessions = pgTable("session", {
 sessionToken: text("sessionToken").notNull().primaryKey(),
 userId: text("userId")
   .notNull()
   .references(() => users.id, { onDelete: "cascade" }),
 expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
 "verificationToken",
 {
   identifier: text("identifier").notNull(),
   token: text("token").notNull(),
   expires: timestamp("expires", { mode: "date" }).notNull(),
 },
 (vt) => ({
   compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
 })
)

export const forms = pgTable(
  'form',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
    userId: text('userId'),
    published: boolean('published'),
  }
);

export const formRelations = relations(
  forms,
  ({ many, one }) => ({
    questions: many(questions),
    user: one(users, {
      fields: [forms.userId],
      references: [users.id],
    }),
  }),
);

export const questions = pgTable(
  'question',
  {
    id: serial('id').primaryKey(),
    label: text('label'),
    fieldType: fieldTypes('fieldType'),
    formId: integer('formId'),
  }
);

export const questionRelations = relations(
  questions,
  ({ many, one }) => ({
    form: one(forms, {
      fields: [questions.id],
      references: [forms.id],
    }),
    fieldOptions: many(fieldOptions),
  }),
);

export const fieldOptions = pgTable(
  'fieldOption',
  {
    id: serial('id').primaryKey(),
    label: text('label'),
    value: text('value'),
    questionId: integer('questionId'),
  }
);

export const fieldOptionRelations = relations(
  fieldOptions,
  ({ one }) => ({
    question: one(questions, {
      fields: [fieldOptions.id],
      references: [questions.id],
    }),
  }),
);