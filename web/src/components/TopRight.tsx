import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import {
  User,
  DollarSign,
  CreditCard,
  Banknote,
  ShieldBan,
  Users,
  PercentDiamond,
} from "lucide-react";
import { animateNumber } from "../utils/animateNumber";

interface playerStatus {
  money: number | string | any;
  bank: string | number | any;
  dirtyMoney: string | number | any;
}

const TopRight: React.FC = () => {
  const [playerStatus, setPlayerStatus] = useState<playerStatus>({
    money: 100000,
    bank: 10901230,
    dirtyMoney: 992130,
  });

  // const [serverData, setServerData] = useState({
  //   onlinePlayers: 180,
  //   sourceId: 0,
  // });

  const [pid, setPid] = useState<number>();
  const [onlinePlayers, setOnlinePlayers] = useState(0);

  useNuiEvent("nui:state:pid", (id) => {
    setPid(id);
  });

  useNuiEvent("nui:state:onlineplayers", (op) => {
    // animateNumber(onlinePlayersElement, op, "/2000");
    setOnlinePlayers(op);
    // console.log(`[DEBUG] Online Players Var: ${op}`);
  });

  return (
    <>
      <div className="rounded p-2 bg-opacity-80 text-white absolute top-1 right-2 font-inter">
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <p
              className="inline-flex justify-center items-center mr-16 text-xs bg-black p-2 rounded bg-opacity-80 font-bold"
              style={{
                borderTopRightRadius: "20%",
                borderBottomLeftRadius: "20%",
              }}
            >
              <Users size={16} />:{" "}
              <span id="onlinePlayers" className="ml-1">
                {onlinePlayers}/200
              </span>
            </p>
            <p
              className="inline-flex justify-center items-center mr-14 text-xs bg-black p-2 rounded bg-opacity-80 font-bold"
              style={{
                borderTopLeftRadius: "20%",
                borderBottomRightRadius: "20%",
              }}
            >
              ID: {pid}
            </p>
            <div className="flex flex-col justify-center items-center">
              <p
                className="font-horizon bg-black rounded p-2 bg-opacity-80 text-xs"
                style={{
                  borderTopRightRadius: "20%",
                  borderBottomLeftRadius: "20%",
                }}
              >
                <div className="flex flex-col justify-center items-center">
                  <p>
                    <span className="text-green-500">Narco</span> RP
                  </p>
                  <span
                    className="font-inter uppercase font-bold"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    discord.gg/<span className="text-green-500">narco</span>
                  </span>
                </div>
              </p>
            </div>
          </div>
          {/* <div className="flex justify-end items-center">
            <div>
              <p
                className="flex justify-center items-center font-inter bg-black bg-opacity-80 rounded p-1 mt-20 font-bold"
                style={{
                  borderTopLeftRadius: "30%",
                  borderBottomRightRadius: "30%",
                }}
              >
                $ {playerStatus.money}
              </p>
              <p
                className="flex justify-center items-center font-inter bg-black bg-opacity-80 rounded p-1 mt-4 mr-2 font-bold"
                style={{
                  borderTopLeftRadius: "30%",
                  borderBottomRightRadius: "30%",
                }}
              >
                <CreditCard size={16} strokeWidth={3} className="mr-1" />
                {playerStatus.bank}
              </p>
              <p
                className="flex justify-center items-center font-inter bg-black bg-opacity-80 rounded p-1 mt-4 mr-4 font-bold"
                style={{
                  borderTopLeftRadius: "30%",
                  borderBottomRightRadius: "30%",
                }}
              >
                <PercentDiamond size={16} strokeWidth={3} className="mr-1" />
                {playerStatus.dirtyMoney}
              </p>
              <p
                className="flex justify-center items-center font-inter uppercase font-bold bg-black bg-opacity-80 rounded p-2 mt-4 mr-6"
                style={{
                  borderTopLeftRadius: "30%",
                  borderBottomRightRadius: "30%",
                }}
              >
                Police - Chief
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TopRight;
