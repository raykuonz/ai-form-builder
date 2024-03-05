"use client";

import { toast } from "sonner";
import { Copy, Link2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FormPublishSuccessDialogProps {
  formId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FormPublishSuccessDialog = ({
  formId,
  open,
  onOpenChange,
}: FormPublishSuccessDialogProps) => {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(baseUrl + '/forms/' + formId)
      .then(() => toast('Copied to clipboard.'))
      .catch(() => toast('Faied to copy to clipboard.'))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>
            Your form has been published successfully!
          </DialogTitle>
          <DialogDescription>
            Your form is now live and ready to be filled out by your users. You can now share using the link below.
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex flex-col"
        >
          <p>
            Copy link
          </p>
          <div
            className="border-2 border-gray-200 flex justify-between items-center mt-2 pl-2 rounded-md"
          >
            <Link2Icon
              className="h-4 w-4 mr-2"
            />
            <input
              type="text"
              placeholder="link"
              disabled
              value={`${baseUrl}/forms/${formId}`}
              className="w-full outline-none bg-transparent"
            />
            <Button
              onClick={copyToClipboard}
            >
              <Copy
                className="w-4 h-4 mr-2"
              />
              Copy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FormPublishSuccessDialog