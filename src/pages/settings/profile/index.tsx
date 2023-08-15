import SettingsLayout from "@/layout/SettingsLayout";
import React from "react";
import { View1, View2 } from "../components";

const ProfileSettings = () => {
  return (
    <SettingsLayout>
      {/* First View Component */}
      <View1 />

      {/* Second View Component */}
      <View2 />
    </SettingsLayout>
  );
};

export default ProfileSettings;
