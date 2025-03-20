import { cn } from "@/lib/utils";
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

import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useSetAuthState } from "@/stores/auth-store";
import { useForm } from "react-hook-form";
import { apiRoutes } from "@/lib/api-routes";
import { AppTopNav } from "@/components/topnav/AppTopNav";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export function Scratch() {
  const setAuthState = useSetAuthState();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const loginMut = useMutation({
    mutationFn: apiRoutes.login,
    onSuccess: ({ accessToken, user }) => {
      console.log(accessToken, user);
      setAuthState({
        token: accessToken,
        userId: user["_id"],
        userRole: user["role"]
      });
      navigate("/app");
    }
  });

  const onSubmit = handleSubmit(values => {
    loginMut.mutate(values as any);
  });

  return (
    <div className='flex h-full max-h-full flex-col overflow-hidden bg-muted'>
      <AppTopNav />
      <div className='flex flex-1-fix md:p-10'>
        <div className='flex flex-1-fix overflow-hidden rounded-xl border border-border bg-white'>
          <form
            onSubmit={onSubmit}
            className='flex w-full flex-col gap-6 overflow-y-auto p-6 text-card-foreground max-lg:flex-1 sm:p-10 lg:max-w-lg'
          >
            <CardHeader className='text-center'>
              <CardTitle className='text-xl'>Welcome back</CardTitle>
              <CardDescription>
                Login with your Apple or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6'>
                <div className='flex flex-col gap-4'>
                  <Button variant='outline' className='w-full'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='size-4'
                      viewBox='0 0 24 24'
                    >
                      <path
                        d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
                        fill='currentColor'
                      />
                    </svg>
                    Login with Apple
                  </Button>
                  <Button variant='outline' className='w-full'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='size-4'
                      viewBox='0 0 24 24'
                    >
                      <path
                        d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                        fill='currentColor'
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                  <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                    Or continue with
                  </span>
                </div>
                <div className='grid gap-6'>
                  <ErrorDisplay
                    error={loginMut.error}
                    map={{
                      val_err: "Please fill all the input fields",
                      invalid_creds: "Invalid email or password"
                    }}
                  />
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Enter email'
                      {...register("email")}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center'>
                      <Label htmlFor='password'>Password</Label>
                      <Link
                        to='/auth/forget-password'
                        className='ml-auto text-xs underline-offset-4 hover:underline'
                        tabIndex={-1}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id='password'
                      type='password'
                      placeholder='Enter password'
                      {...register("password")}
                    />
                  </div>
                  <Button
                    loading={loginMut.isPending}
                    type='submit'
                    className='w-full'
                  >
                    Login
                  </Button>
                </div>
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{" "}
                  <a href='#' className='underline underline-offset-4'>
                    Sign up
                  </a>
                </div>
              </div>
            </CardContent>
          </form>
          <div className='flex-1 max-lg:hidden'>
            <img
              src='/hero7.jpg'
              className='h-full w-full max-w-full object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// export function Scratch() {
//   return (
//     <div className='flex rounded-xl overflow-hidden md:m-10 border border-border flex-1'>
//       <form className='flex w-full lg:max-w-lg flex-col bg-backgroundSecondary p-6 sm:p-10 max-lg:flex-1'>
//         <div className='flex w-full flex-col gap-2'>
//           <p>Sign in with</p>
//           <div className='flex w-full flex-col gap-2'>
//             <button type='button' className='btn gap-2 bg-gray-5'>
//               <svg
//                 stroke='currentColor'
//                 fill='currentColor'
//                 strokeWidth={0}
//                 version='1.1'
//                 viewBox='0 0 48 48'
//                 className='h-5 w-5'
//                 xmlns='http://www.w3.org/2000/svg'
//               >
//                 <path
//                   fill='#FFC107'
//                   d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
//                 />
//                 <path
//                   fill='#FF3D00'
//                   d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
//                 />
//                 <path
//                   fill='#4CAF50'
//                   d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
//                 />
//                 <path
//                   fill='#1976D2'
//                   d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
//           c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
//                 />
//               </svg>
//               <span>Sign up with Google</span>
//             </button>
//             <button type='button' className='btn gap-2 bg-gray-5'>
//               <svg
//                 width={21}
//                 aria-hidden='true'
//                 focusable='false'
//                 data-prefix='fab'
//                 data-icon='github'
//                 className='svg-inline--fa fa-github fa-w-16'
//                 role='img'
//                 xmlns='http://www.w3.org/2000/svg'
//                 viewBox='0 0 496 512'
//               >
//                 <path
//                   fill='currentColor'
//                   d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
//                 />
//               </svg>
//               <span>Sign up with Github</span>
//             </button>
//           </div>
//         </div>
//         <div className='divider my-6 text-xs text-content2'>
//           or continue with
//         </div>
//         <div className='form-group'>
//           <div className='form-field'>
//             <label className='form-label'>Email address</label>
//             <input
//               placeholder='Type here'
//               type='email'
//               className='input max-w-full'
//             />
//             <label className='form-label'>
//               <span className='form-label-alt'>
//                 Please enter a valid email.
//               </span>
//             </label>
//           </div>
//           <div className='form-field'>
//             <label className='form-label'>
//               <span>Password</span>
//             </label>
//             <div className='form-control'>
//               <input
//                 placeholder='Type here'
//                 type='password'
//                 className='input max-w-full'
//               />
//             </div>
//           </div>
//           <div className='form-field'>
//             <div className='form-control justify-between'>
//               <label className='flex gap-2 select-none cursor-pointer'>
//                 <input type='checkbox' className='checkbox' />
//                 Remember me
//               </label>
//               {/* <label className='form-label'>
//                 <a href="#" className='link link-underline-hover link-secondary text-sm'>
//                   Forgot your password?
//                 </a>
//               </label> */}
//             </div>
//           </div>
//           <div className='form-field pt-5'>
//             <div className='form-control justify-between'>
//               <Link to="/generate" className="block w-full">
//                 <button
//                   type='button'
//                   className='btn btn-primary w-full bg-gradient-to-r from-pink-600 to-purple-500'
//                 >
//                   Sign in
//                 </button>
//               </Link>
//             </div>
//           </div>
//           <div className='form-field'>
//             <div className='form-control'>
//               <Link
//                 to='/register'
//                 className='link link-underline-hover link-secondary text-sm'
//               >
//                 Don't have an account? Sign up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </form>
//       <div className='flex-1 max-lg:hidden'>
//         <img src='/hero7.jpg' className='w-full max-w-full h-full object-cover' />
//       </div>
//     </div>
//   );
// }
