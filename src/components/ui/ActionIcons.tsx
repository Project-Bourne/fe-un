import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ActionIcons = ({ docId }) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state?.auth);

  const permissions = userInfo?.role?.permissions;

  const handleExport = (id: string, to: string) => {
    // if (to === "collab") {
    //   router?.push(`http://192.81.213.226:36/documents/${id}&summarizer`);
    // }
    if (to === "analyser") {
      // Using hardcoded URL - removing in favor of environment variables
      // router?.push(`http://192.81.213.226:31/home/${id}&summarizer`);
      router?.push(
        `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_ANALYZER_PORT}/home/${id}&summarizer`,
      );
    }
    if (to === "factcheck") {
      // Using hardcoded URL - removing in favor of environment variables
      // router?.push(`http://192.81.213.226:34/home/${id}&summarizer`);
      router?.push(
        `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_FACT_CHECKER_PORT}/home/${id}&summarizer`,
      );
    }
    if (to === "deepchat") {
      // Using hardcoded URL - removing in favor of environment variables
      // router?.push(`http://192.81.213.226:35/home/${id}&summarizer`);
      router?.push(
        `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_DEEP_CHAT_PORT}/home/${id}&summarizer`,
      );
    }
    if (to === "interrogator") {
      // Using hardcoded URL - removing in favor of environment variables
      // router?.push(`http://192.81.213.226:37/home/${id}&summarizer`);
      router?.push(
        `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_INTERROGATOR_PORT}/home/${id}&summarizer`,
      );
    }
    if (to === "translator") {
      // Using hardcoded URL - removing in favor of environment variables
      // router?.push(`http://192.81.213.226:33/home/${id}&summarizer`);
      router?.push(
        `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_TRANSLATOR_PORT}/home/${id}&summarizer`,
      );
    }
    if (to === "interrogator") {
      // Using hardcoded URL - removing in favor of environment variables
      // router?.push(`http://192.81.213.226:82/home/query/${id}&summarizer`);
      router?.push(
        `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_INTERROGATOR_PORT}/home/query/${id}&summarizer`,
      );
    }
  };

  return (
    <>
      <div className="flex flex-row justify-end gap-[0.5rem] mr-5">
        {/* collab */}
        {/* {permissions?.includes("collab") && (
          <Tooltip title="Export to Collab">
            <Image
              src={require("../../../../../public/icons/action_collab.svg")}
              alt="documents"
              className=" cursor-pointer"
              width={60}
              onClick={() => handleExport(docId, "collab")}
            />
          </Tooltip>
        )} */}
        {/* factcheck */}
        {permissions?.includes("fact checker") && (
          <Tooltip title="Export to Factchecker">
            <Image
              src={require("../../../../../public/icons/action_factchecker.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "factcheck")}
              width={60}
            />
          </Tooltip>
        )}

        {/* analyzer */}
        {permissions?.includes("analyser") && (
          <Tooltip title="Export to Analyzer">
            <Image
              src={require("../../../../../public/icons/action_analyzer.svg")}
              alt="documents"
              className=" cursor-pointer"
              onClick={() => handleExport(docId, "analyzer")}
              width={60}
            />
          </Tooltip>
        )}

        {/* translator */}
        {permissions?.includes("translator") && (
          <Tooltip title="Export to translator">
            <Image
              src={require("../../../../../public/icons/action_translator.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "translator")}
              width={60}
            />
          </Tooltip>
        )}

        {/* deepchat */}
        {permissions?.includes("deep chat") && (
          <Tooltip title="Export to Deep chat">
            <Image
              src={require("../../../../../public/icons/action_deepchat.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "deepchat")}
              width={60}
            />
          </Tooltip>
        )}

        {/* interrogator */}
        {permissions?.includes("interrogator") && (
          <Tooltip title="Export to Interrogator">
            <Image
              src={require("../../../../../public/icons/action_interrogator.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "interrogator")}
              width={60}
            />
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default ActionIcons;
