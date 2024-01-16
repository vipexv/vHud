import React, { useState } from "react";
import { ConfigInterface, SettingsInterface } from "@/App";
import { motion } from "framer-motion";
import { Cog, Fuel } from "lucide-react";
import { FaUserAltSlash } from "react-icons/fa";
import "../App.css";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { animateNumber } from "../utils/animateNumber";

interface props {
  userSettings: SettingsInterface;
  scriptConfig: ConfigInterface;
  playerState: any;
  settingsVisible: boolean;
}

interface VehData {
  speed: number | string;
  rpm: number | string;
  gear: number | string;
  fuel: number | string;
  isSeatbeltOn: boolean;
}

const CarHud: React.FC<props> = ({
  userSettings,
  scriptConfig,
  playerState,
  settingsVisible,
}) => {
  const [vehicleData, setVehicleData] = useState<VehData>({
    speed: 0,
    rpm: 0,
    gear: 0,
    fuel: 100,
    isSeatbeltOn: false,
  });

  const framework = scriptConfig.Framework.toLowerCase();

  const isSeatbeltEnabled =
    framework === "esx" ||
    (framework === "qb" && scriptConfig["Framework Options"].Seatbelt);

  useNuiEvent<VehData>("nui:state:vehdata", (data) => {
    const mphContainer = document.getElementById(
      "vehSpeed"
    ) as HTMLParagraphElement;
    setVehicleData(data);
    animateNumber(mphContainer, data.speed, "", userSettings);
  });
  return (
    <>
      <div
        className={`${
          playerState.isInVeh || settingsVisible ? "visible" : "invisible"
        }`}
      >
        <div
          className={`flex justify-center items-center h-[40px] font-bold ${
            userSettings.hudMode.toString() === "2" ? "skew-x-6" : ""
          }`}
        >
          {(isSeatbeltEnabled && !vehicleData.isSeatbeltOn) ||
            (settingsVisible && (
              <>
                <div
                  className={`bg-black bg-opacity-80 border py-[8px] px-5 rounded-[2px]`}
                >
                  <FaUserAltSlash className="text-red-600 animate-pulse" />
                </div>
              </>
            ))}
        </div>
        <div
          className={`flex flex-row bg-black border opacity-80 rounded-[2px] px-2 py-[4px] font-bold justify-between scale-90 ${
            userSettings.hudMode.toString() == "2" ? "skew-x-6" : ""
          }`}
        >
          <div className="flex p-1 gap-2 justify-center items-center">
            <motion.p
              className="text-[13.5px]"
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
            <Cog size={16} strokeWidth={2.25} />
          </div>
          <div className="flex justify-center items-center flex-col mr-5 ml-5">
            <p
              className="opacity-100 text-opacity-100 text-white"
              id="vehSpeed"
            >
              0
            </p>
            <p className="text-[9.5px] opacity-50">
              {userSettings.measurementSystem === "MPH" ? "MP/H" : "KM/H"}
            </p>
          </div>
          <div className="flex p-1 gap-2 justify-center transition-all">
            <Fuel size={16} strokeWidth={2.25} className="place-self-center" />
            <div className="bg-primary rounded-[2px] border p-[2px] h-[35px] flex">
              <div
                className={`w-[5px] max-h-full bg-blue-600 transition-all place-self-end`}
                style={{
                  height: `${vehicleData.fuel}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarHud;
