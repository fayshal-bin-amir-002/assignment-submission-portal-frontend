import Assignments from "@/components/modules/dashboard/student/assignments";
import { getCurrentUser } from "@/services/auth";

const StudentPage = async () => {
  const { id } = await getCurrentUser();
  return (
    <div>
      <Assignments id={id} />
    </div>
  );
};

export default StudentPage;
