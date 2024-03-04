import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"

const SuccessPage = () => {
  return (
    <Alert
      variant="default"
    >
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Thank you for submitting the form.
      </AlertDescription>
    </Alert>
  )
}

export default SuccessPage