import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Users } from "lucide-react";

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

const TopRight: React.FC<props> = ({ userSettings, scriptConfig }) => {
  const [pid, setPid] = useState<number>();
  const [onlinePlayers, setOnlinePlayers] = useState(0);

  useNuiEvent("nui:state:pid", (id) => {
    setPid(id);
  });

  useNuiEvent("nui:state:onlineplayers", setOnlinePlayers);

  return (
    <>
      <div
        className={`rounded p-2 bg-opacity-80 text-white transition-all absolute ${
          userSettings.statusBarMode.toString() == "1"
            ? "top-1 right-2"
            : userSettings.statusBarMode.toString() == "2"
            ? "bottom-1 right-2"
            : "invisible"
        } font-inter`}
        style={{
          opacity: userSettings.transparency
            ? `${userSettings.transparency}%`
            : "100%",
        }}
      >
        <div className="flex flex-col scale-90">
          <div className="flex justify-center items-center">
            <p
              className="inline-flex justify-center items-center mr-16 text-xs bg-black p-2 rounded bg-opacity-80 font-bold"
              style={{
                borderTopRightRadius: "20%",
                borderBottomLeftRadius: "20%",
              }}
            >
              <Users size={16} />:{" "}
              <span id="onlinePlayers" className="ml-1">
                {onlinePlayers}/{scriptConfig["Player Slots"]}
              </span>
            </p>

            <p
              className="inline-flex justify-center items-center mr-14 text-xs bg-black p-2 rounded bg-opacity-80 font-bold"
              style={{
                borderTopRightRadius: "20%",
                borderBottomLeftRadius: "20%",
              }}
            >
              ID: {pid}
            </p>
            <div className="flex flex-col justify-center items-center">
              <p
                className="font-horizon bg-black rounded p-2 bg-opacity-80 text-xs"
                style={{
                  borderTopRightRadius: "20%",
                  borderBottomLeftRadius: "20%",
                }}
              >
                <div className="flex flex-col justify-center items-center">
                  <p>{scriptConfig["Server Name"]}</p>
                  <span
                    className="font-inter uppercase font-bold"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    {scriptConfig["Footer"]}
                  </span>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRight;
