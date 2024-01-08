Script = {
  settings = {},
  standalone = {},
  framework = {},
  state = {
    isSeatbeltOn = false,
    threadSleep = 1000
  },
  fuelFunction = nil,
  playerState = {
    id = 0,
    isinVeh = false
  },
  visible = true,
  measurementSystem = 2.236936
}

Script.init = function()
  CreateThread(function()
    while not Script.settings do
      Wait(500)
    end


    Debug("Script.settings", json.encode(Script.settings))

    UIMessage("nui:data:cfg", Config)

    xpcall(checkFuelScripts, function(err)
      print("Error when calling the checkFuelScripts function: ", err)
    end)

    while Script.visible do
      local ped = PlayerPedId()
      local pid = PlayerId()

      local pedHealth = GetEntityHealth(ped)
      local pedMaxHealth = GetEntityMaxHealth(ped)

      local playerStats = {
        health = math.floor((pedHealth - 100) / (pedMaxHealth - 100) * 100),
        armor = math.floor(GetPedArmour(ped)),
        mic = NetworkIsPlayerTalking(pid),
      }

      UIMessage("nui:data:playerstats", playerStats)

      -- Speedometer
      local isInVeh = IsPedInAnyVehicle(ped, false)
      Script.playerState.isInVeh = isInVeh

      if isInVeh then
        UIMessage("nui:state:isinveh", true)
        local currVeh = GetVehiclePedIsIn(ped, false)
        Script.playerState.isInVeh = true

        local vehData = {
          speed = math.floor(GetEntitySpeed(currVeh) * Script.measurementSystem),
          rpm = GetVehicleCurrentRpm(currVeh),
          gear = GetVehicleCurrentGear(currVeh),
          fuel = tostring(math.floor(Script:FuelFunction() or 0)),
          isSeatbeltOn = Script.state.isSeatbeltOn
        }

        UIMessage("nui:state:vehdata", vehData)
      end

      UIMessage("nui:state:playerstate", Script.playerState)
      Wait(Script.state.threadSleep)
    end
  end)
end

Script.sendData = function()
  while not PlayerId() do
    Wait(500)
  end

  SetTimeout(2000, function()
    UIMessage("nui:state:scriptConfig", Config)

    TriggerServerEvent("vhud:cb")

    local hudSettings = GetResourceKvpString("vHud:state:settings")

    local playerState = {
      id = GetPlayerServerId(PlayerId()),
      isInVeh = IsPedInAnyVehicle(PlayerPedId(), false),
    }

    Script.playerState = playerState

    UIMessage("nui:state:playerstate", playerState)

    if not hudSettings then
      UIMessage("nui:state:globalsettings", Config["Default Settings"])
      UIMessage("nui:state:settings", Config["Default Settings"])
      Debug("Player didn't have any saved settings, the default ones are being sent to the NUI.")
      Script.settings = Config["Default Settings"]
      return
    end

    local storedHudSettings = json.decode(hudSettings)

    local threadSleep = (tostring(storedHudSettings.resourceUsage) == "1" and 100 or 1000)
    Script.state.threadSleep = threadSleep
    Debug("(Script.sendData) Thread sleep: ", Script.state.threadSleep)

    Script.settings = storedHudSettings
    local cinematicMode = storedHudSettings.cinematicMode

    DisplayRadar(not cinematicMode or not cinematicMode)

    UIMessage("nui:state:globalsettings", storedHudSettings)
    UIMessage("nui:state:settings", storedHudSettings)

    Debug("[nui:state:globalsettings] was called, with the data storedHudSettings: ", json.encode(storedHudSettings))
  end)
end

Script.grabPlayerCount = function()
  CreateThread(function()
    while Script.visible do
      TriggerServerEvent("vhud:cb")
      Wait(60 * 1000)
    end
  end)
end

xpcall(Script.sendData, function(err)
  return print("Error when calling the Script.sendData function:", err)
end)

xpcall(Script.init, function(err)
  return print("Error when calling the Script.init function:", err)
end)

xpcall(Script.grabPlayerCount, function(err)
  return print("Error when calling the Script.GrabPlayerCount function:", err)
end)
