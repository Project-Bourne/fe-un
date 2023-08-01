import React from "react";
import { Header } from "../components";
import { Breadcrumbs } from "@/components/ui";
import TabLayout from "../components/TabLayout";

const workspacesDetails = () => {
  return (
    <div>
      <Header />
      <Breadcrumbs />
      <TabLayout layout={0} />
    </div>
  );
};

export default workspacesDetails;
