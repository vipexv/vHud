VHud = {
  settings = {},
  visible = true,
  measurmentSystem = 2.236936
}

VHud.init = function()
  CreateThread(function()
    CachedPlayerStats = {}

    while not next(VHud.settings) do
      Wait(500)
    end

    Debug("VHud.settings", json.encode(VHud.settings))

    while VHud.visible do
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
        local vehSpeed = math.floor(GetEntitySpeed(currVeh) * VHud.measurmentSystem)

        local vehData = {
          speed = vehSpeed,
          rpm = GetVehicleCurrentRpm(currVeh),
          gear = GetVehicleCurrentGear(currVeh),
          fuel = tostring(GetVehicleFuelLevel(currVeh))
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

    if not storedHudSettings then
      UIMessage("nui:state:globalsettings", Config["Default Settings"])
      Debug("Player didn't have any saved settings, the default ones are being sent to the NUI.")
      VHud.settings = Config["Default Settings"]
    end

    VHud.settings = storedHudSettings
    UIMessage("nui:state:globalsettings", storedHudSettings)
    Debug("[nui:state:globalsettings] was called, with the data storedHudSettings: ", json.encode(storedHudSettings))


    Debug("The config was sent to the NUI:", json.encode(Config))
    UIMessage("nui:data:config", Config)

    Debug("[nui:state:pid] called, PlayerId:", playerId)
  end)
end

VHud.GrabPlayerCount = function()
  CreateThread(function()
    while VHud.visible do
      TriggerServerEvent("vhud:cb")
      Wait(60 * 1000)
    end
  end)
end

xpcall(VHud.init, function(err)
  return print("Error when calling the VHud.init function:", err)
end)

xpcall(VHud.sendData, function(err)
  return print("Error when calling the VHud.sendData function:", err)
end)

xpcall(VHud.GrabPlayerCount, function(err)
  return print("Error when calling the VHud.GrabPlayerCount function:", err)
end)
