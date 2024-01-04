import React, { useState, useEffect } from "react";
import "./App.css";
import { debugData } from "./utils/debugData";
import { fetchNui } from "./utils/fetchNui";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { isEnvBrowser } from "./utils/misc";
import TopRight from "./components/TopRight";
import Status from "./components/Status";
import CarHud from "./components/CarHud";
import Settings from "./components/Settings";
import { Button } from "@mantine/core";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

export interface SettingsInterface {
  hudMode: number | string;
  statusBarMode: number | string;
  resourceUsage: number | string;
  measurementSystem: string;
  cinematicMode?: boolean;
}

export interface ConfigInterface {
  ["Debug"]: boolean;
  ["Server Name"]: string;
  ["Footer"]: string;
  ["Framework"]: string;
  ["Framework Options"]: {
    ["Status"]: boolean;
    ["Multi Character"]: boolean;
    ["Seatbelt"]: boolean;
    ["Stress"]: boolean;
    ["Harness"]: boolean;
  };
  ["Player Slots"]: string | number;
  ["Default Settings"]: SettingsInterface;
}

const App: React.FC = () => {
  const [isInVehicle, setIsInVehicle] = useState(true);
  const [settingsVisiblity, setSettingsVisibility] = useState(false);
  const [config, setConfig] = useState<ConfigInterface>({
    ["Debug"]: true,
    ["Server Name"]: "SERVER NAME",
    ["Footer"]: "",
    ["Framework"]: "standalone",
    ["Framework Options"]: {
      ["Status"]: false,
      ["Multi Character"]: false,
      ["Seatbelt"]: false,
      ["Stress"]: false,
      ["Harness"]: false,
    },
    ["Player Slots"]: 200,
    ["Default Settings"]: {
      hudMode: 1,
      statusBarMode: 1,
      resourceUsage: 2,
      measurementSystem: "MPH",
    },
  });
  const [visible, setVisible] = useState(true);
  const [globalSettings, setGlobalSettings] = useState<SettingsInterface>({
    hudMode: 2,
    statusBarMode: 1,
    resourceUsage: 2,
    measurementSystem: "MPH",
    cinematicMode: false,
  });

  useNuiEvent<boolean>("setVisible", setVisible);

  useNuiEvent<SettingsInterface>("nui:state:globalsettings", (data) => {
    if (!data) {
      return console.log(
        "[nui:state:globalsettings] called but the first param is null, returning."
      );
    }

    setGlobalSettings(data);
  });

  useNuiEvent("nui:state:settingsui", (data) => {
    if (!!data) {
      setSettingsVisibility(data);
      return;
    }
    setSettingsVisibility(!settingsVisiblity);
  });

  useNuiEvent("nui:state:isinveh", setIsInVehicle);

  useNuiEvent<ConfigInterface>("nui:state:scriptConfig", (cfg) => {
    if (
      cfg["Framework"].toLowerCase() !== "standalone" &&
      cfg["Framework Options"]["Multi Character"]
    ) {
      setVisible(false);
    }
    setConfig(cfg);
  });

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(!visible);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <>
          <div className="flex flex-col gap-2 items-start justify-center ml-5">
            <Button
              className="bg-[#1a1a1a] mt-2 font-inter p-2"
              onClick={() => {
                setSettingsVisibility(!settingsVisiblity);
              }}
            >
              Toggle Settings
            </Button>
            <Button
              className="bg-[#1a1a1a] mt-2 font-inter p-2"
              onClick={() => {
                setIsInVehicle(!isInVehicle);
              }}
            >
              Toggle Veh Hud
            </Button>
          </div>
        </>
      )}
      {globalSettings.cinematicMode && (
        <>
          <div className="absolute top-0 w-[100dvw] h-[8dvh] bg-black"></div>
          <div className="absolute bottom-0 w-[100dvw] h-[8dvh] bg-black"></div>
        </>
      )}
      {visible && !globalSettings.cinematicMode && (
        <>
          <div>
            <TopRight userSettings={globalSettings} scriptConfig={config} />
            <Status
              userSettings={globalSettings}
              scriptConfig={config}
              isInVeh={isInVehicle}
            />
            {!!isInVehicle && (
              <CarHud userSettings={globalSettings} scriptConfig={config} />
            )}
          </div>
        </>
      )}
      <Settings
        isVisible={settingsVisiblity}
        userSettings={globalSettings}
        scriptConfig={config}
      />
    </>
  );
};

export default App;
