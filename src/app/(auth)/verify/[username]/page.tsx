"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import VerifyCodeUI from "@/components/ui/VerifyCodeUI";

const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits"),
});

export default function VerifyCodePage() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username);
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/verify-code", {
        username,
        code: data.code,
      });

      toast({
        title: "✅ Verification Successful!",
        description: response.data.message,
      });

      router.replace("/sign-in"); // redirect to login after verification
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: "❌ Verification Failed",
        description:
          axiosError.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VerifyCodeUI
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      username={username}
    />
  );
}
