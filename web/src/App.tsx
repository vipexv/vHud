import { Button, Kbd } from "@mantine/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import CarHud from "./components/CarHud";
import Settings from "./components/Settings";
import Status from "./components/Status";
import TopRight from "./components/TopRight";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { debugData } from "./utils/debugData";
import { fetchNui } from "./utils/fetchNui";
import { isEnvBrowser } from "./utils/misc";
import { MousePointerClick } from "lucide-react";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

export interface SettingsInterface {
  hudMode: number | string;
  hudPosition?: { x: number; y: number };
  statusBarMode: number | string;
  resourceUsage: number | string;
  measurementSystem: string;
  cinematicMode?: boolean;
}

export interface ConfigInterface {
  ["Debug"]: boolean;
  ["Header"]: string;
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
  const [dragMode, setDragMode] = useState(false);
  const [config, setConfig] = useState<ConfigInterface>({
    ["Debug"]: true,
    ["Header"]: "SERVER NAME",
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
  const [playerState, setPlayerState] = useState({
    id: 0,
    isInVeh: false,
  });
  const [globalSettings, setGlobalSettings] = useState<SettingsInterface>({
    hudMode: 2,
    hudPosition: {
      x: 0,
      y: 0,
    },
    statusBarMode: 1,
    resourceUsage: 2,
    measurementSystem: "MPH",
    cinematicMode: false,
  });

  const [hudPosition, setHudPosition] = useState({
    x: 0,
    y: 0,
  });

  useNuiEvent("nui:state:playerstate", setPlayerState);

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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (dragMode) {
        const hudPos = {
          x: event.clientX,
          y: event.clientY,
        };

        const updatedSettings: SettingsInterface = {
          ...globalSettings,
          hudPosition: hudPos,
        };

        setGlobalSettings(updatedSettings);

        fetchNui("hud:cb:settings", updatedSettings);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragMode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (settingsVisiblity && event.key.toLowerCase() === "e") {
        setDragMode((prevDragMode) => !prevDragMode);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [settingsVisiblity]); // Include 'settingsVisiblity' in the dependency array if it's used inside the effect

  const hudMode = globalSettings.hudMode.toString();
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
                setPlayerState((prevState) => ({
                  ...prevState,
                  isInVeh: !prevState.isInVeh,
                }));
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
          <TopRight
            userSettings={globalSettings}
            scriptConfig={config}
            playerState={playerState}
          />
          <div
            className={`${
              globalSettings.hudPosition?.x && globalSettings.hudPosition?.y
                ? `absolute`
                : "flex h-[100dvh] w-full justify-center items-end"
            }`}
            style={{
              top: globalSettings.hudPosition?.y,
              left: globalSettings.hudPosition?.x,
            }}
          >
            <div className="flex flex-col justify-center items-center gap-1">
              <CarHud
                userSettings={globalSettings}
                scriptConfig={config}
                playerState={playerState}
                settingsVisible={settingsVisiblity}
              />
              <Status
                userSettings={globalSettings}
                scriptConfig={config}
                playerState={playerState}
              />
            </div>
          </div>
        </>
      )}
      <Settings
        isVisible={settingsVisiblity}
        userSettings={globalSettings}
        scriptConfig={config}
        dragMode={dragMode}
      />
      {settingsVisiblity && (
        <>
          <div className="absolute top-[85dvh] right-[1dvw]">
            <div
              style={{
                backgroundColor: dragMode ? "black" : "#353542",
              }}
              className="flex font-main gap-2 bg-opacity-80 justify-center items-center border-[#454854] border-[2px] py-1 px-2 rounded-[2px]"
            >
              <Kbd className="px-2 py-1">E</Kbd> | Drag Mode
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
