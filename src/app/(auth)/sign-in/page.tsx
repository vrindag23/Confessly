"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import SignInUI from "@/components/ui/SignInUI";

// ✅ Validation schema
const signInSchema = z.object({
  identifier: z.string().min(1, "Username or Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.ok && result.url) {
      toast({
        title: "✅ Login Successful!",
        description: "Redirecting to dashboard...",
      });

      router.push("/dashboard");
    }
  };

  return (
    <SignInUI
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={form.formState.isSubmitting}
    />
  );
}



// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { signIn } from 'next-auth/react';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/components/ui/use-toast';
// import { signInSchema } from '@/schemas/signInSchema';

// export default function SignInForm() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       identifier: '',
//       password: '',
//     },
//   });

//   const { toast } = useToast();
//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     const result = await signIn('credentials', {
//       redirect: false,
//       identifier: data.identifier,
//       password: data.password,
//     });

//     if (result?.error) {
//       if (result.error === 'CredentialsSignin') {
//         toast({
//           title: 'Login Failed',
//           description: 'Incorrect username or password',
//           variant: 'destructive',
//         });
//       } else {
//         toast({
//           title: 'Error',
//           description: result.error,
//           variant: 'destructive',
//         });
//       }
//     }

//     if (result?.url) {
//       router.push('/dashboard');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Welcome Back to True Feedback
//           </h1>
//           <p className="mb-4">Sign in to continue your secret conversations</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="identifier"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email/Username</FormLabel>
//                   <Input {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <Input type="password" {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button className='w-full' type="submit">Sign In</Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Not a member yet?{' '}
//             <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/sign-in/page.tsx

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import axios, { AxiosError } from "axios";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";
// import SignInUI from "@/components/ui/SignInUI";

// const signInSchema = z.object({
//   identifier: z.string().min(1, "Username or Email is required"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export default function SignInPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//   const { toast } = useToast();

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       identifier: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("/api/sign-in", data);

//     toast({
//   title: "✅ Login Successful!",
//   description: response.data.message,
// });

// console.log("Redirecting to dashboard...");
// await router.push("/dashboard");

//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       toast({
//         title: "❌ Sign In Failed",
//         description: axiosError.response?.data.message || "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <SignInUI
//       form={form}
//       onSubmit={form.handleSubmit(onSubmit)}
//       isSubmitting={isSubmitting}
//     />
//   );
// }
