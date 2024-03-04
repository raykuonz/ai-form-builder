import { getFormSubmissionResults } from '@/lib/queries/getSubmission';
import FormResultsTable from './form-results-table';

interface FormResultsProps {
  formId: number;
}

const FormResults = async ({
  formId,
}: FormResultsProps) => {

  const response = await getFormSubmissionResults(formId);

  if (!response.success || !response.data) {
    return null;
  }

  if (!response.data.formSubmissions) {
    return (
      <p>No form submissions.</p>
    );
  }

  return (
    <div>
      <FormResultsTable
        data={response.data.formSubmissions}
        columns={response.data.questions}
      />
    </div>
  )
}

export default FormResults