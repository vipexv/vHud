import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import {
  Users,
} from "lucide-react";

interface playerStatus {
  money: number | string | any;
  bank: string | number | any;
  dirtyMoney: string | number | any;
}

interface props {
  userSettings?: any;
}

interface statusSettings {
  hudMode: number | string;
  statusBarMode: number | string;
}

const TopRight: React.FC<props> = ({ userSettings }) => {
  const [playerStatus, setPlayerStatus] = useState<playerStatus>({
    money: 100000,
    bank: 10901230,
    dirtyMoney: 992130,
  });

  // const [serverData, setServerData] = useState({
  //   onlinePlayers: 180,
  //   sourceId: 0,
  // });

  const [pid, setPid] = useState<number>();
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [statusSettings, setStatusSettings] = useState<statusSettings>({
    hudMode: 1,
    statusBarMode: 1,
  });

  useNuiEvent("nui:state:pid", (id) => {
    setPid(id);
  });

  useNuiEvent("nui:state:onlineplayers", (op) => {
    // animateNumber(onlinePlayersElement, op, "/2000");
    setOnlinePlayers(op);
    // console.log(`[DEBUG] Online Players Var: ${op}`);
  });

  useNuiEvent("nui:state:info_bar_settings", (data) => {
    if (!data.statusBarMode) return console.log("Debug point 2.");
    setStatusSettings(data);
  });

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
                {onlinePlayers}/200
              </span>
            </p>
            <p
              className="inline-flex justify-center items-center mr-14 text-xs bg-black p-2 rounded bg-opacity-80 font-bold"
              style={{
                borderTopLeftRadius: "20%",
                borderBottomRightRadius: "20%",
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
                  <p>
                    <span className="text-green-500">Narco</span> RP
                  </p>
                  <span
                    className="font-inter uppercase font-bold"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    discord.gg/<span className="text-green-500">narco</span>
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
