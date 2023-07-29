import React, { useState } from "react";
import { useRouter } from "next/router";
import WorkspaceDetails from "../StepperModal/WorkspaceDetails";
import InviteCollaborators from "../StepperModal/InviteCollaborators";
import AddContent from "../StepperModal/AddContent";

const stages = [{ label: "" }, { label: "" }, { label: "" }];
const AddWorkspacePopUp = ({ onHandlAddeModal }) => {
  const [index, setIndex] = useState(0);
  const props = { stages, index, setIndex };

  return (
    <div>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Add a workspace</h1>
        <p className="text-[14px] ml-5">
          Fill the details below to add a new workspace
        </p>
        {/* stepper should be here  */}
        {index === 0 && <WorkspaceDetails {...props} />}
        {/* stepper should be here  */}
        {index === 1 && <InviteCollaborators {...props} />}
        {/* stepper should be here  */}
        {index === 2 && <AddContent {...props} />}
      </div>
    </div>
  );
};

export default AddWorkspacePopUp;
