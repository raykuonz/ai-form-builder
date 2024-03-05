import Link from "next/link";

import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"

const PaymentSuccessPage = () => {
  return (
    <Alert
      variant="default"
    >
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your account has been upgraded.<br />
        <Link
          href="/view-forms"
          className="underline"
        >
            Go to the dashboard
        </Link> to create more forms.
      </AlertDescription>
    </Alert>
  )
}

export default PaymentSuccessPage;