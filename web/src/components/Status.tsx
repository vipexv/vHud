import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Mic, ShieldPlus, Heart } from "lucide-react";
import { animateNumber } from "../utils/animateNumber";
import { motion } from "framer-motion";

interface statusSettings {
  hudMode: number | string;
  statusBarMode: number | string;
}

interface playerStats {
  health: number | string;
  armor: number | string;
  mic: boolean;
}

interface props {
  userSettings?: any;
}

const Status: React.FC<props> = ({ userSettings }) => {
  const [percentageMode, setPercentageMode] = useState(false);
  const [pstats, setStats] = useState({
    health: 10,
    armor: 10,
    mic: false,
  });

  const [statusSettings, setStatusSettings] = useState<statusSettings>({
    hudMode: 1,
    statusBarMode: 1,
  });

  useNuiEvent<statusSettings>("nui:state:settings", (data) => {
    if (!data) {
      return console.log("Param is null, returning.");
    }
    setStatusSettings(data);
  });

  const [micActive, setMicActive] = useState(false);
  useNuiEvent("nui:data:playerstats", (stats) => {
    const health = document.getElementById("health") as HTMLParagraphElement;
    setStats(stats);
    if (userSettings.hudMode !== 2) return;

    animateNumber(health, stats.health, "%");

    // const mic = document.getElementById("mic") as HTMLParagraphElement;

    // animateNumber(mic, stats.mic, "%");

    setMicActive(stats.mic);

    const armor = document.getElementById("armor") as HTMLParagraphElement;

    animateNumber(armor, stats.armor, "%");
  });

  return (
    <>
      {/* <button
        className="bg-black font-bold text-white font-inter px-2 py-1 rounded bg-opacity-80 mt-10 ml-3"
        onClick={(e) => {
          setMicActive(!micActive);
        }}
      >
        Toggle Mic
      </button>

      <button
        className="bg-black font-bold text-white font-inter px-2 py-1 rounded bg-opacity-80 mt-10 ml-3"
        onClick={(e) => {
          if (userSettings.hudMode >= 3) {
            setStatusSettings({
              hudMode: 1,
            });
          } else {
            setStatusSettings({
              hudMode: userSettings.hudMode + 1,
            });
          }
        }}
      >
        Toggle Hud Mode
      </button>

      <button
        className="bg-black font-bold text-white font-inter px-2 py-1 rounded bg-opacity-80 mt-10 ml-3"
        onClick={(e) => {
          if (pstats.health >= 100) {
            setStats({
              health: 10,
              armor: 10,
              mic: false,
            });
          } else {
            // userSettings.hudMode = userSettings.hudMode + 1;
            setStats({
              health: 100,
              armor: 100,
              mic: false,
            });
          }
        }}
      >
        Change Stats
      </button> */}

      {!!micActive && userSettings.hudMode === 2 && (
        <>
          <div className="absolute top-[98vh] left-[50dvh] -translate-x-2/4 -translate-y-2/4">
            {/*<p className=""></p>*/}
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
        <div className="flex justify-center items-center mb-3">
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
                className="bg-black p-2 bg-opacity-80 flex justify-center items-center flex-col font-inter text-white font-bold"
                style={{
                  // borderTopLeftRadius: "50%",
                  borderBottomLeftRadius: "4px",
                  borderTopLeftRadius: "4px",
                  minWidth: "48px",
                }}
              >
                <Heart size={18} strokeWidth={2.5} className="text-green-500" />
                <p className="text-xs" id="health">
                  100%
                </p>
              </p>
              <p
                className="bg-black p-2 bg-opacity-80 flex justify-center items-center flex-col font-inter text-white font-bold"
                style={{
                  // borderTopRightRadius: "50%",
                  borderBottomRightRadius: "4px",
                  borderTopRightRadius: "4px",
                  minWidth: "48px",
                }}
              >
                <ShieldPlus
                  size={18}
                  strokeWidth={2.5}
                  className="rounded text-blue-500"
                />
                <p className="text-xs" id="armor">
                  0%
                </p>
              </p>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Status;
