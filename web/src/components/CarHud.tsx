import React, { useState } from "react";
// import { fetchNui } from "../utils/fetchNui";
import { motion } from "framer-motion";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Cog, Fuel, Gauge } from "lucide-react";
import { animateNumber } from "../utils/animateNumber";

interface props {
  userSettings?: any;
  scriptConfig: Config;
}

interface Settings {
  hudMode: number | string;
  statusBarMode: number | string;
  transparency: any;
}

interface Config {
  ["Debug"]: boolean;
  ["Server Name"]: string;
  ["Footer"]: string;
  ["Player Slots"]: string | number;
  ["Default Settings"]: Settings;
}

interface VehData {
  speed: number | string;
  rpm: number | string;
  gear: number | string;
  fuel: number | string;
}

const CarHud: React.FC<props> = ({ userSettings, scriptConfig }) => {
  const [vehicleData, setVehicleData] = useState<VehData>({
    speed: 0,
    rpm: 0,
    gear: 0,
    fuel: 100,
  });

  useNuiEvent<VehData>("nui:state:vehdata", (data) => {
    const mphContainer = document.getElementById(
      "vehSpeed"
    ) as HTMLParagraphElement;
    setVehicleData(data);
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
        <div className="flex flex-row bg-black opacity-80 rounded p-2 px-1 font-bold justify-between scale-90">
          <div className="flex p-1 gap-2 justify-center items-center">
            <motion.p
              initial={{
                y: 20,
              }}
              animate={{
                y: 0,
              }}
              key={vehicleData.gear}
            >
              {vehicleData.gear}
            </motion.p>
            <Cog size={16} />
          </div>
          <div className="flex justify-center items-center flex-col mr-5 ml-5">
            <p className="" id="vehSpeed">
              0
            </p>
            <p className="text-xs opacity-50">
              {userSettings.measurementSystem === "MPH" ? "MP/H" : "KM/H"}
            </p>
          </div>
          <div className="flex p-1 gap-2 justify-center transition-all">
            <Fuel size={16} strokeWidth={2} className="place-self-center" />
            <div
              className={`w-[7px] rounded-[2px] max-h-full bg-blue-600 h-[${vehicleData.fuel}%]`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarHud;
