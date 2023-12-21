Config = {
  ["Debug"] = true,
  ["Server Name"] = "SERVER NAME",       -- The Server name that is going to display at the top right.
  ["Footer"] = "DISCORD.GG/SERVER_LINK", -- The text that will display below the server name, usually a discord link
  ["Framework"] = "esx",                 -- standalone, esx, qb, vrp
  ["Framework Options"] = {              -- Enable these only if using a framework.
    ["Status"] = true,                   -- Hunger and thirst [esx, qb, vrp]
  },
  ["Player Slots"] = 200,                -- The player slots for your server (Convar: sv_maxclients)
  ["Default Settings"] = {               -- The default hud settings for the player once they load in for the first time.
    hudMode = 3,                         -- The Hud Mode: 1, 2, 3.
    statusBarMode = 1,                   -- Status Bar is the top right location: 1 = Top Right, 2 = Bottom Right, 3 = Off
    transparency = 100,                  -- Transparency of the Hud
    measurementSystem = "MPH"            -- MPH or KMH
  }
}
