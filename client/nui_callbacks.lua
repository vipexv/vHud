RegisterNUICallback('hideFrame', function(_, cb)
  SetNuiFocus(false, false)
  Debug('Hide NUI frame')
  cb({})
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

RegisterNuiCallback("hud:cb:settings", function(newSettings, cb)
  Debug("hud:cb:settings was called.")

  SetResourceKvp("vHud:state:settings", json.encode(newSettings))

  UIMessage("nui:state:globalsettings", newSettings)

  local threadSleep = (tostring(newSettings.resourceUsage) == "1" and 100 or 1000)

  Script.threadSleep = threadSleep
  Script.settings = newSettings
  Script.measurementSystem = (newSettings.measurementSystem == "MPH" and 2.236936 or 3.6)
  cb({})
end)
