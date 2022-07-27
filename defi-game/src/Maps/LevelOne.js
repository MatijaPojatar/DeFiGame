import React, { useEffect, useState } from "react";
import Board from "../Components/Board";

export default function LevelOne({charType}) {
  const backgroundImage = "/clear_maps/FirstLevel.png";
  const foregroundImage = "/foregrounds/foregroundFirstLevel.png";


  useEffect(() => {
  }, []);

  return (
    <Board
      backgroundImageSrc={backgroundImage}
      foregroundImageSrc={foregroundImage}
      playerDownImageSrc={"/sprites/"+charType+"/down.png"}
      playerLeftImageSrc={"/sprites/"+charType+"/left.png"}
      playerUpImageSrc={"/sprites/"+charType+"/up.png"}
      playerRightImageSrc={"/sprites/"+charType+"/right.png"}
      charType={charType}
    />
  );
}
