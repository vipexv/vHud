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
