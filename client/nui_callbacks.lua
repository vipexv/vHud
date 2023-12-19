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


RegisterNuiCallback("hud:cb:settings", function(newSettings, cb)
  SetResourceKvp("hud:settings:revamped", json.encode(newSettings))

  UIMessage("nui:state:globalsettings", newSettings)

  VHud.settings = newSettings
  Debug("Settings updated:", json.encode(newSettings))
  cb({})
end)
