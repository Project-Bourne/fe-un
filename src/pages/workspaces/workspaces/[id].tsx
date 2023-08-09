
import { Header } from "../components";
import { Breadcrumbs } from "@/components/ui";
import TabLayout from "../components/TabLayout";
import { useRouter } from "next/router";


const workspacesDetails = () => {
  const router = useRouter()
const workspaceId = router.query.id;
console.log(workspaceId)
  return (
    <div>
      <Header workspaceId={workspaceId} />
      <Breadcrumbs />
      <TabLayout layout={0} />
    </div>
  );
};

export default workspacesDetails;
