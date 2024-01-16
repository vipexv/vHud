Config = {
  ["Debug"] = true,
  ["Header"] = "SERVER NAME",    -- Can be named whatever, usually server name or discord link, it's text centered text between the ID and Player Count.
  ["Framework"] = "standalone",  -- standalone, esx, qb, vrp
  ["Framework Options"] = {      -- Enable these only if using a framework.
    ["Status"] = false,          -- Hunger and thirst [esx, qb, vrp]
    ["Multi Character"] = false, -- Basiclly so the HUD doesn't appear once the player is in the character selector, only appears if they have selected a character/loaded in (QB/ESX)
    ["Seatbelt"] = true,         -- [ESX, QB]
    ["Stress"] = false,          -- [QB] Only displaying the MetaData, it's not a complete stress mechanic.
    ["Harness"] = false,         -- [QB]
  },
  ["Default Settings"] = {       -- The default hud settings for the player once they load in for the first time.
    hudMode = 3,                 -- The Hud Mode: 1 = Default, 2 = Percentage, 3 = Modern.
    statusBarMode = 1,           -- Status Bar is the top right location: 1 = Top Right, 2 = Bottom Right, 3 = Off
    resourceUsage = 2,           -- 1 = 0.01 - 0.02 Resmon, 2 = 0.00 Resmon | The first mode feels allot better but uses slightly more resources.
    measurementSystem = "MPH"    -- MPH or KMH
  }
}
