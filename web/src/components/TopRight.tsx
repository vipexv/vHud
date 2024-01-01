import React, { useState } from "react";
// import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { User, Users } from "lucide-react";
import { ConfigInterface } from "@/App";
import { SettingsInterface } from "@/App";

interface props {
  userSettings: SettingsInterface;
  scriptConfig: Config;
}

interface Config {
  ["Debug"]: boolean;
  ["Server Name"]: string;
  ["Footer"]: string;
  ["Framework"]: string;
  ["Framework Options"]: { ["Status"]: boolean; ["Multi Character"]: boolean };
  ["Player Slots"]: string | number;
  ["Default Settings"]: SettingsInterface;
}

const TopRight: React.FC<props> = ({ userSettings, scriptConfig }) => {
  const [pid, setPid] = useState<number>();
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [maxClients, setMaxClients] = useState(0);

  useNuiEvent("nui:state:pid", (id) => {
    setPid(id);
  });

  useNuiEvent("nui:state:onlineplayers", setOnlinePlayers);
  useNuiEvent("nui:state:maxclients", setMaxClients);

  const statusBarMode = userSettings.statusBarMode.toString();
  const hudMode = userSettings.hudMode.toString();
  const transparency = userSettings.transparency;
  return (
    <>
      {userSettings.statusBarMode.toString() !== "3" && (
        <>
          <div
            className={`rounded p-2 bg-opacity-80 text-white transition-all absolute scale-90 ${
              statusBarMode === "1"
                ? "top-1 right-2"
                : statusBarMode === "2"
                ? "bottom-1 right-2"
                : ""
            } font-inter`}
            style={{
              opacity: transparency ? `${transparency}%` : "100%",
            }}
          >
            <div className="flex justify-center gap-10 items-center">
              <p className="inline-flex justify-center items-center text-xs bg-black p-2 rounded bg-opacity-80 font-bold skew-x-6">
                <Users size={16} />:{" "}
                <span id="onlinePlayers" className="ml-1">
                  {onlinePlayers}/{maxClients}
                </span>
              </p>

              <p className="inline-flex min-w-[65px] items-center text-xs bg-black p-2 rounded bg-opacity-80 font-bold skew-x-6">
                <User size={16} className="mr-1" /> ID: {pid}
              </p>
              <div className="flex flex-col justify-center items-center">
                <p className="font-horizon bg-black rounded p-2 bg-opacity-80 text-xs skew-x-6">
                  <div className="flex flex-col justify-center items-center">
                    <p>{scriptConfig["Server Name"]}</p>
                    <span
                      className=" opacity-50"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      {scriptConfig["Footer"]}
                    </span>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopRight;
