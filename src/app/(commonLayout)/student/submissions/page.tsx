import AllSubmissions from "@/components/modules/dashboard/student/submissions";
import { getCurrentUser } from "@/services/auth";

const SubmissionsPage = async () => {
  const { id } = await getCurrentUser();
  return (
    <div>
      <AllSubmissions id={id} />
    </div>
  );
};

export default SubmissionsPage;
