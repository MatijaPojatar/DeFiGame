import React, { useEffect, useState } from "react";
import Board from "../Utils/Board";

export default function LevelOne({nickname}) {
  const backgroundImage = "/clear_maps/FirstLevel.png";
  const foregroundImage = "/foregrounds/foregroundFirstLevel.png";


  useEffect(() => {
  }, []);

  return (
    <Board
      backgroundImageSrc={backgroundImage}
      foregroundImageSrc={foregroundImage}
      playerDownImageSrc={"/sprites/"+nickname+"/down.png"}
      playerLeftImageSrc={"/sprites/"+nickname+"/left.png"}
      playerUpImageSrc={"/sprites/"+nickname+"/up.png"}
      playerRightImageSrc={"/sprites/"+nickname+"/right.png"}
    />
  );
}
