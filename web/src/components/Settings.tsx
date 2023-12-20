import "../App.css";
import React, { useState, useEffect } from "react";

import { fetchNui } from "../utils/fetchNui";

import {
  EyeOff,
  Package,
  Binary,
  Gem,
  ChevronsUpDown,
  Gauge,
} from "lucide-react";

import { SegmentedControl, Slider, Text } from "@mantine/core";

import { motion } from "framer-motion";
import { useNuiEvent } from "@/hooks/useNuiEvent";

interface UserSettings {
  hudMode: number | string;
  statusBarMode: number | string;
  transparency: any;
  measurementSystem: string;
}

// interface props {
//   userSettings: UserSettings;
//   scriptConfig: Config;
// }

interface Settings {
  hudMode: number | string;
  statusBarMode: number | string;
  transparency: any;
  measurementSystem: string;
}

interface Config {
  ["Debug"]: boolean;
  ["Server Name"]: string;
  ["Footer"]: string;
  ["Player Slots"]: string | number;
  ["Default Settings"]: Settings;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    hudMode: 3,
    measurementSystem: "MPH",
    statusBarMode: 1,
    transparency: 100,
  });

  useNuiEvent("nui:state:settings", setSettings);

  useEffect(() => {
    fetchNui("hud:cb:settings", settings);
  }, [settings]);

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
      <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-[#1a1a1a] w-[40vw] h-[60vh] rounded">
        <div className="flex flex-col justify-center items-center mt-10 gap-16">
          <div className="flex flex-col justify-center items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded">
            <p className="text-lg text-white">HUD Theme</p>
            <SegmentedControl
              value={settings.hudMode.toString()}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  hudMode: value,
                });
              }}
              data={[
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <Package size={16} /> Default
                      </p>
                    </>
                  ),
                  value: "1",
                },
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <Binary size={16} />
                        Percentage
                      </p>
                    </>
                  ),
                  value: "2",
                },
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <Gem size={16} /> Modern
                      </p>
                    </>
                  ),
                  value: "3",
                },
              ]}
            />
          </div>
          <div className="flex flex-col justify-center items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded">
            <p className="text-lg text-white">Status Bar Location</p>
            <SegmentedControl
              value={settings.statusBarMode.toString()}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  statusBarMode: value,
                });
              }}
              data={[
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <ChevronsUpDown size={16} /> Top Right
                      </p>
                    </>
                  ),
                  value: "1",
                },
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <ChevronsUpDown size={16} />
                        Bottom Right
                      </p>
                    </>
                  ),
                  value: "2",
                },
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <EyeOff size={16} /> Off
                      </p>
                    </>
                  ),
                  value: "3",
                },
              ]}
            />
          </div>
          <div className="flex flex-col items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded min-w-[312px] min-h-[90px]">
            <p className="text-lg text-white">Speed Unit Preferance</p>
            <SegmentedControl
              value={settings.measurementSystem}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  measurementSystem: value,
                });
              }}
              data={[
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <Gauge size={16} /> MP/H
                      </p>
                    </>
                  ),
                  value: "MPH",
                },
                {
                  label: (
                    <>
                      <p className="flex justify-center gap-1 items-center">
                        <Gauge size={16} />
                        KM/H
                      </p>
                    </>
                  ),
                  value: "KMH",
                },
              ]}
            />
          </div>
          <div className="bg-[#2a2a2a] rounded min-w-[312px] min-h-[90px]">
            <div className="m-5">
              <Text size="sm" mt="md" className="font-bold">
                HUD Opacity
              </Text>
              <Slider
                // value={settings.transparency}
                defaultValue={settings.transparency}
                onChange={(value) => {
                  setSettings({
                    ...settings,
                    transparency: value,
                  });
                }}
                labelTransitionProps={{
                  transition: "skew-down",
                  duration: 150,
                  timingFunction: "linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
