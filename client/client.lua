VHud = {
  settings = {}
}

local HudVisiblity = true

function ToggleNuiFrame(shouldShow)
  Debug("HudVisiblity variable:", shouldShow)
  UIMessage('setVisible', shouldShow)
  VHud.init()
  VHud.GrabPlayerCount()
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
      playerStats.health = math.floor((GetEntityHealth(ped) - 100) / (GetEntityMaxHealth(ped) - 100) * 100)
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

VHud.sendData = function()
  while not PlayerId() do
    Wait(500)
  end

  SetTimeout(2000, function()
    local playerId = GetPlayerServerId(PlayerId())
    UIMessage("nui:state:pid", playerId)

    TriggerServerEvent("vhud:cb")

    local storedHudSettings = json.decode(GetResourceKvpString("hud:settings:revamped"))
    if storedHudSettings then
      VHud.settings = storedHudSettings

      UIMessage("nui:state:globalsettings", storedHudSettings)
      Debug("[nui:state:globalsettings] was called, with the data storedHudSettings: ", json.encode(storedHudSettings))
    end


    Debug("[nui:state:pid] called, PlayerId:", playerId)
  end)
end

VHud.GrabPlayerCount = function()
  CreateThread(function()
    while HudVisiblity do
      TriggerServerEvent("vhud:cb")
      Wait(60 * 1000)
    end
  end)
end


RegisterNuiCallback("hud:cb:settings", function(newSettings, cb)
  SetResourceKvp("hud:settings:revamped", json.encode(newSettings))

  UIMessage("nui:state:globalsettings", newSettings)

  VHud.settings = newSettings
  Debug("Settings updated:", json.encode(newSettings))
  cb({})
end)

xpcall(VHud.init, function(err)
  return print("Error when calling the VHud.init function:", err)
end)

xpcall(VHud.sendData, function(err)
  return print("Error when calling the VHud.sendData function:", err)
end)

xpcall(VHud.GrabPlayerCount, function(err)
  return print("Error when calling the VHud.GrabPlayerCount function:", err)
end)

RegisterNetEvent("vhud:client:cb", function(plist)
  UIMessage("nui:state:onlineplayers", #plist)
  Debug("[VHud.GrabPlayerCount] Player count sent to the NUI: ", #plist)
end)
