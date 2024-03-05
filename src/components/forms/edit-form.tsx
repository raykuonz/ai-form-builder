"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import {
  FieldOptionSelectModel,
  FormSelectModel,
  QuestionSelectModel
} from "@/types/form-types";
import { deleteForm, publishForm } from "@/lib/queries/mutateForm";
import { submitForm } from "@/lib/queries/mutateSubmission";
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

  const router = useRouter();
  const formHook = useForm();

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  }

  const handleFormDelete = async () => {
    await deleteForm(form.id);
    toast('Form deleted.');
    router.push('/view-forms');
    router.refresh();
  }

  const handleFormSubmit = async (data: any) => {
    if (editMode) {
      await publishForm(form.id);
      setSuccessDialogOpen(true);
    } else {
      let answers = [];

      for (const [questionId, value] of Object.entries(data)) {
        const id = parseInt(questionId.replace('question_', ''));

        let fieldOptionId;
        let textValue;

        if (typeof value === 'string' && value.includes('answer_')) {
          fieldOptionId = parseInt(value.replace('answer_', ''));
        } else {
          textValue = value as string;
        }

        answers.push({
          questionId: id,
          fieldOptionId,
          value: textValue,
        })
      }

      try {
        const response = await submitForm({
          formId: form.id,
          answers,
        });

        if (response) {
          router.push('/forms/success');
        }
      } catch (error) {
        console.error('##### submit form error');
      }

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
            {editMode ? 'Publish form' : 'Submit'}
          </Button>
        </form>
        {editMode && (
          <Button
            variant="destructive"
            onClick={handleFormDelete}
            className="w-full mb-4"
          >
            <Trash2
              className="w-4 h-4 mr-2"
            />
            Delete form
          </Button>
        )}
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