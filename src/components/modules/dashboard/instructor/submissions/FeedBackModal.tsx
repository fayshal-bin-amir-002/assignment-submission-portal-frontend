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
import { AssignmentSubmission, SubmissionStatus } from "./AllSubmitUsers";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { feedBackSubmission } from "@/services/submissions";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

const formSchema = z.object({
  status: z.string().trim().min(1, "Status is required"),
  feedback: z.string().trim().min(1, "Feedback is required"),
});

type FeedBackModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submission: AssignmentSubmission | null;
  fetchSubmissions: () => void;
};

const FeedBackModal = ({
  open,
  setOpen,
  submission,
  fetchSubmissions,
}: FeedBackModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: submission?.status || "",
      feedback: submission?.feedback || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await feedBackSubmission(values, submission?._id as string);
      if (res?.success) {
        form.reset();
        setOpen(false);
        fetchSubmissions();
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={SubmissionStatus.PENDING}>
                        Pending
                      </SelectItem>
                      <SelectItem value={SubmissionStatus.REVIEWED}>
                        Reviewed
                      </SelectItem>
                      <SelectItem value={SubmissionStatus.REJECTED}>
                        Rejected
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
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

export default FeedBackModal;
