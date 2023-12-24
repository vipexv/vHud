if not (string.lower(Config["Framework"]) == "qb") then
  return Debug("Prevented the `qb.lua` file from continuing.")
end

local frameworkOptions = Config["Framework Options"]
Script.framework.object = exports['qb-core']:GetCoreObject()
local QBCore = exports['qb-core']:GetCoreObject()

if not frameworkOptions["Status"] then
  return Debug("Prevented qb.lua from executing fully since the status boolean isn't true.")
end

Script.framework.init = function()
  CreateThread(function()
    while Script.visible do
      local playerData = QBCore.Functions.GetPlayerData()

      if not playerData or not playerData.metadata then
        return Debug("(QB) Error occured while attempting to get the playerData, debug: ", json.encode(playerData))
      end

      local status = {
        hunger = math.floor(playerData.metadata['hunger']),
        thirst = math.floor(playerData.metadata['thirst'])
      }

      UIMessage("nui:data:frameworkStatus", status)
      Wait(1000)
    end
  end)
end

if frameworkOptions["Multi Character"] then
  Debug("(QB) Multi Character is enabled, initiating logic.")
  RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    Wait(2000)
    ToggleNuiFrame(true)
    Debug("(QB) Player Loaded and HUD is being displayed.")
  end)

  RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()
    ToggleNuiFrame(false)
    Debug("(QB) Player Unloaded and HUD is not being displayed.")
  end)
end


xpcall(Script.framework.init, function(err)
  return print("Error when calling the `Script.framework.init` function on the qb.lua file", err)
end)
