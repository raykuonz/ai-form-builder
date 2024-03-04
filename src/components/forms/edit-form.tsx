"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FieldOptionSelectModel,
  FormSelectModel,
  QuestionSelectModel
} from "@/types/form-types";
import { publishForm } from "@/lib/queries/mutateForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import DynamicFormField from "./dynamic-form-field";
import FormPublishSuccessDialog from "./form-publish-success-dialog";

interface EditFormProps {
  form: FormSelectModel & { questions: Array<QuestionSelectModel & { fieldOptions: FieldOptionSelectModel[] }>};
  editMode: boolean;
}

const EditForm = ({
  form,
  editMode,
}: EditFormProps) => {

  const formHook = useForm();

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  }

  const handleFormSubmit = async (data: any) => {
    if (editMode) {
      await publishForm(form.id);
      setSuccessDialogOpen(true);
    }
  }

  return (
    <div>
      <h1
        className="text-lg font-bold py-3"
      >
        {form.name}
      </h1>
      <p
        className="text-md"
      >
        {form.description}
      </p>
      <Form {...formHook}>
          <form
            onSubmit={formHook.handleSubmit(handleFormSubmit)}
            className="grid w-full max-w-3xl items-center gap-6 my-4"
          >
            {form.questions.map((question, index) => (
              <FormField
                key={`${question.label}_${index}`}
                name={`question_${question.id}`}
                control={formHook.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="text-base mt-3"
                    >
                      {index + 1}. {question.label}
                    </FormLabel>
                    <FormControl>
                      <DynamicFormField
                        question={question}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            ))}
            <Button
              type="submit"
            >
              {editMode ? 'Publish' : 'Submit'}
            </Button>
          </form>
      </Form>
      <FormPublishSuccessDialog
        formId={form.id}
        open={successDialogOpen}
        onOpenChange={handleDialogOpenChange}
      />
    </div>
  )
}

export default EditForm