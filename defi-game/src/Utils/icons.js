import React from "react";

export const Heart = ({fill}) => {
  return (
    <svg className={"Heart"} xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 8 7" shapeRendering="crispEdges">
      <path stroke="#190004" d="M1 0h2M5 0h2M0 1h1M3 1h2M7 1h1M0 2h1M7 2h1M0 3h1M7 3h1M1 4h1M6 4h1M2 5h1M5 5h1M3 6h2" />
      <path stroke="#393232" d="M1 1h2M5 1h2M3 2h2" />
      <path stroke="#535353" d="M1 2h2M5 2h2M1 3h6M2 4h4M3 5h2" />

      {fill >= 0.5 && (<g>
        <path stroke="rgba(64,64,64,0.01568627450980392)" d="M2 0h1" />
        <path stroke="#ff3d89" d="M1 1h1M1 3h1M2 4h1M3 5h1" />
        <path stroke="#f8b1bb" d="M2 1h1M1 2h1M3 2h1M2 3h1" />
        <path stroke="rgba(255,0,64,0.01568627450980392)" d="M5 1h2M4 2h3M4 3h3M4 4h2M4 5h1" />
        <path stroke="#ff9dab" d="M2 2h1" />
        <path stroke="#ff0f32" d="M3 3h1M3 4h1" />
      </g>)}

      {fill === 1 && (<g>
        <path stroke="rgba(32,0,0,0.03137254901960784)" d="M5 0h1M7 1h1M7 2h1M7 3h1M6 4h1M3 6h2" />
        <path stroke="rgba(0,0,0,0.01568627450980392)" d="M6 0h1M4 1h1M5 5h1" />
        <path stroke="#ff0f32" d="M5 1h1M4 2h2M4 3h2M4 4h1" />
        <path stroke="#e20223" d="M6 1h1M6 2h1M6 3h1M5 4h1M4 5h1" />
      </g>)}
    </svg>
  )
};