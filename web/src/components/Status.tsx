import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Mic, ShieldPlus, Heart } from "lucide-react";
import { animateNumber } from "../utils/animateNumber";
import { motion } from "framer-motion";

interface playerStats {
  health: number | string;
  armor: number | string;
  mic: boolean;
}

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

const Status: React.FC<props> = ({ userSettings, scriptConfig }) => {
  const [pstats, setStats] = useState<playerStats>({
    health: 10,
    armor: 10,
    mic: false,
  });

  const [micActive, setMicActive] = useState(false);

  useNuiEvent("nui:data:playerstats", (stats) => {
    setStats(stats);

    if (userSettings.hudMode.toString() !== "2") return;

    const health = document.getElementById("health") as HTMLParagraphElement;
    animateNumber(health, stats.health, "");
    setMicActive(stats.mic);
    const armor = document.getElementById("armor") as HTMLParagraphElement;
    animateNumber(armor, stats.armor, "");
  });

  return (
    <>
      {!!micActive && userSettings.hudMode === 2 && (
        <>
          <div className="absolute top-[98vh] left-[50dvh] -translate-x-2/4 -translate-y-2/4">
            <motion.p
              className="bg-black bg-opacity-80 mb-2 flex justify-center items-center flex-col font-inter text-white font-bold rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              style={{
                minWidth: "40px",
                minHeight: "40px",
                opacity: userSettings.transparency
                  ? `${userSettings.transparency}%`
                  : "100%",
              }}
            >
              <Mic
                size={18}
                strokeWidth={2.5}
                className="text-white animate-pulse"
              />

              {/* <p className="text-xs" id="mic">
                    100%
                  </p> */}
            </motion.p>
          </div>
        </>
      )}
      <div
        className="absolute left-2/4 -translate-x-2/4 -translate-y-2/4"
        style={{
          top: "98dvh",
        }}
      >
        <div
          className="flex justify-center items-center mb-3"
          style={{
            opacity: userSettings.transparency
              ? `${userSettings.transparency}%`
              : "100%",
          }}
        >
          {userSettings.hudMode == 1 ? (
            <>
              <p
                className="bg-black p-2 bg-opacity-80"
                style={{
                  // borderTopLeftRadius: "50%",
                  borderBottomLeftRadius: "4px",
                  borderTopLeftRadius: "4px",
                  transition: "width 0.3s",
                }}
              >
                <Heart size={18} className="text-white" />
                {/* <Heart strokeWidth={3} /> */}
                <div
                  className="max-w-full bg-green-500 rounded mt-1"
                  style={{
                    height: "2.5px",
                    transition: "width 0.3s",

                    width: `${pstats.health}%`,
                  }}
                ></div>
              </p>
              <p
                className="bg-black p-2 bg-opacity-80"
                style={{
                  borderTopLeftRadius: "",
                }}
              >
                <Mic size={18} className="text-white" />
                <div
                  className="max-w-full bg-white rounded mt-1"
                  style={{
                    height: "2.5px",
                    transition: "width 0.3s",

                    width: pstats.mic ? "100%" : "0%",
                  }}
                ></div>
                {/* <p>100%</p> */}
              </p>
              <p
                className="bg-black p-2 bg-opacity-80"
                style={{
                  // borderTopRightRadius: "50%",
                  borderBottomRightRadius: "4px",
                  borderTopRightRadius: "4px",
                }}
              >
                <ShieldPlus size={18} className="text-white rounded" />
                <div
                  className="max-w-full bg-blue-500 rounded mt-1"
                  style={{
                    height: "2.5px",
                    transition: "width 0.3s",
                    width: `${pstats.armor}%`,
                  }}
                ></div>
              </p>
            </>
          ) : userSettings.hudMode == 2 ? (
            <>
              <p
                className="bg-black p-2 bg-opacity-80 flex skew-x-6 justify-center items-center flex-col font-horizon text-white"
                style={{
                  // borderTopLeftRadius: "50%",
                  borderBottomLeftRadius: "4px",
                  borderTopLeftRadius: "4px",
                  width: "55px",
                  // fontSize: "11px",
                }}
              >
                <Heart size={18} strokeWidth={2.5} className="text-green-500" />
                <p
                  className="text-xs"
                  style={{
                    fontSize: "10px",
                  }}
                  id="health"
                >
                  100
                </p>
              </p>
              <p
                className="bg-black p-2 bg-opacity-80 skew-x-6 flex justify-center items-center flex-col font-horizon text-white"
                style={{
                  // borderTopRightRadius: "50%",
                  borderBottomRightRadius: "4px",
                  borderTopRightRadius: "4px",
                  width: "55px",
                }}
              >
                <ShieldPlus
                  size={18}
                  strokeWidth={2.5}
                  className="rounded text-blue-500"
                />
                <p
                  className="text-xs"
                  id="armor"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  50
                </p>
              </p>
            </>
          ) : (
            <>
              <div className="scale-90 flex justify-center items-center">
                <div
                  className="bg-black bg-opacity-80 font-inter text-white font-bold rounded p-2 h-80 flex flex-col items-center justify-center"
                  style={{
                    maxHeight: "50px",
                    transition: "height 0.3s",
                  }}
                >
                  <Heart
                    size={18}
                    strokeWidth={2.5}
                    className="text-white absolute"
                  />
                  <div
                    className="w-8 h-3/3 bg-red-600 rounded bg-opacity-80 flex items-center justify-center"
                    style={{
                      transition: "height 0.3s",
                      height: `${pstats.health}%`,
                    }}
                  ></div>
                  {/* <p className="text-xs">Health: {pstats.health}%</p> */}
                </div>
                <div
                  className="bg-black bg-opacity-80 font-inter text-white font-bold rounded p-2 h-80 flex flex-col items-center justify-center ml-2"
                  style={{
                    maxHeight: "50px",
                    transition: "height 0.3s",
                  }}
                >
                  <Mic
                    size={18}
                    strokeWidth={2}
                    className={`rounded ${
                      pstats.mic ? "text-black" : "text-white"
                    } absolute`}
                  />
                  <div
                    className="w-8 h-3/3 bg-white rounded flex items-center justify-center"
                    style={{
                      transition: "height 0.3s",
                      height: pstats.mic ? "100%" : "0%",
                    }}
                  ></div>
                  {/* <p className="text-xs">Health: {pstats.health}%</p> */}
                </div>

                <div
                  className="bg-black bg-opacity-80 font-inter text-white font-bold rounded p-2 h-80 flex flex-col items-center justify-center ml-2"
                  style={{
                    maxHeight: "50px",
                    transition: "height 0.3s",
                  }}
                >
                  <ShieldPlus
                    size={18}
                    strokeWidth={2.5}
                    className="rounded text-white absolute"
                  />
                  <div
                    className="w-8 h-3/3 bg-blue-600 rounded bg-opacity-80 flex items-center justify-center"
                    style={{
                      transition: "height 0.3s",
                      height: `${pstats.armor}%`,
                    }}
                  ></div>
                  {/* <p className="text-xs">Health: {pstats.health}%</p> */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Status;
