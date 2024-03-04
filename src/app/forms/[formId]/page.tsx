import { getForm } from "@/lib/queries/getForm";
import EditForm from "@/components/forms/edit-form";

interface FormPageProps {
  params: { formId: string };
}

const FormPage = async ({
  params,
}: FormPageProps) => {

  const formId = params.formId;

  if (!formId) {
    return (
      <div>
        Form not found.
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

  return (
    <>
      <EditForm
        form={form}
        editMode={false}
      />
    </>
  )
}

export default FormPage;