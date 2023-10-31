import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Mic, ShieldPlus, Heart } from "lucide-react";
import { animateNumber } from "../utils/animateNumber";
import { motion } from "framer-motion";

const TopRight: React.FC = () => {
  const [percentageMode, setPrecentageMode] = useState(true);
  const [pstats, setStats] = useState({
    health: 0,
    armor: 0,
    mic: 0,
  });

  const [micActive, setMicActive] = useState(false);
  useNuiEvent("nui:data:playerstats", (stats) => {
    const health = document.getElementById("health") as HTMLParagraphElement;

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
        className="bg-black font-bold text-white font-inter p-2 rounded bg-opacity-80 mt-10 ml-10"
        onClick={(e) => {
          setMicActive(!micActive);
        }}
      >
        Toggle Mic
      </button> */}
      <div
        className="absolute left-2/4 -translate-x-2/4 -translate-y-2/4"
        style={{
          top: "98dvh",
        }}
      >
        <div className="flex justify-center items-center mb-3">
          {!percentageMode ? (
            <>
              <p
                className="bg-black p-2 bg-opacity-80"
                style={{
                  // borderTopLeftRadius: "50%",
                  borderBottomLeftRadius: "4px",
                  borderTopLeftRadius: "4px",
                }}
              >
                <Heart size={18} className="text-white" />
                {/* <Heart strokeWidth={3} /> */}
                <div
                  className="max-w-full bg-green-500 rounded mt-1"
                  style={{
                    height: "2px",
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
                    height: "2px",
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
                    height: "2px",
                  }}
                ></div>
              </p>
            </>
          ) : (
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
              {!!micActive && (
                <>
                  <motion.p
                    className="bg-black p-2 bg-opacity-80 flex justify-center items-center flex-col font-inter text-white font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    style={{
                      borderTopLeftRadius: "",
                      minWidth: "48px",
                      minHeight: "50px",
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
                </>
              )}
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
          )}
        </div>
      </div>
    </>
  );
};

export default TopRight;
