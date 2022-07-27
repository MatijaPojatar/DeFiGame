import React, { useState } from "react";
import "./Hud.css";
import Hearts from "./Hearts";

export default function Hud({ hearts, maxHearts }) {
  return (
    <div className="Hud">
      <Hearts hearts={hearts} maxHearts={maxHearts}></Hearts>
    </div>
  );
}
