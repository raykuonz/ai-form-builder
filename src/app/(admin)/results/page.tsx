import { getUserForms } from "@/lib/queries/getForm";
import FormPicker from "./_components/form-picker";
import FormResults from "./_components/form-results";

interface ResultsPageProps {
  searchParams: { [key: string]: string | undefined }
}

const ResultsPage = async ({
  searchParams
}: ResultsPageProps) => {

  const response = await getUserForms();

  if (!response.success || !response.data?.length) {
    return (
      <div>No forms found.</div>
    );
  }

  const userForms = response.data;

  const selectOptions = userForms.map((form) => ({
    label: form.name,
    value: form.id,
  }))

  return (
    <>
      <div>
        <FormPicker
          options={selectOptions}
        />
        <FormResults
          formId={
            searchParams?.formId
              ? parseInt(searchParams.formId)
              : userForms[0].id
          }
        />
      </div>
    </>
  )
}

export default ResultsPage;