Script = {
  settings = {},
  visible = true,
  measurmentSystem = 2.236936
}

Script.init = function()
  CreateThread(function()
    CachedPlayerStats = {}

    while not next(Script.settings) do
      Wait(500)
    end

    Debug("Script.settings", json.encode(Script.settings))

    while Script.visible do
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
        local vehSpeed = math.floor(GetEntitySpeed(currVeh) * Script.measurmentSystem)

        local vehData = {
          speed = vehSpeed,
          rpm = GetVehicleCurrentRpm(currVeh),
          gear = GetVehicleCurrentGear(currVeh),
          fuel = tostring(math.floor(GetVehicleFuelLevel(currVeh)))
        }

        UIMessage("nui:state:vehdata", vehData)
      else
        UIMessage("nui:state:isinveh", false)
      end

      Wait(sleep)
    end
  end)
end

Script.sendData = function()
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
      Script.settings = Config["Default Settings"]
    end

    Script.settings = storedHudSettings
    UIMessage("nui:state:globalsettings", storedHudSettings)
    Debug("[nui:state:globalsettings] was called, with the data storedHudSettings: ", json.encode(storedHudSettings))


    Debug("The config was sent to the NUI:", json.encode(Config))
    UIMessage("nui:data:config", Config)

    Debug("[nui:state:pid] called, PlayerId:", playerId)
  end)
end

Script.GrabPlayerCount = function()
  CreateThread(function()
    while Script.visible do
      TriggerServerEvent("vhud:cb")
      Wait(60 * 1000)
    end
  end)
end

xpcall(Script.init, function(err)
  return print("Error when calling the Script.init function:", err)
end)

xpcall(Script.sendData, function(err)
  return print("Error when calling the Script.sendData function:", err)
end)

xpcall(Script.GrabPlayerCount, function(err)
  return print("Error when calling the Script.GrabPlayerCount function:", err)
end)
