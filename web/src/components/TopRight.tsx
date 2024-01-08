import { ConfigInterface, SettingsInterface } from "@/App";
import React, { useState } from "react";
import "../App.css";
import { useNuiEvent } from "../hooks/useNuiEvent";

interface props {
  userSettings: SettingsInterface;
  scriptConfig: ConfigInterface;
  playerState: any;
}

const TopRight: React.FC<props> = ({
  userSettings,
  scriptConfig,
  playerState,
}) => {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [maxClients, setMaxClients] = useState(0);

  useNuiEvent("nui:state:onlineplayers", setOnlinePlayers);
  useNuiEvent("nui:state:maxclients", setMaxClients);

  const statusBarMode = userSettings.statusBarMode.toString();
  const hudMode = userSettings.hudMode.toString();
  return (
    <>
      {userSettings.statusBarMode.toString() !== "3" && (
        <>
          <div
            className={`rounded p-2 bg-opacity-80 text-white absolute ${
              statusBarMode === "1"
                ? "top-[1px] right-1"
                : statusBarMode === "2"
                ? "bottom-[1px] right-1"
                : ""
            } font-inter`}
          >
            <div
              className={`bg-black bg-opacity-[0.85] rounded-[2px] border p-2 ${
                userSettings.hudMode.toString() === "2" ? "skew-x-6" : ""
              }`}
            >
              <div className="flex gap-3 justify-around items-center font-inter font-bold font-poppins">
                <div className="px-2 py-1 bg-primary text-xs bg-opacity-50 border flex justify-center items-center gap-1 rounded-[2px]">
                  {playerState.id}
                </div>
                <div className="font-horizon text-xs uppercase">
                  {scriptConfig["Header"]}
                </div>
                <div className="px-2 py-1 bg-primary text-xs bg-opacity-50 border flex justify-center items-center gap-1 rounded-[2px]">
                  {onlinePlayers}/{maxClients}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopRight;
