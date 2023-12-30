import React, { useState } from "react";
// import { fetchNui } from "../utils/fetchNui";
import { motion } from "framer-motion";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Cog, Fuel, Gauge } from "lucide-react";
import { animateNumber } from "../utils/animateNumber";
import { ConfigInterface } from "@/App";
import { Transition } from "@mantine/core";
import { FaUserAltSlash } from "react-icons/fa";
import { SettingsInterface } from "@/App";

interface props {
  userSettings: SettingsInterface;
  scriptConfig: ConfigInterface;
}

interface VehData {
  speed: number | string;
  rpm: number | string;
  gear: number | string;
  fuel: number | string;
  isSeatbeltOn: boolean;
}

const CarHud: React.FC<props> = ({ userSettings, scriptConfig }) => {
  const [vehicleData, setVehicleData] = useState<VehData>({
    speed: 0,
    rpm: 0,
    gear: 0,
    fuel: 100,
    isSeatbeltOn: false,
  });

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
        className="absolute top-[91vh] left-2/4 -translate-x-2/4 -translate-y-2/4 font-inter text-white"
        style={{
          opacity: userSettings.transparency
            ? `${userSettings.transparency}%`
            : "100%",
        }}
      >
        <div
          className={`flex flex-col justify-center items-center ${
            scriptConfig["Framework Options"].Seatbelt &&
            !vehicleData.isSeatbeltOn
              ? "mb-8"
              : ""
          }`}
        >
          {scriptConfig["Framework Options"].Seatbelt && (
            <>
              <Transition
                mounted={!vehicleData.isSeatbeltOn}
                transition="scale-y"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => (
                  <div
                    style={styles}
                    className="bg-black animate-pulse opacity-80 rounded-[2px] font-bold py-3 px-5"
                  >
                    <FaUserAltSlash className="text-red-600" />
                  </div>
                )}
              </Transition>
            </>
          )}
          <div
            className={`flex flex-row bg-black opacity-80 rounded-[2px] p-2 px-1 font-bold justify-between scale-90 ${
              userSettings.hudMode.toString() == "2" ? "skew-x-6" : ""
            }`}
          >
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
                className={`w-[7px] rounded-[2px] max-h-full bg-blue-600 transition-all place-self-end`}
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
