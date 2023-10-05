import React, { useState } from "react";
import { useRouter } from "next/router";
import WorkspaceDetails from "../StepperModal/WorkspaceDetails";
import InviteCollaborators from "../StepperModal/InviteCollaborators";
import AddContent from "../StepperModal/AddContent";
import WorkspaceModal from "../StepperModal/WorspaceModal";

const stages = [{ label: "" }, { label: "" }, { label: "" }];
const AddWorkspacePopUp = ({ onHandlAddeModal, setModalType }) => {
  const [index, setIndex] = useState(0);
  const props = { stages, index, setIndex };

  return (
    <div>
      <div className="flex flex-col gap-2 my-5">
        <div className="max-h-[70vh] overflow-y-scroll">
          {/* stepper should be here  */}
          <WorkspaceModal setModalType={setModalType}/>
          {/* <WorkspaceDetails /> */}
          {/* stepper should be here  */}
          {/* {index === 1 && <InviteCollaborators {...props} />} */}
          {/* stepper should be here  */}
          {/* {index === 2 && <AddContent {...props} />} */}
        </div>
      </div>
    </div>
  );
};

export default AddWorkspacePopUp;
