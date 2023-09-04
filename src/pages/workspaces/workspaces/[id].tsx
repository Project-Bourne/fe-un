import React from "react";
import { Breadcrumbs } from "../../../components/ui";
import TabLayout from "../components/TabLayout";
import { useRouter } from "next/router";
import Header from "../components/Header";

const workspacesDetails = () => {
  const router = useRouter();
  const workspaceId = router.query.id;
  console.log(workspaceId);
  return (
    <div>
      <Header workspaceId={workspaceId} />
      <Breadcrumbs />
      <TabLayout layout={0} />
    </div>
  );
};

export default workspacesDetails;
