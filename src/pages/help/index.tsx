import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Training() {
  const router = useRouter();

  useEffect(() => {
    router.push(
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
