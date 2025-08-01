"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/PasswordInput";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { loginUser } from "@/services/auth";

const formSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be minimum 6 characters long." }),
});

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await loginUser(values);
      if (res?.success) {
        form.reset();
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-6 w-full mx-auto max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                    value={field?.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="off"
                    placeholder="******"
                    {...field}
                    value={field?.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Login
                {isSubmitting && <ButtonLoader />}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
