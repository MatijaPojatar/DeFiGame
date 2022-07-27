import React, { useState } from "react";
import "./Hud.css";
import Hearts from "./Hearts";

export default function Hud() {
  const [hearts, setHearts] = useState(3);
  const [maxHearts, setMaxHearts] = useState(5);
  return (
    <div className="Hud">
      <Hearts hearts={hearts} maxHearts={maxHearts}></Hearts>
    </div>
  );
}
