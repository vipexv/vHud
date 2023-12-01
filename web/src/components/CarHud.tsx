import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Mic, ShieldPlus, Heart } from "lucide-react";
import { animateNumber } from "../utils/animateNumber";

interface props {
  userSettings?: any;
}

const CarHud: React.FC<props> = ({ userSettings }) => {
  useNuiEvent("nui:state:vehdata", (data) => {
    const mphContainer = document.getElementById(
      "vehSpeed"
    ) as HTMLParagraphElement;
    animateNumber(mphContainer, data.speed, "");
  });
  return (
    <>
      <div
        className="absolute top-[91vh] left-2/4 -translate-x-2/4 -translate-y-2/4 font-inter text-white"
        style={{
          opacity: userSettings.transparency
            ? `${userSettings.transparency}%`
            : "100%",
        }}
      >
        <div className="flex justify-center items-center flex-col bg-black opacity-80 rounded p-2 px-4 font-bold">
          <p className="" id="vehSpeed">
            0
          </p>
          <p className="text-xs opacity-50">MP/H</p>
        </div>
      </div>
    </>
  );
};

export default CarHud;
