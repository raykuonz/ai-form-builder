"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";

import { generateForm } from "@/lib/queries/generateForm";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
    >
      <Sparkles
        className="h-4 w-4 mr-2"
      />
      {pending ? 'Generating...' : 'Generate'}
    </Button>
  );
}

const initialState: {
  message: string;
  data?: any;
} = {
  message: '',
}

const FormGenerator = () => {

  const [state, formAction] = useFormState(generateForm, initialState);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const session = useSession();

  const handleFormCreate = () => {
    if (session?.data?.user) {
      setIsOpen(true);
    } else {
      signIn();
    }
  }

  useEffect(() => {
    if (state.message === 'success') {
      setIsOpen(false);
      router.push(`/view-forms/edit/${state.data.formId}`);
    }

  }, [state.message]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        onClick={handleFormCreate}
      >
        <Plus
          className="h-4 w-4 mr-2"
        />
        Create form
      </Button>
      <DialogContent
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>
            Create new form
          </DialogTitle>
        </DialogHeader>
        <form
          action={formAction}
        >
          <div
            className="grid gap-4 py-4"
          >
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will do the magic ✨"
            />
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormGenerator;