import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { Input } from "@/components/ui/input";
import { createSubmission } from "@/services/submissions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  submissionUrl: z.string().trim().min(1, "SubmissionUrl is required"),
  note: z.string().trim().min(1, "note is required"),
});

type FeedBackModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  assignment: string;
  student: string;
};

const SubmitModal = ({
  open,
  setOpen,
  assignment,
  student,
}: FeedBackModalProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      submissionUrl: "",
      note: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      assignment,
      student,
    };
    try {
      const res = await createSubmission(data);
      if (res?.success) {
        form.reset();
        setOpen(false);
        toast.success(res?.message);
        router.push("/student/submissions");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto w-full"
          >
            <FormField
              control={form.control}
              name="submissionUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submission Url</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Submit {isSubmitting && <ButtonLoader />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitModal;
