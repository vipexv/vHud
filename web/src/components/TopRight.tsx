import React, { useState } from "react";
// import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { User, Users } from "lucide-react";

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
  ["Framework"]: string;
  ["Framework Options"]: { ["Status"]: boolean };
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
      {userSettings.statusBarMode.toString() !== "3" && (
        <>
          <div
            className={`rounded p-2 bg-opacity-80 text-white transition-all absolute scale-90 ${
              userSettings.statusBarMode.toString() == "1"
                ? "top-1 right-2"
                : userSettings.statusBarMode.toString() == "2"
                ? "bottom-1 right-2"
                : ""
            } font-inter`}
            style={{
              opacity: userSettings.transparency
                ? `${userSettings.transparency}%`
                : "100%",
            }}
          >
            <div className="flex flex-col">
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
                  className="inline-flex min-w-[65px] items-center mr-14 text-xs bg-black p-2 rounded bg-opacity-80 font-bold"
                  style={{
                    borderTopRightRadius: "20%",
                    borderBottomLeftRadius: "20%",
                  }}
                >
                  <User size={16} className="mr-1" /> ID: {pid}
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
          </div>
        </>
      )}
    </>
  );
};

export default TopRight;
