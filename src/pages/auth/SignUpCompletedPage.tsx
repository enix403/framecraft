import { AppTopNav } from "@/components/topnav/AppTopNav";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useLocation } from "react-router";

export function SignUpCompletedPage() {
  const { state } = useLocation();

  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden bg-muted'>
      <AppTopNav />
      <div className='flex flex-1-y flex-col items-stretch px-6 py-10 lg:pt-[10vh] xl:pt-[14vh] 2xl:pt-[16vh]'>
        <div className='flex justify-center'>
          <Alert variant='default' className='max-w-xl flex-1'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Email Sent</AlertTitle>
            <AlertDescription className='max-w-full'>
              <p>
                An email has been sent to your inbox at{" "}
                <strong className='text-foreground'>{state?.email}</strong>
              </p>
              <p>Kindly check your inbox</p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
