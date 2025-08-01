"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { useRouter } from "next/navigation";
import { createAssignment } from "@/services/assignments";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Deadline must be a valid date and time",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AssignmentForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: FormValues) {
    try {
      const deadlineISO = new Date(values.deadline).toISOString();

      const submissionData = {
        ...values,
        deadline: deadlineISO,
      };
      const res = await createAssignment(submissionData);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        router.push("/instructor/assignments");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto border p-4 md:p-6 lg:p-10 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                Select date and time for the assignment deadline
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          Create Assignment {isSubmitting && <ButtonLoader />}
        </Button>
      </form>
    </Form>
  );
}
