import React from "react";
import Image from "next/image";
import Video from "../../components/Video";
import CardWithMedia from "./CardWithMedia";
import CardWithoutMedia from "./CardWithoutMedia";
import { useRouter } from "next/router";

function Card({ data, style }) {
  const route = useRouter();
  const goToDetails = (id) => {
    route.push(`/help/checker/${id}`);
  };
  return (
    <div className={`${style ? style : ""}`}>
      {data.map((item, i) => (
        <div onClick={() => goToDetails(i)}>
          <CardWithoutMedia item={item} />
        </div>
      ))}
    </div>
  );
}

export default Card;
