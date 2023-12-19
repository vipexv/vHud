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
  SetResourceKvp("hud:settings:revamped", json.encode(newSettings))

  UIMessage("nui:state:globalsettings", newSettings)

  Script.settings = newSettings

  Script.measurmentSystem = (newSettings.measurmentSystem == "MPH" and 2.236936 or 3.6)

  Debug("Settings updated:", json.encode(newSettings))
  cb({})
end)
