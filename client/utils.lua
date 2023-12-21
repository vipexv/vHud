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

checkFuelScripts = function()
  if GetResourceState("ox_fuel") == "started" then
    function Script:FuelFunction()
      return Entity(Script.currVeh).state.fuel
    end

    Debug("ox_fuel resource was found.")
    return
  end

  if GetResourceState("LegacyFuel") == "started" then
    function Script:FuelFunction()
      return exports["LegacyFuel"]:GetFuel(Script.currVeh)
    end

    Debug("LegacyFuel resource was found.")
    return
  end

  function Script:FuelFunction()
    return GetVehicleFuelLevel(Script.currVeh)
  end

  print("(Error) Please setup your custom fuel function at `vHud > client > utils.lua`")
end
