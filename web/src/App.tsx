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

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

export interface SettingsInterface {
  hudMode: number | string;
  statusBarMode: number | string;
  transparency: any;
  resourceUsage: number | string;
  measurementSystem: string;
}

export interface ConfigInterface {
  ["Debug"]: boolean;
  ["Server Name"]: string;
  ["Footer"]: string;
  ["Framework"]: string;
  ["Framework Options"]: { ["Status"]: boolean; ["Multi Character"]: boolean };
  ["Player Slots"]: string | number;
  ["Default Settings"]: SettingsInterface;
}

const App: React.FC = () => {
  const [isInVehicle, setIsInVehicle] = useState(false);
  const [settingsVisiblity, setSettingsVisibility] = useState(false);
  const [config, setConfig] = useState<ConfigInterface>({
    ["Debug"]: true,
    ["Server Name"]: "SERVER NAME",
    ["Footer"]: "DISCORD.GG/SERVER_LINK",
    ["Framework"]: "standalone",
    ["Framework Options"]: {
      ["Status"]: false,
      ["Multi Character"]: false,
    },
    ["Player Slots"]: 200,
    ["Default Settings"]: {
      hudMode: 1,
      statusBarMode: 1,
      transparency: 100,
      resourceUsage: 2,
      measurementSystem: "MPH",
    },
  });
  const [visible, setVisible] = useState(true);
  const [globalSettings, setGlobalSettings] = useState<SettingsInterface>({
    hudMode: 3,
    statusBarMode: 1,
    transparency: 100,
    resourceUsage: 2,
    measurementSystem: "MPH",
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

  useNuiEvent("nui:state:isinveh", (isinveh) => {
    setIsInVehicle(isinveh);
  });

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
      <div className={`${visible ? "visible" : "invisible"}`}>
        <TopRight userSettings={globalSettings} scriptConfig={config} />
        <Status userSettings={globalSettings} scriptConfig={config} />
        {!!isInVehicle && (
          <CarHud userSettings={globalSettings} scriptConfig={config} />
        )}
      </div>
      {!!settingsVisiblity && (
        <Settings userSettings={globalSettings} scriptConfig={config} />
      )}
    </>
  );
};

export default App;
