function ToggleNuiFrame(shouldShow)
  Debug("HudVisiblity variable:", Script.visible)
  UIMessage('setVisible', shouldShow)
  Script.init()
  Script.grabPlayerCount()

  if string.lower(Config["Framework"]) == "qb" and Config["Framework Options"]["Status"] then
    xpcall(Script.framework.init, function(err)
      return print("Error when calling the `Script.framework.init` function on the utils.lua file", err)
    end)
  end
end

local vehCheck = function()
  local ped = PlayerPedId()
  if not IsPedInAnyVehicle(ped, false) then
    return false
  end

  local veh = GetVehiclePedIsIn(ped, false)
  return veh
end

checkFuelScripts = function()
  local ped = PlayerPedId()
  if GetResourceState("ox_fuel") == "started" then
    function Script:FuelFunction()
      local veh = vehCheck()

      if not veh then
        return Debug("(Script:FuelFunction [ox_fuel]) was called but the ped isn't in a vehicle.")
      end

      return Entity(veh).state.fuel
    end

    Debug("ox_fuel resource was found.")
    return
  end

  if GetResourceState("LegacyFuel") == "started" then
    function Script:FuelFunction()
      local veh = vehCheck()

      if not veh then
        return Debug("(Script:FuelFunction [LegacyFuel]) was called but the ped isn't in a vehicle.")
      end

      return exports["LegacyFuel"]:GetFuel(veh)
    end

    Debug("LegacyFuel resource was found.")
    return
  end

  function Script:FuelFunction()
    local veh = vehCheck()

    if not veh then
      return Debug("(Script:FuelFunction [Standalone]) was called but the ped isn't in a vehicle.")
    end

    return GetVehicleFuelLevel(veh)
  end

  print("(Error) Please setup your custom fuel function at `vHud > client > utils.lua`")
end
