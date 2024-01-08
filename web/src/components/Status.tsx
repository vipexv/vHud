import { ConfigInterface, SettingsInterface } from "@/App";
import { cn } from "@/lib/utils";
import { Transition } from "@mantine/core";
import { Brain, Droplet, Heart, Mic, ShieldPlus, Soup } from "lucide-react";
import React, { useState } from "react";
import { TbHexagonLetterH } from "react-icons/tb";
import "../App.css";
import { useNuiEvent } from "../hooks/useNuiEvent";

interface playerStats {
  health: number | string;
  armor: number | string;
  mic: boolean;
}

interface props {
  userSettings?: SettingsInterface;
  scriptConfig: ConfigInterface;
  playerState: any;
}

interface frameworkStatus {
  hunger: number | string;
  thirst: number | string;
  stress?: number | string;
  harnessDurability?: number | string;
}

const Status: React.FC<props> = ({
  userSettings,
  scriptConfig,
  playerState,
}) => {
  const [pstats, setStats] = useState<playerStats>({
    health: 0,
    armor: 0,
    mic: false,
  });

  const [frameworkStatus, setFrameworkStatus] = useState({
    hunger: 0,
    thirst: 0,
    stress: 0,
    harnessDurability: 0,
  });

  const [micActive, setMicActive] = useState("0");

  useNuiEvent("nui:data:frameworkStatus", setFrameworkStatus);

  useNuiEvent("nui:data:playerstats", (stats) => {
    setStats(stats);

    setMicActive(stats.mic ? "100" : "0");
  });

  interface Stat {
    name: string;
    icon: any;
    className: any;
    renderCondition: boolean;
    value: any;
    hideInHudMode?: string;
  }

  const stats: Stat[] = [
    {
      name: "health",
      icon: Heart,
      className: "bg-green-500",
      renderCondition: true,
      value: pstats.health,
    },
    {
      name: "hunger",
      icon: Soup,
      className: "bg-yellow-500",
      renderCondition: scriptConfig["Framework Options"]["Status"],
      value: frameworkStatus["hunger"],
    },
    {
      name: "harnessDurability",
      icon: TbHexagonLetterH,
      className: "bg-purple-500",
      renderCondition:
        scriptConfig["Framework Options"]["Harness"] && playerState.isInVeh,
      value: frameworkStatus["harnessDurability"],
    },
    {
      name: "mic",
      icon: Mic,
      className: "bg-white bg-opacity-50",
      hideInHudMode: "2",
      renderCondition: true,
      value: micActive,
    },
    {
      name: "stress",
      icon: Brain,
      className: "bg-white bg-opacity-50",
      renderCondition: scriptConfig["Framework Options"].Stress,
      value: frameworkStatus["stress"],
    },
    {
      name: "thirst",
      icon: Droplet,
      className: "bg-cyan-500",
      renderCondition: scriptConfig["Framework Options"].Status,
      value: frameworkStatus["thirst"],
    },
    {
      name: "armor",
      icon: ShieldPlus,
      className: "bg-blue-500",
      renderCondition: true,
      value: pstats.armor,
    },
  ];

  return (
    <>
      {userSettings?.hudMode.toString() === "2" && (
        <>
          <Transition
            mounted={micActive === "100" ? true : false}
            transition="slide-up"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <div className="absolute top-[97.5vh] left-[50dvh] -translate-x-2/4 -translate-y-2/4 skew-x-6">
                <p
                  className="bg-black bg-opacity-80 mb-2 flex justify-center items-center flex-col font-inter text-white font-bold rounded-[2px]"
                  style={{
                    minWidth: "40px",
                    minHeight: "40px",
                    ...styles,
                  }}
                >
                  <Mic
                    size={18}
                    strokeWidth={2.5}
                    className="text-white animate-pulse"
                  />
                </p>
                <a href="" target="_blank"></a>
              </div>
            )}
          </Transition>
        </>
      )}
      <div className="absolute left-2/4 top-[97.5dvh] -translate-x-2/4 -translate-y-2/4">
        <div className="flex justify-center items-center mb-3">
          {userSettings?.hudMode == 1 ? (
            <>
              <div className="bg-black bg-opacity-80 flex items-center justify-center border rounded-[2px]">
                {stats.map((stat, index) => {
                  return (
                    <>
                      {stat.renderCondition &&
                        stat.hideInHudMode !==
                          userSettings.hudMode.toString() && (
                          <>
                            <p
                              className="p-2"
                              style={{
                                borderTopLeftRadius: "",
                              }}
                            >
                              <stat.icon size={18} className="text-white" />
                              <div
                                className={cn(
                                  "max-w-full rounded mt-1",
                                  stat.className
                                )}
                                style={{
                                  height: "2.5px",
                                  transition: "width 0.3s",
                                  width: `${stat.value}%`,
                                }}
                              ></div>
                              {/* <p>100%</p> */}
                            </p>
                          </>
                        )}
                    </>
                  );
                })}
              </div>
            </>
          ) : userSettings?.hudMode == 2 ? (
            <>
              <div className="flex flex-row bg-black bg-opacity-80 rounded-[2px] border skew-x-6">
                {stats.map((stat, index) => {
                  return (
                    <>
                      {stat.renderCondition &&
                        stat.hideInHudMode !==
                          userSettings.hudMode.toString() && (
                          <>
                            <p
                              className="p-2 flex justify-center items-center flex-col font-horizon text-white"
                              style={{
                                // borderTopLeftRadius: "50%",
                                borderBottomLeftRadius: "4px",
                                borderTopLeftRadius: "4px",
                                width: "55px",
                                // fontSize: "11px",
                              }}
                            >
                              <stat.icon
                                size={20}
                                strokeWidth={2.5}
                                className={cn(
                                  "rounded-[2px] px-1",
                                  stat.className
                                )}
                              />
                              <p
                                className="text-xs mt-[1px]"
                                style={{
                                  fontSize: "10px",
                                }}
                              >
                                {stat.value}
                              </p>
                            </p>
                          </>
                        )}
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="scale-90 flex justify-center gap-2 items-center">
                {stats.map((stat, index) => {
                  return (
                    <>
                      {stat.renderCondition &&
                        stat.hideInHudMode !==
                          userSettings?.hudMode.toString() && (
                          <>
                            <div
                              className="bg-black border bg-opacity-80 font-inter text-white font-bold rounded p-2 h-80 flex flex-col items-center justify-center"
                              style={{
                                maxHeight: "50px",
                                transition: "height 0.3s",
                              }}
                            >
                              <stat.icon
                                size={18}
                                strokeWidth={2.5}
                                className="text-white absolute"
                              />
                              <div
                                className={cn(
                                  "w-8 h-3/3 rounded bg-opacity-80 flex items-center justify-center",
                                  stat.className
                                )}
                                style={{
                                  transition: "height 0.3s",
                                  height: `${stat.value}%`,
                                }}
                              ></div>
                              {/* <p className="text-xs">Health: {pstats.health}%</p> */}
                            </div>
                          </>
                        )}
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Status;
