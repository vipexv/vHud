Config = {
  ["Debug"] = true,
  ["Server Name"] = "Server Name",       -- The Server name that is going to display at the top right.
  ["Footer"] = "discord.gg/server_link", -- The text that will display below the server name, usually a discord link
  ["Framework"] = "standalone",          -- standalone, esx, qb, vrp
  ["Framework Options"] = {              -- Enable these only if using a framework.
    ["Status"] = false,                  -- Hunger and thirst [esx, qb, vrp]
    ["Multi Character"] = false          -- Basiclly so the HUD doesn't appear once the player is in the character selector, only appears if they have selected a character (QB/ESX)
  },
  ["Player Slots"] = 200,                -- The player slots for your server (Convar: sv_maxclients)
  ["Default Settings"] = {               -- The default hud settings for the player once they load in for the first time.
    hudMode = 3,                         -- The Hud Mode: 1 = Default, 2 = Percentage, 3 = Modern.
    statusBarMode = 1,                   -- Status Bar is the top right location: 1 = Top Right, 2 = Bottom Right, 3 = Off
    transparency = 100,                  -- Transparency of the Hud
    resourceUsage = 2,                   -- 1 = 0.01 - 0.02 Resmon, 2 = 0.00 Resmon | The first mode feels allot better but uses slightly more resources.
    measurementSystem = "MPH"            -- MPH or KMH
  }
}
