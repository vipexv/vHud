local c = Config

if not (string.lower(c["Framework"]) == "esx") then
  return Debug("Prevented the `esx.lua` file from continuing.")
end

Script.framework.object = exports['es_extended']:getSharedObject()
local frameworkOptions = c["Framework Options"]

if frameworkOptions["Multi Character"] then
  Debug("(ESX) Multi Character is enabled, initiating logic.")
  RegisterNetEvent("esx:playerLoaded", function(xPlayer)
    Wait(1000)
    ToggleNuiFrame(true)
    Debug("(ESX) Player Loaded and HUD is being displayed.")
  end)

  RegisterNetEvent("esx:onPlayerLogout", function()
    Wait(1000)
    ToggleNuiFrame(false)
    Debug("(ESX) Player Unloaded and HUD is not being displayed.")
  end)
end

if not frameworkOptions["Status"] then return end

AddEventHandler('esx_status:onTick', function(data)
  local hunger, thirst
  for i = 1, #data do
    if data[i].name == 'thirst' then thirst = math.floor(data[i].percent) end
    if data[i].name == 'hunger' then hunger = math.floor(data[i].percent) end
  end

  local esxStatus = {
    hunger = hunger,
    thirst = thirst
  }
  UIMessage("nui:data:frameworkStatus", esxStatus)
end)
