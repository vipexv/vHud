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

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnClientDataCompProps {
  data: any;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({
  data,
}) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const App: React.FC = () => {
  const [clientData, setClientData] = useState<ReturnData | null>(null);
  const [playerData, setPlayerData] = useState({
    isInVehicle: false,
  });
  const [isInVehicle, setIsInVehicle] = useState(false);
  const [visible, setVisible] = useState(true);

  const [settingsVisiblity, setSettingsVisibility] = useState(true);

  useNuiEvent<boolean>("setVisible", setVisible);

  useNuiEvent("nui:state:isinveh", (isinveh) => {
    setIsInVehicle(isinveh);
    // console.log(playerData.isInVehicle);
  });
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(!visible);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  const handleGetClientData = () => {
    fetchNui<ReturnData>("getClientData")
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setClientData(retData);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
        setClientData({ x: 500, y: 300, z: 200 });
      });
  };

  return (
    <>
      {visible && (
        <>
          <div>
            <button
              className="py-1 px-2 rounded bg-black font-inter text-white bg-opacity-80 font-bold ml-10 mt-2"
              onClick={(e) => {
                setSettingsVisibility(!settingsVisiblity);
              }}
            >
              Toggle Settings
            </button>
            <TopRight />
            <Status />
            {!!isInVehicle && <CarHud />}
          </div>
          {!!settingsVisiblity && <Settings />}
        </>
      )}
    </>
  );
};

export default App;
