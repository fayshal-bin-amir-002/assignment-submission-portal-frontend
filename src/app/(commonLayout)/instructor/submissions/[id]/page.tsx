import AllSubmitUsers from "@/components/modules/dashboard/instructor/submissions/AllSubmitUsers";

const SubmissionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <AllSubmitUsers id={id} />
    </div>
  );
};

export default SubmissionPage;
