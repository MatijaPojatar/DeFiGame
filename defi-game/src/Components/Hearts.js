import React from "react";
import { Heart } from "../Utils/icons";

export default function Hearts({ hearts, maxHearts }) {
  const heartElements = Array(maxHearts)
    .fill()
    .map((h, index) => {
      //Determine how full this individual heart is
      let fill = 0;
      if (hearts >= index + 1) {
        fill = 1;
      } else if (index + 1 - hearts === 0.5) {
        fill = 0.5;
      }

      return <Heart key={index} fill={fill} />;
    });

  return <div className={"HeartsGrid"}>{heartElements}</div>;
}
