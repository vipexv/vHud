import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Mic, ShieldPlus, Heart, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UserSettings {
  hudMode: number | string;
  statusBarMode: number | string;
  transparency: any;
}

interface props {
  userSettings: UserSettings;
}

const Settings: React.FC<props> = ({ userSettings }) => {
  const [settings, setSettings] = useState<UserSettings>({
    hudMode: 1,
    statusBarMode: 1,
    transparency: 100,
  });

  const toggleVisibility = () => {
    fetchNui("hud:visibility", {});
  };
  const updateSettings = (data: UserSettings) => {
    setSettings(data);
    fetchNui("hud:cb:settings", data);
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        fetchNui("hud:settings:visibility");
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 50,
        }}
        className="absolute top-2/4 left-2/4 bg-black rounded bg-opacity-90 p-2 min-w-[60dvh] min-h-[35dvw] h-[35dvw] overflow-y-scroll"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="flex flex-col text-white justify-center items-center">
          <h1
            className="font-horizon text-xl bg-black p-2 rounded bg-opacity-50"
            style={{
              borderTopRightRadius: "30%",
              borderBottomLeftRadius: "30%",
            }}
          >
            <span className="text-green-500">Hud</span> Settings
          </h1>

          <div className="flex flex-col gap-3 items-center justify-center mt-10">
            <h1
              className="font-horizon bg-black rounded p-2 bg-opacity-50"
              style={{
                borderTopLeftRadius: "30%",
                borderBottomRightRadius: "30%",
              }}
            >
              Hud <span className="text-green-500">Mode</span>
            </h1>
            <div className="grid grid-cols-2 boxshadow p-2 rounded gap-24">
              <div
                className={`flex bg-white ${
                  userSettings.hudMode.toString() === "1"
                    ? "border border-green-500"
                    : ""
                } bg-opacity-5 hover:bg-opacity-10 p-2 rounded hover:cursor-pointer transition justify-center items-center`}
                onClick={() => {
                  updateSettings({
                    hudMode: 1,
                    statusBarMode: userSettings.statusBarMode,
                    transparency: userSettings.transparency,
                  });
                }}
              >
                <p
                  className="bg-black p-2 bg-opacity-80"
                  style={{
                    // borderTopLeftRadius: "50%",
                    borderBottomLeftRadius: "4px",
                    borderTopLeftRadius: "4px",
                    transition: "width 0.3s",
                    maxHeight: "50px",
                  }}
                >
                  <Heart size={18} className="text-white" />
                  <div
                    className="max-w-full bg-green-500 rounded mt-1"
                    style={{
                      height: "2.5px",
                      transition: "width 0.3s",

                      width: `50%`,
                    }}
                  ></div>
                </p>
                <p
                  className="bg-black p-2 bg-opacity-80"
                  style={{
                    borderTopLeftRadius: "",
                    maxHeight: "50px",
                  }}
                >
                  <Mic size={18} className="text-white" />
                  <div
                    className="max-w-full bg-white rounded mt-1"
                    style={{
                      height: "2.5px",
                      transition: "width 0.3s",

                      width: "100%",
                    }}
                  ></div>
                  {/* <p>100%</p> */}
                </p>
                <p
                  className="bg-black p-2 bg-opacity-80"
                  style={{
                    // borderTopRightRadius: "50%",
                    borderBottomRightRadius: "4px",
                    maxHeight: "50px",

                    borderTopRightRadius: "4px",
                  }}
                >
                  <ShieldPlus size={18} className="text-white rounded" />
                  <div
                    className="max-w-full bg-blue-500 rounded mt-1"
                    style={{
                      height: "2.5px",
                      transition: "width 0.3s",
                      width: `50%`,
                    }}
                  ></div>
                </p>
              </div>
              <div
                className={`flex p-2 bg-white ${
                  userSettings.hudMode.toString() === "2"
                    ? "border border-green-500"
                    : ""
                } bg-opacity-5 hover:bg-opacity-10 rounded hover:cursor-pointer transition justify-center items-center`}
                onClick={() => {
                  updateSettings({
                    hudMode: 2,
                    statusBarMode: userSettings.statusBarMode,
                    transparency: userSettings.transparency,
                  });
                }}
              >
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
                  <Heart
                    size={18}
                    strokeWidth={2.5}
                    className="text-green-500"
                  />
                  <p
                    className="text-xs mt-1"
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
                    className="text-xs mt-1"
                    id="armor"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    50
                  </p>
                </p>
              </div>

              <div
                className={`flex ${
                  userSettings.hudMode.toString() === "3"
                    ? "border border-green-500"
                    : ""
                } p-2 bg-white bg-opacity-5 hover:bg-opacity-10 rounded hover:cursor-pointer hover:bg-white transition justify-center items-center col-span-2`}
                onClick={() => {
                  updateSettings({
                    hudMode: 3,
                    statusBarMode: userSettings.statusBarMode,
                    transparency: userSettings.transparency,
                  });
                }}
              >
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
                      height: `100%`,
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
                    strokeWidth={2.5}
                    className={`rounde text-white absolute`}
                  />
                  <div
                    className="w-8 h-3/3 bg-white rounded flex items-center justify-center"
                    style={{
                      transition: "height 0.3s",
                      height: "0%",
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
                      height: `100%`,
                    }}
                  ></div>
                  {/* <p className="text-xs">Health: {pstats.health}%</p> */}
                </div>
              </div>
            </div>
            <h1
              className="font-horizon bg-black rounded p-2 bg-opacity-50 mt-10"
              style={{
                borderTopLeftRadius: "30%",
                borderBottomRightRadius: "30%",
              }}
            >
              <span className="text-green-500">Miscel</span>
              <span className="">laneous</span>
            </h1>
            <button
              className="mt-5 w-[25dvw] border rounded py-2 font-inter font-bold border-none bg-white bg-opacity-5 hover:bg-opacity-10 transition flex justify-center items-center"
              style={{
                borderWidth: "2.5px",
              }}
              onClick={() => {
                toggleVisibility();
              }}
            >
              <EyeOff className="mr-2" />
              Toggle Visibility
            </button>
            <div className="flex flex-row gap-14 items-center py-3 px-2 rounded bg-white bg-opacity-5 w-[25dvw]">
              <p className="font-inter ml-16 font-bold">Status Bar Location</p>
              <RadioGroup
                // defaultValue={settings.statusBarMode.toString()}
                ///@ts-ignore
                value={userSettings.statusBarMode}
                onValueChange={(e) => {
                  updateSettings({
                    hudMode: userSettings.hudMode,
                    statusBarMode: e,
                    transparency: userSettings.transparency,
                  });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="1" />
                  <Label htmlFor="1">Top Right</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2">Bottom Right</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">Off</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-row gap-14 items-center py-3 px-2 rounded bg-white bg-opacity-5 w-[25dvw] font-inter font-bold">
              <p className="ml-16">Transparency</p>
              <Slider
                defaultValue={[userSettings.transparency]}
                max={100}
                step={0.1}
                onValueChange={(e) => {
                  updateSettings({
                    hudMode: userSettings.hudMode,
                    statusBarMode: userSettings.statusBarMode,
                    transparency: e,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Settings;
