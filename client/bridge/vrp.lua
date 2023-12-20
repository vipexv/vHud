local c = Config

if not (string.lower(c["Framework"]) == "vrp") then
  return Debug("Prevented the `vrp.lua` file from continuing.")
end

local frameworkOptions = c["Framework Options"]

if not frameworkOptions["Status"] then return end

CreateThread(function()
  while true do
    TriggerServerEvent("hud:server:status")
    Wait(1500)
  end
end)

RegisterNetEvent("hud:client:status:return", function(stats)
  local status = {
    hunger = math.floor(100 - stats.hunger),
    thirst = math.floor(100 - stats.thirst),
  }

  UIMessage("nui:state:frameworkStatus", status)
  -- UIMessage("userInfo", vRPUserStats)
end)
