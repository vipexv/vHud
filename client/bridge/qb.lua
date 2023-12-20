local c = Config

if not string.lower(c["Framework"]) == "qb" then
  return Debug("Prevented the `qb.lua` file from continuing.")
end

local frameworkOptions = c["Framework Options"]
Script.framework.object = exports['qb-core']:GetCoreObject()
local qb = Script.framework.object

if not frameworkOptions["Status"] then
  return Debug("Prevented qb.lua from executing fully since the status boolean isn't true.")
end

Script.framework.init = function()
  CreateThread(function()
    while Script.visible do
      local playerData = qb.Functions.GetPlayerData()

      local status = {
        hunger = math.floor(playerData.metadata['hunger']),
        thirst = math.floor(playerData.metadata['thirst'])
      }

      UIMessage("nui:data:frameworkStatus", status)
      Wait(1000)
    end
  end)
end


xpcall(Script.framework.init, function(err)
  return print("Error when calling the `Script.framework.init` function on the qb.lua file", err)
end)
