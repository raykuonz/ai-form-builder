import Link from "next/link";

import { getForm } from "@/lib/queries/getForm";
import { auth } from "@/lib/auth";
import EditForm from "@/components/forms/edit-form";

interface FormIdPageProps {
  params: { formId: string };
}

const FormIdPage = async ({
  params,
}: FormIdPageProps) => {

  const session = await auth();
  const userId = session?.user?.id;

  const formId = params.formId;

  if (!formId) {
    return (
      <div>
        Form not found.
      </div>
    );
  }

  if (!userId) {
    return (
      <div>
        You are not authorized to edit this form.
      </div>
    );
  }

  const response = await getForm(parseInt(params.formId));

  if (!response?.success || !response.data) {
    return (
      <div>
        {response.message || 'Form not found.'}
      </div>
    );
  }

  const form = response.data;

  if (userId !== form?.userId) {
    return (
      <div>
        You are not authorized to edit this form.
      </div>
    );
  }

  return (
    <>
      <Link
        href="/view-forms"
        className="underline my-4"
      >
        Back to all forms
      </Link>
      <EditForm
        form={form}
        editMode={true}
      />
    </>
  )
}

export default FormIdPage;