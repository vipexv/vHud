VHud = {
  settings = {}
}

local HudVisiblity = true

function ToggleNuiFrame(shouldShow)
  -- SetNuiFocus(false, false)
  Debug("HudVisiblity variable:", shouldShow)
  UIMessage('setVisible', shouldShow)
  VHud.init()
  -- VHud.PlistLoop()
end

RegisterNetEvent("vhud:cl:update", function(plistCount)
  UIMessage("nui:state:onlineplayers", #plistCount)
end)

RegisterCommand('hud', function()
  HudVisiblity = not HudVisiblity
  ToggleNuiFrame(HudVisiblity)
end, false)

RegisterCommand('hudsettings', function()
  SetNuiFocus(true, true)
  UIMessage("nui:state:settingsui", nil)
end)

RegisterNuiCallback('hud:visibility', function(_, cb)
  HudVisiblity = not HudVisiblity
  ToggleNuiFrame(HudVisiblity)
  cb({})
end)

RegisterNUICallback('hud:settings:visibility', function(_, cb)
  SetNuiFocus(false, false)
  UIMessage("nui:state:settingsui", nil)
  cb({})
end)

RegisterNUICallback('hideFrame', function(_, cb)
  SetNuiFocus(false, false)
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

VHud.sendData = function()
  while not PlayerId() do
    Wait(500)
  end
  SetTimeout(2000, function()
    local playerId = GetPlayerServerId(PlayerId())

    local hudSettings = GetResourceKvpString("hud:settings")
    UIMessage("nui:state:settings", json.decode(hudSettings))

    VHud.settings = hudSettings

    Debug("hudSettings sent to the nui:", hudSettings)

    UIMessage("nui:state:pid", playerId)
    Debug("playerId var:", playerId)
  end)
end


RegisterNuiCallback("hud:cb:settings", function(newSettings, cb)
  SetResourceKvp("hud:settings", json.encode(newSettings))
  UIMessage("nui:state:settings", newSettings)

  VHud.settings = newSettings
  Debug("Settings updated:", json.encode(newSettings))
  cb({})
end)


xpcall(VHud.sendData, function(err)
  return print("Error when calling the VHud.sendData function:", err)
end)
