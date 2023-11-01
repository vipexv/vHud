import React, { useState, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import "../App.css";
import { Mic, ShieldPlus, Heart } from "lucide-react";
import { animateNumber } from "../utils/animateNumber";
import { motion } from "framer-motion";

const Settings: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="absolute top-2/4 left-2/4 bg-black rounded bg-opacity-80 p-2 min-w-[85dvh] min-h-[30dvw]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="flex flex-col text-white justify-center items-center">
          <h1 className="font-horizon text-xl">Hud Settings</h1>

          <div className="grid grid-cols-2 mt-10 mr-36">
            {/* <div className="font-inter text-lg">Percentage Mode</div> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Settings;
