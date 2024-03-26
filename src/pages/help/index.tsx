import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Training() {
  const router = useRouter();

  useEffect(() => {
    router.replace(
      {
        pathname: `/help/checker`,
      },
      undefined,
      { shallow: true },
    );
  }, []);

  return <></>;
}

export default Training;
