import { getUserForms } from "@/lib/queries/getForm"
import FormsList from "@/components/forms/forms-list"

const ViewFormsPage = async () => {

  const response = await getUserForms();

  if (!response.success) {
    return (
      <div>
        {response.message || 'Something wrong'}
      </div>
    );
  }

  const forms = response.data;

  return (
    <>
      <h2
        className="text-2xl font-bold px-4 m-5"
      >
        My forms
      </h2>
      {forms && forms.length > 0 && (
        <FormsList
          forms={forms}
        />
      )}
    </>
  )
}

export default ViewFormsPage