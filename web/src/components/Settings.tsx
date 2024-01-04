import React, { useEffect, useState } from "react";
import "../App.css";

import { Transition } from "@mantine/core";
import { fetchNui } from "../utils/fetchNui";

import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  Binary,
  Check,
  ChevronsUp,
  ChevronsUpDown,
  Cog,
  EyeOff,
  Gauge,
  Package,
  X,
} from "lucide-react";

import { SegmentedControl, Switch } from "@mantine/core";

import { ConfigInterface, SettingsInterface } from "@/App";
import { useNuiEvent } from "@/hooks/useNuiEvent";

interface Props {
  userSettings: SettingsInterface;
  scriptConfig: ConfigInterface;
  isVisible: boolean;
}

const Settings: React.FC<Props> = ({
  isVisible,
  userSettings,
  scriptConfig,
}) => {
  const [settings, setSettings] = useState<SettingsInterface>(userSettings);

  useNuiEvent("nui:state:settings", setSettings);

  // useEffect(() => {
  //   fetchNui("hud:cb:settings", settings);
  // }, [settings]);

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
      <Transition
        mounted={isVisible}
        transition="slide-up"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">
            <div
              style={styles}
              className="bg-[#1a1a1a] w-[40vw] h-fit p-10 rounded"
            >
              <div className="flex flex-col justify-center items-center gap-10">
                <p className="flex justify-center items-center gap-2 font-horizon text-xl">
                  <Cog size={22} /> HUD Settings
                </p>
                <div className="flex flex-col justify-center items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded">
                  <p className="text-lg">Theme</p>
                  <SegmentedControl
                    value={settings.hudMode.toString()}
                    onChange={(value) => {
                      const updatedSettings = {
                        ...settings,
                        hudMode: value,
                      };

                      setSettings(updatedSettings);

                      fetchNui("hud:cb:settings", updatedSettings);
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
                              <ChevronsUp size={16} /> Modern
                            </p>
                          </>
                        ),
                        value: "3",
                      },
                    ]}
                  />
                </div>
                <div className="flex flex-col justify-center items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded">
                  <p className="text-lg">Status Bar Location</p>
                  <SegmentedControl
                    value={settings.statusBarMode.toString()}
                    onChange={(value) => {
                      const updatedSettings: SettingsInterface = {
                        ...settings,
                        statusBarMode: value,
                      };

                      setSettings(updatedSettings);

                      fetchNui("hud:cb:settings", updatedSettings);
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
                <div className="flex flex-col justify-center items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded">
                  <p className="text-lg">Resource Usage</p>
                  <SegmentedControl
                    value={
                      settings.resourceUsage
                        ? settings.resourceUsage.toString()
                        : "2"
                    }
                    onChange={(value) => {
                      const updatedSettings: SettingsInterface = {
                        ...settings,
                        resourceUsage: value,
                      };

                      setSettings(updatedSettings);

                      fetchNui("hud:cb:settings", updatedSettings);
                    }}
                    data={[
                      {
                        label: (
                          <>
                            <p className="flex justify-center gap-1 items-center">
                              <ArrowBigUpDash size={16} /> Performance
                            </p>
                          </>
                        ),
                        value: "1",
                      },
                      {
                        label: (
                          <>
                            <p className="flex justify-center gap-1 items-center">
                              <ArrowBigDownDash size={16} />
                              Optimised
                            </p>
                          </>
                        ),
                        value: "2",
                      },
                    ]}
                  />
                </div>
                <div className="flex flex-col items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded min-w-[312px] min-h-[90px]">
                  <p className="text-lg">Speed Unit Preferance</p>
                  <SegmentedControl
                    value={settings.measurementSystem}
                    onChange={(value) => {
                      const updatedSettings: SettingsInterface = {
                        ...settings,
                        measurementSystem: value,
                      };

                      setSettings(updatedSettings);

                      fetchNui("hud:cb:settings", updatedSettings);
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
                <div className="flex flex-row justify-center items-center font-bold gap-2 bg-[#2a2a2a] p-2 rounded min-w-[312px] min-h-[90px]">
                  <Switch
                    checked={
                      settings.cinematicMode ? settings.cinematicMode : false
                    }
                    onChange={(event) => {
                      const updatedSettings: SettingsInterface = {
                        ...settings,
                        cinematicMode: event.currentTarget.checked,
                      };

                      setSettings(updatedSettings);

                      fetchNui("hud:cb:settings", updatedSettings);
                    }}
                    size="md"
                    labelPosition="left"
                    label="Cinematic Mode"
                    offLabel={<X size={16} strokeWidth={2.25} />}
                    onLabel={<Check size={16} strokeWidth={2.25} />}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

export default Settings;
