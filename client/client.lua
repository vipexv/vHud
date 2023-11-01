VHud = {
  alreadyInit = false
}

local HudVisiblity = true

function ToggleNuiFrame(shouldShow)
  SetNuiFocus(false, false)
  Debug("HudVisiblity variable:", shouldShow)
  UIMessage('setVisible', shouldShow)
  VHud.init()
  -- VHud.PlistLoop()
end

RegisterNetEvent("vhud:cl:upd", function(plistCount)
  UIMessage("nui:state:onlineplayers", plistCount)
end)

RegisterCommand('hud', function()
  HudVisiblity = not HudVisiblity

  ToggleNuiFrame(HudVisiblity)
end, false)

RegisterNUICallback('hideFrame', function(_, cb)
  ToggleNuiFrame(false)
  Debug('Hide NUI frame')
  cb({})
end)

RegisterNetEvent("UIMessage", function(action, data)
  UIMessage(action, data)
end)



VHud.init = function()
  CreateThread(function()
    CachedPlayerStats = {}

    while HudVisiblity do
      local sleep = 1000

      local playerStats = {}
      local ped = PlayerPedId()
      local pid = PlayerId()
      -- Max Health is 200 for the Male ped and 175 for female, divide it by 2 so i can get max of 100%
      playerStats.health = math.floor(GetEntityHealth(ped) / 2)
      playerStats.armor = math.floor(GetPedArmour(ped))


      playerStats.mic = NetworkIsPlayerTalking(pid)

      UIMessage("nui:data:playerstats", playerStats)
      CachedPlayerStats = playerStats

      local isInVeh = IsPedInAnyVehicle(ped, false)
      if isInVeh then
        local currVeh = GetVehiclePedIsIn(ped, false)
        UIMessage("nui:state:isinveh", true)
        local vehSpeed = math.floor(GetEntitySpeed(currVeh) * 2.236936)

        local vehData = {
          speed = vehSpeed
        }


        UIMessage("nui:state:vehdata", vehData)
      else
        UIMessage("nui:state:isinveh", false)
      end

      Wait(sleep)
    end
  end)
end

xpcall(VHud.init, function(err)
  return print("Error when calling the VHud.init function:", err)
end)

-- xpcall(VHud.PlistLoop, function(err)
--   return print("Error when calling the VHud.PlistLoop function:", err)
-- end)


-- Fix for the Player ID.
CreateThread(function()
  local playerId

  while not PlayerId() do
    Debug("Waiting for the player to load in.")
    playerId = GetPlayerServerId(PlayerId())
    Wait(500)
  end

  Debug("playerId var:", playerId)
  UIMessage("nui:state:pid", playerId)
end)
