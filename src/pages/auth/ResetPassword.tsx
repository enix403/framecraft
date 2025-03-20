import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { GalleryVerticalEnd } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiRoutes } from "@/lib/api-routes";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

function ResetPasswordForm({ data: { userId, token, userEmail } }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const resetPassMut = useMutation({
    mutationFn: apiRoutes.resetPassword,
    onSuccess: (data, variables, context) => {
      navigate("/auth/reset-password/done");
    }
  });

  const onSubmit = handleSubmit(({ password }) => {
    resetPassMut.mutate({
      userId,
      token,
      newPassword: password
    });
  });

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>Reset Your Password</CardTitle>
        <CardDescription>Enter a new password for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className='grid gap-6'>
            <div className='grid gap-6'>
              <ErrorDisplay
                error={resetPassMut?.error}
                map={{
                  val_err: "Please fill all the input fields"
                }}
              />
              <div className='grid gap-2'>
                <Label>Password</Label>
                <Input
                  type='password'
                  placeholder='Enter password'
                  {...register("password")}
                />
              </div>
              <div className='grid gap-2'>
                <Label>Confirm Password</Label>
                <Input
                  type='password'
                  placeholder='Enter password again'
                  {...register("confirmPassword")}
                />
              </div>
              <Button
                loading={resetPassMut?.isPending}
                type='submit'
                className='w-full'
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ResetPasswordPage() {
  const { userId, token } = useParams();

  const { data, isError } = useQuery({
    queryKey: ["resetPasswordCheck", userId, token],
    queryFn: () => apiRoutes.resetPasswordCheck({ userId, token }),
    staleTime: Infinity,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      console.log("Invalid");
    }
  }, [data, isError]);

  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
      <div className='flex w-full max-w-lg flex-col gap-6'>
        <Link
          to='/'
          className='flex items-center gap-2 self-center font-medium'
        >
          <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          FrameCraft.
        </Link>
        {isError ? (
          "Invalid link"
        ) : data ? (
          <ResetPasswordForm data={data} />
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}

export function ResetPasswordCompletedPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
      <div className='flex w-full max-w-lg flex-col gap-6'>
        <Link
          to='/'
          className='flex items-center gap-2 self-center font-medium'
        >
          <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          FrameCraft.
        </Link>
        <Alert variant='default'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Email Sent</AlertTitle>
          <AlertDescription className='max-w-full'>
            <p>Your password has been reset.</p>
            <Link to='/auth/login' className='font-medium text-green-600'>
              Click here to login.
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
